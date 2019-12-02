import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { Doc, PageCollection, DocShare } from 'type/ofd';
import Env from './environment.variable';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  /** ofd归档文件的二进制流 */
  private ofdPackageBlob: Blob;

  /** 归档文件中，文档的索引 */
  private ofdDocuments: Doc[];

  /** 提供归档文件的二进制流，以提供下载支持 */
  public get PackageBlob(): Blob { return this.ofdPackageBlob; }

  /** 从二进制流解析文件 */
  public async InitDocumentContextAsync(blob: Blob): Promise<void> {
    this.ofdPackageBlob = blob;
    DocShare.PRESENT_ARCHIVE = await JSZip.loadAsync(blob);

    const ofdxml = DocShare.PRESENT_ARCHIVE.files['OFD.xml'];
    if (!ofdxml) { throw new Error('Cannot find entry file "ofd.xml"'); }
    const entryConfig = (await ofdxml.async('text')).ParseXmlDocument();

    const Prefix = entryConfig.getOfdPrefix();
    const Bodys = entryConfig.getElementsByTagName(`${Prefix}:DocBody`);

    this.ofdDocuments = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < Bodys.length; i++) {
      const doc = await Doc.Parse(Bodys[i], Prefix);
      this.ofdDocuments[doc.Index] = doc;
    }
  }
  public get PresentDocument(): PageCollection { return this.ofdDocuments[Env.CurrentDocIndex].Pages; }

  public GetDocAllPages(DocIndex: number): PageCollection {
    Env.CurrentDocIndex = DocIndex;
    return this.ofdDocuments[DocIndex].Pages;
  }
}
