import { Component, HostListener } from '@angular/core';

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
    const RootElement: any = document.documentElement;
    const doc: any = document;
    if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
      if (RootElement.requestFullscreen) {
        RootElement.requestFullscreen();
      } else if (RootElement.webkitRequestFullscreen) {
        RootElement.webkitRequestFullscreen();
      } else if (RootElement.mozRequestFullScreen) {
        RootElement.mozRequestFullScreen();
      } else if (RootElement.msRequestFullscreen) {
        RootElement.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  }
}
