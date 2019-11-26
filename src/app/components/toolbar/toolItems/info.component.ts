import { Component, HostListener } from '@angular/core';
import { InfoModalService } from 'src/app/services/modules';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-file-info',
  template: `
    <button id="documentProperties" class="secondaryToolbarButton documentProperties"
        title="文档属性…" tabindex="61" data-l10n-id="document_properties">
      <span data-l10n-id="document_properties_label">文档属性…</span>
    </button>
    `
})
export class InfoComponent {
  constructor(private infoSrv: InfoModalService) {}

  @HostListener('click')
  _click() {
    this.infoSrv.ShowInfo([{a: 'sss', b: 'fff'}, {c: 'wwww', d: 'cccc'}]);
  }
}
