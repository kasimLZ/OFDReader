import { Component } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  constructor(public toobarSrv: ToolBarService) {}

  public get Feature(): OfdFeature { return window.ofd.Feature; }
  public get SecondBar(): boolean {
    return this.Feature.ToFirst || this.Feature.ToLast || this.Feature.RotateCCW ||
        this.Feature.RotateCW || this.Feature.HandTool || this.Feature.InfoDialog;
  }

  public ToggleSecondToolBar() {
    this.toobarSrv.SecondToolBarSwitch = !this.toobarSrv.SecondToolBarSwitch;
  }

  public CloseSecondToolBar() {
    this.toobarSrv.SecondToolBarSwitch = false;
  }
}
