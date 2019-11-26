import { Component, OnInit } from '@angular/core';
import { InfoModalService } from 'src/app/services/modules';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html'
})
export class InfoModalComponent implements OnInit {

  constructor(private infoSrv: InfoModalService) { }

  ngOnInit() {
  }

  private CloseDialog(): void {
    this.infoSrv.Close();
  }

  private InfoKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
