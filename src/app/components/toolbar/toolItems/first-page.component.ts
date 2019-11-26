import { Component, HostListener } from '@angular/core';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-first-page',
  template: `
  <button id="firstPage" class="secondaryToolbarButton firstPage" title="转到第一页" tabindex="56" data-l10n-id="first_page" [disabled]="Enable">
    <span data-l10n-id="first_page_label">转到第一页</span>
  </button>
  `
})
export class FirstPageComponent {
  constructor(private pageSrv: PageService) {}

  @HostListener('click')
  _click() {
    this.pageSrv.ScrollTo(0);
  }

  private get Enable(): boolean {
      return this.pageSrv.CurrentIndex === 0;
  }
}
