import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentService, ToolBarService } from './services/modules';
import { Page } from '../../type/ofd';

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
    this.http.post(`http://localhost:8011/aaa.ofd`, {}, { responseType: 'blob', observe: 'response' })
      .subscribe(async data => {
        await this.docSrv.InitDocumentContextAsync(new Blob([data.body], { type: 'application/zip' }));
        const collection = this.docSrv.GetDocAllPages(0);
        for (const page of collection) {
          this.Pages.push(page);
        }
        this.toolBarSrv.MaxPage = this.Pages.length;
      });
  }
}
