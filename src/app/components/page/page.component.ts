import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../../models/modules';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private pageData: Page;
  private Canvas: HTMLCanvasElement;
  private Context: CanvasRenderingContext2D;
  private ElementId: string;
  public IsRendered = false;

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
    this.pageData.Component = this;
    setTimeout(() => {
      this.Render();
    }, 200);
  }

  public Render(): void {
    if (!this.IsRendered) {
      this.Canvas = document.querySelector(`#${this.ElementId} canvas`);
      this.Context = this.Canvas.getContext('2d');
    }
    // console.log(this.Context);
  }
}
