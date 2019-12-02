import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';
import { Page } from 'type/ofd';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  public ElementId: string;

  private pageData: Page;
  private Canvas: HTMLCanvasElement;
  private Context: CanvasRenderingContext2D;
  private IsRendered = false;



  constructor(public toobarSrv: ToolBarService, private sanitizer: DomSanitizer) {}

  @Input()
  get PageData() { return this.pageData; }

  set PageData(value) {
      this.pageData = value;
      this.pageDataChange.emit(value);
  }
  @Output()
  pageDataChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.ElementId = `pageContainer${this.pageData.Index}`;
    this.pageData.Render = () => this.Render();
  }

  public Render(): void {
    if (!this.IsRendered) {
      this.Canvas = document.querySelector(`#${this.ElementId} canvas`);
      this.Context = this.Canvas.getContext('2d');
    }

    const WaitLoaded = setInterval(() => {
      if (this.pageData.status) {
        this.DrawAllElement();
        clearInterval(WaitLoaded);
      }
    }, 100);
  }

  private DrawAllElement(): void {
    for (let index = 0; index < this.pageData.Length; index++) {
      this.pageData.GetItemByIndex(index).Draw(this.Context, 4);
    }
    const i = parseInt(this.pageData.Index.replace('_Page_', ''), null);
    this.toobarSrv.SideBarSrv.SetThumbnail(i, this.PageData.Scale,
      this.sanitizer.bypassSecurityTrustUrl(this.Canvas.toDataURL('image/png')));
  }
}
