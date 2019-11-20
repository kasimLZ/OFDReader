import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentService } from './services/modules';
import { Page } from './models/modules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OFDReader';

  private Pages: Page[];

  constructor(
    private http: HttpClient,
    private docSrv: DocumentService
    ) {
      this.http.post(`http://localhost:8011/jyb.ofd`, {}, { responseType: 'blob' })
        .subscribe(data => {
          this.docSrv.setContext(new Blob([data], { type: 'application/zip' }));
          this.Pages = this.docSrv.AllPages;
      });
    }
}
