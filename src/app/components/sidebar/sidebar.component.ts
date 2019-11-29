import { Component } from '@angular/core';
import { ToolBarService } from '../../services/modules';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(public toolbarSrv: ToolBarService) {}
}
