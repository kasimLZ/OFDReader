import { Component, HostListener } from '@angular/core';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-download',
  template: `
    <button id="download" class="toolbarButton download hiddenMediumView" title="下载" tabindex="34" data-l10n-id="download">
      <span data-l10n-id="download_label">下载</span>
    </button>
  `
})
export class DownloadComponent {
  @HostListener('click')
  _click() {
    // this.pageSrv.SideBarToggle();
    console.log('ffffff');
  }
}
