import { Component, HostListener } from '@angular/core';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-last-page',
  template: `
  <button id="lastPage" class="secondaryToolbarButton lastPage" title="转到最后一页" tabindex="57" data-l10n-id="last_page" [disabled]="Enable">
    <span data-l10n-id="last_page_label">转到最后一页</span>
  </button>
    `
})
export class LastPageComponent {
  constructor(private pageSrv: PageService) {}

  @HostListener('click')
  _click() {
    this.pageSrv.ScrollTo(this.pageSrv.MaxPage - 1);
  }

  private get Enable(): boolean {
    return this.pageSrv.CurrentIndex === this.pageSrv.MaxPage - 1;
}
}
