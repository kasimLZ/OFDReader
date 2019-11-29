import { Component, OnInit } from '@angular/core';
import { InfoModalService } from 'src/app/services/modules';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html'
})
export class InfoModalComponent {

  constructor(public infoSrv: InfoModalService) { }

  public CloseDialog(): void {
    this.infoSrv.Close();
  }

  public InfoKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
