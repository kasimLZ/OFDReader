import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-print',
  template: `
  <button id="print" class="toolbarButton print hiddenMediumView" title="打印" tabindex="33" data-l10n-id="print">
    <span data-l10n-id="print_label">打印</span>
  </button>
  `
})
export class PrintComponent {
  constructor() {}

  @HostListener('click')
  _click() {
    // this.pageSrv.SideBarToggle();
    console.log('print');
  }
}
