import { Component, HostListener } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-last-page',
  template: `
  <button id="lastPage" class="secondaryToolbarButton lastPage" title="转到最后一页" tabindex="57" data-l10n-id="last_page" [disabled]="Enable">
    <span data-l10n-id="last_page_label">转到最后一页</span>
  </button>
    `
})
export class LastPageComponent {
  constructor(private toobarSrv: ToolBarService) {}

  @HostListener('click')
  _click() {
    this.toobarSrv.ScrollTo(this.toobarSrv.MaxPage - 1);
  }

  public get Enable(): boolean {
    return this.toobarSrv.CurrentIndex === this.toobarSrv.MaxPage - 1;
}
}
