import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-rotate-ccw',
  template: `
    <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="逆时针旋转" tabindex="59" data-l10n-id="page_rotate_ccw">
      <span data-l10n-id="page_rotate_ccw_label">逆时针旋转</span>
    </button>
  `
})
export class RotateCCWComponent {
  @HostListener('click')
  _click() {
    // this.pageSrv.SideBarToggle();
    console.log('RotateCCW');
  }
}
