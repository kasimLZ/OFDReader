import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { Page, Doc } from '../models/modules';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private docFile: JSZip;

  private allPages: Page[] = [];

  private Docs: Doc[];

  private PageLoadTask: Promise<Page[]>;

  public LoadContextAsync(blob: Blob) {
    this.PageLoadTask = JSZip.loadAsync(blob).then(async zip => {
      this.docFile = zip;
      const ofdxml = zip.files['OFD.xml'];
      if (!ofdxml) { throw new Error('找不到入口文件'); }
      return ofdxml.async('text')
      .then(ctx => this.ReadDoc(ctx))
      .then(() => this.Docs.forEach(doc => this.allPages.push(...doc.Pages)))
      .then(() => this.allPages);
    });
  }

  public get AllPages(): Promise<Page[]> { return this.PageLoadTask; }

  private async ReadDoc(ofdContent: string): Promise<void> {
    this.Docs = [];
    const bodys = this.ParseXmlDocument(ofdContent).getElementsByTagName('ofd:DocBody');
    const DocTasks: Promise<void>[] = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < bodys.length; i++) {
      const doc = new Doc(i, bodys[i]);
      this.Docs.push(doc);
      const docXml = this.docFile.files[doc.DocRoot];
      if (!docXml) { throw new Error(''); }
      DocTasks.push(docXml.async('text').then(ctx => this.ReadPage(doc, ctx)));
    }
    return Promise.all(DocTasks).then();
  }

  private async ReadPage(doc: Doc, DomContent: string): Promise<void> {
    const Dom = this.ParseXmlDocument(DomContent);
    const pages = Dom.getElementsByTagName('ofd:Page');
    const PageTasks: Promise<void> [] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let p = 0; p < pages.length; p++) {
      const loc = `Doc_${doc.Index}/${pages[p].getAttribute('BaseLoc')}`;

      PageTasks.push(this.docFile.files[loc].async('text').then(ctx => {
        const page = new Page(loc, this.ParseXmlDocument(ctx));
        doc.Pages.push(page);
      }));
    }
    return Promise.all(PageTasks).then();
  }


  /**
   * Convert xml string to dom
   * @param content xml string
   */
  private ParseXmlDocument(content: string): Document {

    if (DOMParser) {
      return new DOMParser().parseFromString(content, 'text/xml');
    } else {
      const xmlDoc = new (window as any).ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = 'false';
      xmlDoc.loadXML(content);
      return xmlDoc;
    }
  }

}
