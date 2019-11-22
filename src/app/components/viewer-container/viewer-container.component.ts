import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Page } from 'src/app/models/modules';
import { SideBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-viewer-container',
  templateUrl: './viewer-container.component.html',
  styleUrls: ['./viewer-container.component.css']
})
export class ViewerContainerComponent implements OnInit {

  constructor(private sideBarSrv: SideBarService) {}

  private pages: Page[];

  private lastScroll: number;

  @Input()
  get Pages() { return this.pages; }

  set Pages(value) {
      this.pages = value;
      this.pagesChange.emit(value);
  }
  @Output()
  pagesChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const thread = setInterval(() => {
      if (this.pages.length > 0) {
        this.pages.forEach(a => a.Render());
        clearInterval(thread);
      }
    } , 10);
    this.lastScroll = 0;
  }


  public test(event: any) {
    const viewerContainer = document.getElementById('viewerContainer');

    // 1 => down, -1 => up
    const direction = viewerContainer.scrollTop > this.lastScroll ? 1 : -1;

    const MiddleLine = viewerContainer.scrollTop + viewerContainer.offsetHeight / 2;

    const pageElements = document.getElementsByClassName('page');

    let CurrentIndex = this.sideBarSrv.currentIndex;

    if (direction > 0) {
      while ((pageElements[CurrentIndex + direction] as HTMLElement).offsetTop < MiddleLine) {
        CurrentIndex = CurrentIndex + direction;
      }
    } else {
      // 此处存在bug，后续处理
      console.log((pageElements[CurrentIndex + direction] as HTMLElement).offsetTop);
      console.log(MiddleLine);
      while ((pageElements[CurrentIndex + direction] as HTMLElement).offsetTop > MiddleLine) {
        CurrentIndex = CurrentIndex + direction;
      }
    }

    this.sideBarSrv.currentIndex = CurrentIndex;

  }
}
