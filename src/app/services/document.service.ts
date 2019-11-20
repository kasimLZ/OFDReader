import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { Page, Doc } from '../models/modules';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private docFile: JSZip;

  private allPages: Page[];

  private Docs: Doc[];

  constructor() { }

  public setContext(blob: Blob) {
    JSZip.loadAsync(blob).then(zip => {
      this.docFile = zip;
      const ofdxml = zip.files['OFD.xml'];
      if (!ofdxml) { throw new Error('找不到入口文件'); }
      ofdxml.async('text').then(ctx => this.ReadDoc(ctx));
    });
  }

  public get AllPages(): Page[] {
    if (this.allPages == null) {
      this.allPages = [];
      for (let i = 0; i < 3; i++) {
        const page = { Index : i } as Page;
        this.allPages.push(page);
      }
    }
    return this.allPages;
  }

  private ReadDoc(ofdContent: string): void {
    this.Docs = [];
    const bodys = this.ParseXmlDocument(ofdContent).getElementsByTagName('ofd:DocBody');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < bodys.length; i++) {
      const doc = new Doc(i, bodys[i]);
      this.Docs.push(doc);
      const docXml = this.docFile.files[doc.DocRoot];
      if (!docXml) { throw new Error(''); }

      docXml.async('text').then(ctx => this.ReadPage(doc, ctx));
    }
  }

  private ReadPage(doc: Doc, DomContent: string) {
    const Dom = this.ParseXmlDocument(DomContent);
    const pages = Dom.getElementsByTagName('ofd:Page');

    // tslint:disable-next-line: prefer-for-of
    for (let p = 0; p < pages.length; p++) {
      const loc = `Doc_${doc.Index}/${pages[p].getAttribute('BaseLoc')}`;

      this.docFile.files[loc].async('text').then(ctx => {
        const page = new Page(loc, this.ParseXmlDocument(ctx));
        doc.Pages.push(page);
      });
    }
  }



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
