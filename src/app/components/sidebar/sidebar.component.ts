import { Component } from '@angular/core';
import { PageService } from '../../services/modules';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private pagerSrv: PageService) {}

  private GoToPage(index: number): void {
    this.pagerSrv.ScrollTo(index);
  }
}
