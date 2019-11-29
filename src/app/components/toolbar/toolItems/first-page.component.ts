import { Component, HostListener } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-first-page',
  template: `
  <button id="firstPage" class="secondaryToolbarButton firstPage" title="转到第一页" tabindex="56" data-l10n-id="first_page" [disabled]="Enable">
    <span data-l10n-id="first_page_label">转到第一页</span>
  </button>
  `
})
export class FirstPageComponent {
  constructor(private toolbarSrv: ToolBarService) {}

  @HostListener('click')
  _click() {
    this.toolbarSrv.ScrollTo(0);
  }

  public get Enable(): boolean {
      return this.toolbarSrv.CurrentIndex === 0;
  }
}
