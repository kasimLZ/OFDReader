import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-sidebar-toggle',
  template: `
  <button
    id="sidebarToggle"
    class="toolbarButton {{pageSrv.isSideBarOpen ? 'toggled' : ''}}"
    title="切换侧栏"
    tabindex="11"
    data-l10n-id="toggle_sidebar">
        <span data-l10n-id="toggle_sidebar_label">切换侧栏</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarToggleComponent {
  constructor(
    private pageSrv: PageService
  ) {}

  @HostListener('click')
  _click() {
    this.pageSrv.SideBarToggle();
  }
}
