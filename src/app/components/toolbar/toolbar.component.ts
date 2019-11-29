import { Component } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  constructor(public toobarSrv: ToolBarService) {}

  public ToggleSecondToolBar() {
    this.toobarSrv.SecondToolBarSwitch = !this.toobarSrv.SecondToolBarSwitch;
  }

  public CloseSecondToolBar() {
    this.toobarSrv.SecondToolBarSwitch = false;
  }
}
