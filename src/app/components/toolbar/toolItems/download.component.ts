import { Component, HostListener } from '@angular/core';
import { DocumentService } from 'src/app/services/modules';

@Component({
  selector: 'app-download',
  template: `
    <button id="download" class="toolbarButton download hiddenMediumView" title="下载" tabindex="34" data-l10n-id="download">
      <span data-l10n-id="download_label">下载</span>
    </button>
  `
})
export class DownloadComponent {

  constructor(private docSrv: DocumentService) {}

  @HostListener('click')
  _click() {
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(this.docSrv.PackageBlob, 'test.ofd');
    } else {
      const url = window.URL.createObjectURL(this.docSrv.PackageBlob);
      const link = document.createElement('a');

      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', 'test.ofd');
      document.body.appendChild(link);
      link.click();
    }
  }
}
