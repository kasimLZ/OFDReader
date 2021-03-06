import { Component } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-page-selecter',
  template: `
  <div class="splitToolbarButton">
    <button class="toolbarButton pageUp" title="上一页" id="previous" tabindex="13"
      data-l10n-id="previous" [disabled]="disabled_Prev" (click)="GotoPage(-1)">
        <span data-l10n-id="previous_label">上一页</span>
    </button>
    <div class="splitToolbarButtonSeparator"></div>
    <button class="toolbarButton pageDown" title="下一页" id="next" tabindex="14"
      data-l10n-id="next" [disabled]="disabled_Next" (click)="GotoPage(1)">
        <span data-l10n-id="next_label">下一页</span>
    </button>
  </div>
  <label id="pageNumberLabel" class="toolbarLabel" for="pageNumber" data-l10n-id="page_label">页面：</label>
  <input type="number" id="pageNumber" class="toolbarField pageNumber"
     value="{{toolbarSrv.CurrentIndex + 1}}" size="4" min="1" tabindex="15" max="14" (change)="ChangePage($event)">
  <span id="numPages" class="toolbarLabel">/ {{ toolbarSrv.MaxPage }} </span>
  `
})
export class PageSelecterComponent {

  constructor(public toolbarSrv: ToolBarService) {}

  public get disabled_Prev(): boolean { return this.toolbarSrv.CurrentIndex < 1; }
  public get disabled_Next(): boolean { return this.toolbarSrv.CurrentIndex >= this.toolbarSrv.MaxPage - 1; }

  public GotoPage(move: number): void { this.toolbarSrv.ScrollTo(this.toolbarSrv.CurrentIndex + move); }

  public ChangePage(e: any) {
    const input = e.target as HTMLInputElement;
    const TargetPage = parseInt(input.value, null) - 1;

    if (!this.toolbarSrv.ScrollTo(TargetPage)) {
      input.value = this.toolbarSrv.CurrentIndex.toString();
    }
  }
}
