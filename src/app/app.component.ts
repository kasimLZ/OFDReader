import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentService, SideBarService } from './services/modules';
import { Page } from './models/modules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OFDReader';

  private Pages: Page[] = [];

  constructor(
    private http: HttpClient,
    private docSrv: DocumentService,
    private sideBarSrv: SideBarService
    ) {
      this.http.post(`http://localhost:8011/jyb.ofd`, {}, { responseType: 'blob' })
        .subscribe(data => {
          this.docSrv.LoadContextAsync(new Blob([data], { type: 'application/zip' }));
          this.docSrv.AllPages.then(pages => this.Pages = pages);
      });
    }

  private SideBarSwitch() { this.sideBarSrv.toggle(); }
}
