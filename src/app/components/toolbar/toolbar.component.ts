import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  private SecondTookBar = true;

  private ToggleSecondToolBar() {
    this.SecondTookBar = !this.SecondTookBar;
  }
}
