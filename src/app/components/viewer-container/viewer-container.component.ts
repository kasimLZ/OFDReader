import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Page } from 'src/app/models/modules';
import { $ } from 'protractor';

@Component({
  selector: 'app-viewer-container',
  templateUrl: './viewer-container.component.html',
  styleUrls: ['./viewer-container.component.css']
})
export class ViewerContainerComponent implements OnInit {

  private pages: Page[];

  @Input()
  get Pages() { return this.pages; }

  set Pages(value) {
      this.pages = value;
      this.pagesChange.emit(value);
  }
  @Output()
  pagesChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }


  private bbbbbb = false;
  public test(event: any) {
    if(this.bbbbbb) return;

    setTimeout(() => {
      this.pages.forEach(a => a.Render());
    }, 2000);
    this.bbbbbb = true;
  }
}
