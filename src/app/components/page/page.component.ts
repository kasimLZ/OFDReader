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
  private PresentZoomScale: number;

  constructor(
      public toobarSrv: ToolBarService,
      private renderSrv: RenderService
    ) {
      this.MaxZoom = this.toobarSrv.ZoomSrv.MaxZoom.value as number;
    }

  public get PageWidth(): number { return this.pageData.Width * this.ZoomScale; }

  public get PageHeight(): number { return this.pageData.Height * this.ZoomScale; }

  private get ZoomScale(): number {
    const scale = this.toobarSrv.ZoomSrv.Scale;
    if (this.PresentZoomScale !== scale) {
      this.PresentZoomScale = scale;
      const RenderThread = setInterval(() => { if (this.Render()) { clearInterval(RenderThread); } }, 10);
    }
    return this.PresentZoomScale;
  }

  @Input()
  get PageData() { return this.pageData; }

  set PageData(value) { this.pageData = value; }

  ngOnInit() {
    this.ElementId = `pageContainer_Doc${this.pageData.DocID}_Page${this.pageData.Index}`;
    const WaitLoaded = setInterval(() => {
      if (this.pageData.status) {
        this.Rendered = this.renderSrv.TryGetImageOrRendering(this.pageData);
        clearInterval(WaitLoaded);
      }
    }, 10);
  }

  private Render(): boolean {
    if (!this.Canvas) {
      this.Canvas = document.querySelector(`#${this.ElementId} canvas`);
      if (!this.Canvas) { return false; }
    }

    if (!this.Context) {
      this.Context = this.Canvas.getContext('2d');
      if (!this.Context) { return false; }
    }

    if (this.Rendered) {
      const scale = this.toobarSrv.ZoomSrv.Scale / this.MaxZoom;

      this.Context.scale(scale, scale);
      this.Context.drawImage(this.Rendered.Image, 0, 0);
      this.toobarSrv.SideBarSrv.SetThumbnail(this.pageData.Index, this.PageData.Scale, this.Rendered.SafeUrl);
      return true;
    }
    return false;
  }
}
