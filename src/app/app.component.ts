import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentService, ToolBarService } from './services/modules';
import { Page, Doc } from 'type/ofd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'OFDReader';

  public Pages: Page[] = [];

  constructor(
    public http: HttpClient,
    public docSrv: DocumentService,
    public toolBarSrv: ToolBarService
  ) {
    this.http.get(document.querySelector('html').getAttribute('config')).subscribe(
      (a: OfdConfig) => { window.initReaderConfig(a); this.LoadFile(); },
      () => { this.LoadFile(); } );
  }



  public get ShowToolBar(): boolean {
    let status = false;
    for (const key of Object.keys(window.ofd.Feature)) {
      status = status || window.ofd.Feature[key];
      if (status) { return status; }
    }
    return status;
  }

  private LoadFile() {
    let FilePath = window.location.Filter('_');

    if (FilePath == null) { return; }
    FilePath = decodeURIComponent(FilePath);

    if (!FilePath.startsWith('http://') && !FilePath.startsWith('https://')) {
      FilePath = (window.ofd.BaseUrl ? window.ofd.BaseUrl : '') + FilePath;
    }

    this.http.post(FilePath, {}, { responseType: 'blob', observe: 'response' })
      .subscribe(async response => {
        const FileName: string = this.GetFileName(FilePath, response.headers);

        await this.docSrv.InitDocumentContextAsync(FileName, new Blob([response.body], { type: 'application/zip' }));
        const collection = this.docSrv.GetDocAllPages(0);
        for (const page of collection) {
          this.Pages.push(page);
        }
        this.toolBarSrv.MaxPage = this.Pages.length;
      }, (error: any) => {
        console.error(error);
      });
  }

  private GetFileName(filePath: string, header: HttpHeaders): string {
    let fileName: string = header.get(window.ofd.FileHeader);

    if (fileName == null) {
      const urlparam = filePath.split('/');
      fileName = urlparam[urlparam.length - 1];
    }

    if (!fileName.endsWith('.ofd')) {
      fileName += '.ofd';
    }
    return fileName;
  }
}
