import { Injectable } from '@angular/core';
import env from './environment.variable';
import { DocumentService } from './document.service';

interface ZoomOption {
  sort: number;
  value: string;
  i10n: string;
  text: string;
}


class ZoomOptions {
  public 'auto': ZoomOption = { sort: 1, value: 'auto', i10n: 'page_scale_auto', text: '自动缩放' };
  public 'actual': ZoomOption = { sort: 2, value: 'actual', i10n: 'page_scale_actual', text: '实际大小' };
  public 'fit': ZoomOption = { sort: 3, value: 'fit', i10n: 'page_scale_fit', text: '适合页面' };
  public 'width': ZoomOption = { sort: 4, value: 'width', i10n: 'page_scale_width', text: '适合页宽' };
  public '0.5': ZoomOption = { sort: 5, value: '0.5', i10n: 'page_scale_percent', text: '50%' };
  public '0.75': ZoomOption = { sort: 6, value: '0.75', i10n: 'page_scale_percent', text: '75%' };
  public '1': ZoomOption = { sort: 7, value: '1', i10n: 'page_scale_percent', text: '100%' };
  public '2': ZoomOption = { sort: 8, value: '2', i10n: 'page_scale_percent', text: '200%' };
  public '3': ZoomOption = { sort: 9, value: '3', i10n: 'page_scale_percent', text: '300%' };
  public '4': ZoomOption = { sort: 10, value: '4', i10n: 'page_scale_percent', text: '400%' };
  public 'custom': ZoomOption = { sort: 11, value: 'custom', i10n: 'page_scale_custom', text: '自定义' };
}

export type InputZoomTypeFormat = keyof ZoomOptions;

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(private docSrv: DocumentService) {}

  private options: ZoomOptions = new ZoomOptions();

  private scale: number;
  public get Scale(): number { return this.scale; }

  private zoom: InputZoomTypeFormat;
  public get Zoom(): InputZoomTypeFormat { return this.zoom; }



  public get Options(): any {
    return Object.values(new ZoomOptions())
      .sort((a: ZoomOption, b: ZoomOption) => a.sort - b.sort);
  }

  public async Change(Scale: InputZoomTypeFormat|number): Promise<void> {
    let scale = parseInt(Scale as string, null);
    if (isNaN(scale)) {
      this.zoom = Scale as InputZoomTypeFormat;
      // tslint:disable-next-line: deprecation
      const inPresentationMode = document.fullscreen;

      // const currentPage = (await this.docSrv.AllPages)[env.CurrentIndex];
      const currentPage: any = {PhysicalWidth: 100, PhysicalHeight: 10 };

      const container = document.getElementById('viewerContainer');

      const hPadding = (inPresentationMode) ? 0 : env.SCROLLBAR_PADDING;
      const vPadding = (inPresentationMode) ? 0 : env.VERTICAL_PADDING;
      const pageWidthScale = (container.clientWidth - hPadding) / currentPage.PhysicalWidth;
      const pageHeightScale = (container.clientHeight - vPadding) / currentPage.PhysicalHeight;
      switch (Scale) {
        case 'actual': scale = 1; break;
        case 'width': scale = pageWidthScale; break;
        case 'page-height': scale = pageHeightScale; break;
        case 'page-fit': scale = Math.min(pageWidthScale, pageHeightScale); break;
        case 'auto':
          // For pages in landscape mode, fit the page height to the viewer
          // *unless* the page would thus become too wide to fit horizontally.
          const horizontalScale = (currentPage.PhysicalWidth > currentPage.PhysicalHeight) ?
            Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
          scale = Math.min(env.MAX_AUTO_SCALE, horizontalScale);
          break;
        default: console.error(`pdfViewSetScale: '${Scale}' is an unknown zoom value.`); return;
      }
    }
    this.scale = scale;
  }



  public test(pattern: string): void {

    // let scale = parseInt(pattern, null);

    // if (isNaN(scale)) {
    //   const inPresentationMode =
    //     this.presentationModeState === PresentationModeState.FULLSCREEN;
    //   const hPadding = (inPresentationMode || this.removePageBorders) ?
    //     0 : SCROLLBAR_PADDING;
    //   const vPadding = (inPresentationMode || this.removePageBorders) ?
    //     0 : VERTICAL_PADDING;
    //   const pageWidthScale = (this.container.clientWidth - hPadding) /
    //     currentPage.width * currentPage.scale;
    //   const pageHeightScale = (this.container.clientHeight - vPadding) /
    //     currentPage.height * currentPage.scale;
    //   switch (pattern) {
    //     case 'page-actual':
    //       scale = 1;
    //       break;
    //     case 'page-width':
    //       scale = pageWidthScale;
    //       break;
    //     case 'page-height':
    //       scale = pageHeightScale;
    //       break;
    //     case 'page-fit':
    //       scale = Math.min(pageWidthScale, pageHeightScale);
    //       break;
    //     case 'auto':
    //       // For pages in landscape mode, fit the page height to the viewer
    //       // *unless* the page would thus become too wide to fit horizontally.
    //       var horizontalScale = (currentPage.width > currentPage.height) ?
    //         Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
    //       scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
    //       break;
    //     default:
    //       console.error(`pdfViewSetScale: '${pattern}' is an unknown zoom value.`);
    //       return;
    //   }
    // }
  }
}




