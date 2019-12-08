import { Component, HostListener } from '@angular/core';
import { SearchService } from 'src/app/services/modules';

@Component({
  selector: 'app-search',
  template: `
    <button id="viewFind"
        [ngClass]="{toolbarButton: true, group: true, hiddenSmallView: true, toggled: SearchSrv.Status}"
        title="在文档中查找" tabindex="12" data-l10n-id="findbar">
        <span data-l10n-id="findbar_label">查找</span>
    </button>
  `
})
export class SearchComponent {
  constructor(private SearchSrv: SearchService) {}

  @HostListener('click')
  _click() { this.SearchSrv.toggle(); }
}
