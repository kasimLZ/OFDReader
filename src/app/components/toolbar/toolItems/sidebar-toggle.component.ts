import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-sidebar-toggle',
  template: `
  <button
    id="sidebarToggle"
    class="toolbarButton {{toobarSrv.SideBarSrv.isSideBarOpen ? 'toggled' : ''}}"
    title="切换侧栏"
    tabindex="11"
    data-l10n-id="toggle_sidebar">
        <span data-l10n-id="toggle_sidebar_label">切换侧栏</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarToggleComponent {
  constructor(public toobarSrv: ToolBarService) {}

  @HostListener('click')
  _click() {
    this.toobarSrv.SideBarSrv.SideBarToggle();
  }
}
