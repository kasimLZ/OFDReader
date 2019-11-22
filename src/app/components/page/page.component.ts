import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Page } from '../../models/modules';
import { SideBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private pageWidth = 1019;
  private pageHeight;
  private pageData: Page;
  private Canvas: HTMLCanvasElement;
  private Context: CanvasRenderingContext2D;
  private ElementId: string;
  public IsRendered = false;

  constructor(private sideBarSrv: SideBarService) {}

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
    this.pageHeight = this.pageWidth / this.PageData.PhysicalScale;
  }

  private Render(): void {
    if (!this.IsRendered) {
      this.Canvas = document.querySelector(`#${this.ElementId} canvas`);
      this.Context = this.Canvas.getContext('2d');
    } else { return; }

    for (let index = 0; index < this.pageData.Length; index++) {
      this.pageData.Get(index).Draw(this.Context, 1019 / this.pageData.PhysicalWidth);
    }
    const i = parseInt(this.pageData.Index.replace('_Doc_0_Page_', ''), null);
    this.sideBarSrv.Set(i, this.PageData.PhysicalScale, this.Canvas.toDataURL('image/png'));
  }
}
