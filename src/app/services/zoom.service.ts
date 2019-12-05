import { Injectable } from '@angular/core';
import env from './environment.variable';
import { DocumentService } from './document.service';

interface ZoomOption {
  sort: number;
  value: string | number;
  i10n: string;
  text: string;
}


class ZoomOptions {
  public 'auto': ZoomOption = { sort: 1, value: 'auto', i10n: 'page_scale_auto', text: '自动缩放' };
  public 'actual': ZoomOption = { sort: 2, value: 'actual', i10n: 'page_scale_actual', text: '实际大小' };
  public 'fit': ZoomOption = { sort: 3, value: 'fit', i10n: 'page_scale_fit', text: '适合页面' };
  public 'width': ZoomOption = { sort: 4, value: 'width', i10n: 'page_scale_width', text: '适合页宽' };
  public '0.5': ZoomOption = { sort: 5, value: 0.5, i10n: 'page_scale_percent', text: '50%' };
  public '0.75': ZoomOption = { sort: 6, value: 0.75, i10n: 'page_scale_percent', text: '75%' };
  public '1': ZoomOption = { sort: 7, value: 1, i10n: 'page_scale_percent', text: '100%' };
  public '2': ZoomOption = { sort: 8, value: 2, i10n: 'page_scale_percent', text: '200%' };
  public '3': ZoomOption = { sort: 9, value: 3, i10n: 'page_scale_percent', text: '300%' };
  public '4': ZoomOption = { sort: 10, value: 4, i10n: 'page_scale_percent', text: '400%' };
  // public 'custom': ZoomOption = { sort: 11, value: 'custom', i10n: 'page_scale_custom', text: '自定义' };
}

export type InputZoomTypeFormat = keyof ZoomOptions;

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(private docSrv: DocumentService) {}

  private scale: number;
  public get Scale(): number { return this.scale; }

  private zoom: InputZoomTypeFormat = 'auto';
  public get Zoom(): InputZoomTypeFormat { return this.zoom; }

  public readonly Options: ZoomOption[] =  Object.values(new ZoomOptions()).sort((a: ZoomOption, b: ZoomOption) => a.sort - b.sort);

  public ReRender() {
    for (const page of this.docSrv.PresentDocument.Pages) {
      if (page.status) {
        page.Render();
      }
    }
  }

  public Change(Scale: InputZoomTypeFormat|number): Promise<void> {

    let scale = parseFloat(Scale as string);
    if (isNaN(scale)) {
      this.zoom = Scale as InputZoomTypeFormat;
      // tslint:disable-next-line: deprecation
      const inPresentationMode = document.fullscreen;

      const currentPage = this.docSrv.PresentDocument.Pages.Get(env.CurrentIndex);

      const container = document.getElementById('viewerContainer');

      const hPadding = (inPresentationMode) ? 0 : env.SCROLLBAR_PADDING;
      const vPadding = (inPresentationMode) ? 0 : env.VERTICAL_PADDING;
      const pageWidthScale = (container.clientWidth - hPadding) / currentPage.Width;
      const pageHeightScale = (container.clientHeight - vPadding) / currentPage.Height;
      switch (Scale) {
        case 'actual': scale = 1; break;
        case 'width': scale = pageWidthScale; break;
        case 'page-height': scale = pageHeightScale; break;
        case 'page-fit': scale = Math.min(pageWidthScale, pageHeightScale); break;
        case 'auto':
          // For pages in landscape mode, fit the page height to the viewer
          // *unless* the page would thus become too wide to fit horizontally.
          const horizontalScale = (currentPage.Width > currentPage.Height) ?
            Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
          scale = Math.min(env.MAX_AUTO_SCALE, horizontalScale);
          break;
        default: console.error(`pdfViewSetScale: '${Scale}' is an unknown zoom value.`); return;
      }
    }
    this.scale = scale;
    this.ReRender();
  }

  public ToNext(): void {
    let present = new ZoomOptions()[this.Zoom].value;
    if (typeof present === 'string') { present = this.scale; }
    for (const opt of this.Options) {
      if (typeof opt.value === 'string') { continue; }
      if (opt.value > present) {
        this.zoom = opt.value.toString() as InputZoomTypeFormat;
        this.scale = opt.value;
        break;
      }
    }
    this.ReRender();
  }

  public ToPrev(): void {
    let present = new ZoomOptions()[this.Zoom].value;
    if (typeof present === 'string') { present = this.scale; }

    let last: ZoomOption = null;
    for (const opt of this.Options) {
      if (typeof opt.value === 'string') { continue; }
      if (opt.value >= present) { break; }
      last = opt;
    }
    if (last != null) {
      this.zoom = last.value.toString() as InputZoomTypeFormat;
      this.scale = last.value as number;
    }
    this.ReRender();
  }
}

