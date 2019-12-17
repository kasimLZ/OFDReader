import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolBarService, RenderService } from 'src/app/services/modules';
import { Page } from 'type/ofd';
import { RenderedPage } from 'src/app/models/modules';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  public ElementId: string;

  private pageData: Page;
  private Canvas: HTMLCanvasElement;
  private Context: CanvasRenderingContext2D;
  private Rendered: RenderedPage;
  private MaxZoom: number;

  constructor(
      public toobarSrv: ToolBarService,
      private renderSrv: RenderService
    ) {
      this.MaxZoom = this.toobarSrv.ZoomSrv.MaxZoom.value as number;
    }

  public get PageWidth(): number { return this.pageData.Width * this.toobarSrv.ZoomSrv.Scale; }
  public get PageHeight(): number { return this.pageData.Height * this.toobarSrv.ZoomSrv.Scale; }

  @Input()
  get PageData() { return this.pageData; }

  set PageData(value) {
      this.pageData = value;
      this.pageDataChange.emit(value);
  }
  @Output()
  pageDataChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.ElementId = `pageContainer_Doc${this.pageData.DocID}_Page${this.pageData.Index}`;
    this.pageData.Render = () => this.Render();

    const WaitLoaded = setInterval(() => {
      if (this.pageData.status) {

        this.Rendered = this.renderSrv.TryGetImageOrRendering(this.pageData);

        const scale = this.toobarSrv.ZoomSrv.Scale / this.MaxZoom;
        this.Context.scale(scale, scale);
        this.Context.drawImage(this.Rendered.Image, 0, 0);

        this.toobarSrv.SideBarSrv.SetThumbnail(this.pageData.Index, this.PageData.Scale, this.Rendered.SafeUrl);
        clearInterval(WaitLoaded);
      }
    }, 100);
  }

  public Render(): void {
    if (!this.Canvas || !this.Context) {
      this.Canvas = document.querySelector(`#${this.ElementId} canvas`);
      this.Context = this.Canvas.getContext('2d');
    }

    
  }
}
