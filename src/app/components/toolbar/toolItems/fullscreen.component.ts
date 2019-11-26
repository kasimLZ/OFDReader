import { Component, HostListener } from '@angular/core';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-fullscreen',
  template: `
  <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView"
     title="切换到全屏模式" tabindex="31" data-l10n-id="presentation_mode">
    <span data-l10n-id="presentation_mode_label">全屏</span>
  </button>
  `
})
export class FullScreenComponent {
  @HostListener('click')
  _click() {
    // this.pageSrv.SideBarToggle();
    console.log('fullscreen');
  }
}
