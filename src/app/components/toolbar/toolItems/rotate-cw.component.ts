import { Component, HostListener } from '@angular/core';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-rotate-cw',
  template: `
    <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="顺时针旋转" tabindex="58" data-l10n-id="page_rotate_cw">
        <span data-l10n-id="page_rotate_cw_label">顺时针旋转</span>
    </button>
  `
})
export class RotateCWComponent {
  @HostListener('click')
  _click() {
    // this.pageSrv.SideBarToggle();
    console.log('RotateCW');
  }
}
