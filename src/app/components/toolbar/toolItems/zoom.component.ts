import { Component } from '@angular/core';
import { ZoomService, InputZoomTypeFormat } from 'src/app/services/modules';

@Component({
    selector: 'app-zoom',
    template: `
        <div class="splitToolbarButton">
            <button id="zoomOut" class="toolbarButton zoomOut" title="缩小" tabindex="21" data-l10n-id="zoom_out" (click)="zoomSrv.ToPrev()">
                <span data-l10n-id="zoom_out_label">缩小</span>
            </button>
            <div class="splitToolbarButtonSeparator"></div>
            <button id="zoomIn" class="toolbarButton zoomIn" title="放大" tabindex="22" data-l10n-id="zoom_in" (click)="zoomSrv.ToNext()">
                <span data-l10n-id="zoom_in_label">放大</span>
            </button>
        </div>
        <span id="scaleSelectContainer" class="dropdownToolbarButton" style="min-width: 78px; max-width: 78px;">
        <select id="scaleSelect" title="缩放" tabindex="23" data-l10n-id="zoom" style="min-width: 100px;" [(ngModel)]="ZoomType">
        <option *ngFor="let item of Options" value="{{item.value}}" [attr.data-l10n-id]="item.i10n">{{item.text}}</option>
        </select>
        </span>
  `
})
export class ZoomComponent {
    constructor(public zoomSrv: ZoomService) { }

    public get Options(): any[] { return this.zoomSrv.Options; }

    public get ZoomType(): InputZoomTypeFormat { return this.zoomSrv.Zoom; }
    public set ZoomType(type: InputZoomTypeFormat) { this.zoomSrv.Change(type); }
}
