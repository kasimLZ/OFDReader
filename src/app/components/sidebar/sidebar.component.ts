import { Component } from '@angular/core';
import { SideBarService } from '../../services/modules';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private sideBarSrv: SideBarService) {}


}
