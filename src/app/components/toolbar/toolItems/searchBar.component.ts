import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/modules';

@Component({
  selector: 'app-search-bar',
  template: `
    <div *ngIf="SearchSrv.Status" class="findbar doorHanger hiddenSmallView" id="findbar">
        <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">查找：</label>
        <input id="findInput" class="toolbarField" tabindex="91" placeholder="输入关键字，按Enter检索" (keydown)="down($event)">
        <div class="splitToolbarButton">
            <button class="toolbarButton findPrevious" title="查找词语上一次出现的位置" id="findPrevious" tabindex="92" data-l10n-id="find_previous">
                <span data-l10n-id="find_previous_label">上一页</span>
            </button>
            <div class="splitToolbarButtonSeparator"></div>
            <button class="toolbarButton findNext" title="查找词语后一次出现的位置" id="findNext" tabindex="93" data-l10n-id="find_next">
                <span data-l10n-id="find_next_label">下一页</span>
            </button>
        </div>
        <input type="checkbox" id="findHighlightAll" class="toolbarField">
        <label for="findHighlightAll" class="toolbarLabel" tabindex="94" data-l10n-id="find_highlight">全部高亮显示</label>
        <input type="checkbox" id="findMatchCase" class="toolbarField">
        <label for="findMatchCase" class="toolbarLabel" tabindex="95" data-l10n-id="find_match_case_label">区分大小写</label>
        <span id="findMsg" class="toolbarLabel"></span>
    </div>
  `
})
export class SearchBarComponent {
  constructor(private SearchSrv: SearchService) {}

  public down(e) {
  }
}
