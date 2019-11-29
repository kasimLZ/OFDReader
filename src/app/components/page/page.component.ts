import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolBarService } from 'src/app/services/modules';
import { Page } from '../../models/modules';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  public ElementId: string;
  public get pageWidth(): number { return this.pageData != null ? this.pageData.PhysicalWidth : 0; }
  public get pageHeight(): number { return this.pageData != null ? this.pageData.PhysicalHeight : 0; }

  private pageData: Page;
  private Canvas: HTMLCanvasElement;
  private Context: CanvasRenderingContext2D;
  private IsRendered = false;



  constructor(public toobarSrv: ToolBarService) {}

  @Input()
  get PageData() { return this.pageData; }

  set PageData(value) {
      this.pageData = value;
      this.pageDataChange.emit(value);
  }
  @Output()
  pageDataChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.ElementId = `pageContainer${this.pageData.Index}`;
    this.pageData.Render = () => this.Render();
  }

  public Render(): void {
    if (!this.IsRendered) {
      this.Canvas = document.querySelector(`#${this.ElementId} canvas`);
      this.Context = this.Canvas.getContext('2d');
    } else { return; }

    for (let index = 0; index < this.pageData.Length; index++) {
      this.pageData.Get(index).Draw(this.Context, 4);
    }
    const i = parseInt(this.pageData.Index.replace('_Doc_0_Page_', ''), null);
    this.toobarSrv.SideBarSrv.SetThumbnail(i, this.PageData.PhysicalScale, this.Canvas.toDataURL('image/png'));
  }

  
}
