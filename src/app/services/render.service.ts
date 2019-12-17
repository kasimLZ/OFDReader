import { Injectable } from '@angular/core';
import { Page } from 'type/ofd';
import { ZoomService } from './zoom.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RenderedPage } from '../models/modules';

@Injectable({
    providedIn: 'root'
})
export class RenderService {
    constructor(
        private readonly ZoomSrv: ZoomService,
        private sanitizer: DomSanitizer
        ) {}

    private Rendered: { [key: number]: { [key: number]: RenderedPage } } = {};

    /**
     * Try to get the page rendering results.
     * By default, the rendering is performed at the maximum resolution supported by the zoom, although it consumes more resources when
     * it is first rendered, but get better results in subsequent zoom. The rendered results will be cached
     * @param page The necessary page data model for rendering the page
     * @returns `RenderedPage` Rendering result structure
     */
    public TryGetImageOrRendering(page: Page): RenderedPage {

        if (!this.Rendered[page.DocID] || !this.Rendered[page.DocID][page.Index]) {

            const canvas = document.createElement('canvas');
            const MaxZoom = this.ZoomSrv.MaxZoom.value as number;
            canvas.setAttribute('width', (page.Width * MaxZoom).toString());
            canvas.setAttribute('height', (page.Height * MaxZoom).toString());

            const context = canvas.getContext('2d');

            for (let index = 0; index < page.Length; index++) {
                page.GetItemByIndex(index).Draw(context, MaxZoom);
            }

            if (!this.Rendered[page.DocID]) {
                this.Rendered[page.DocID] = {};
            }

            const Rendered = {} as RenderedPage;

            Rendered.RawBase64 = canvas.toDataURL('image/png');
            Rendered.SafeUrl = this.sanitizer.bypassSecurityTrustUrl(Rendered.RawBase64);
            Rendered.Image = document.createElement('img');
            Rendered.Image.src = Rendered.RawBase64;

            this.Rendered[page.DocID][page.Index] = Rendered;
        }

        return this.Rendered[page.DocID][page.Index];
    }

    /** Release all currently cached pages */
    public release(): void {
        this.Rendered = {};
    }
}

