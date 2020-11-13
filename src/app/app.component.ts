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

  public DocContext: Doc;

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

    // 从url参数"_"获取文件路径
    let FilePath = window.location.Filter('_');
    if (FilePath == null) { return; }

    // 原则上比较特殊的路径许需要通过Urlencodeing进行编码，例如通过哈希码或Guid取值
    FilePath = decodeURIComponent(FilePath);

    // 对于非http或https开头的路径会按照短路径处理
    // 段路径会被拼接在基础路径之后
    if (!FilePath.startsWith('http://') && !FilePath.startsWith('https://')) {
      FilePath = (window.ofd.BaseUrl ? window.ofd.BaseUrl : '') + FilePath;
    }

    this.http.get(FilePath, { responseType: 'blob', observe: 'response' })
      .subscribe(async response => {
        const FileName: string = this.GetFileName(FilePath, response.headers);

        await this.docSrv.InitDocumentContextAsync(FileName, new Blob([response.body], { type: 'application/zip' }));
        this.DocContext = this.docSrv.PresentDocument;
        for (const page of this.DocContext.Pages) {
          this.Pages.push(page);
        }
        this.toolBarSrv.MaxPage = this.DocContext.Pages.Length;
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
