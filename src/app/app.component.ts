import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentService, ToolBarService } from './services/modules';
import { Page } from './models/modules';
import { stringify } from 'querystring';

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
    // if (window.location.search)
    // window.location.Filters();
    this.http.post(`http://localhost:8011/jyb.ofd`, {}, { responseType: 'blob', observe: 'response' })
      .subscribe(data => {
        // data.headers.keys().forEach(key => {
        //   console.log(`${key} => ${data.headers.get(key)}`);
        // });
        this.docSrv.InitDocumentContextAsync(new Blob([data.body], { type: 'application/zip' }));
        // this.docSrv.AllPages.then(pages => {
        //   this.Pages = pages;
        //   this.toolBarSrv.MaxPage = pages.length;
        // });
      });
  }
}
