import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Page } from 'src/app/models/modules';
import { PageService } from 'src/app/services/modules';

@Component({
  selector: 'app-viewer-container',
  templateUrl: './viewer-container.component.html'
})
export class ViewerContainerComponent implements OnInit {

  constructor(private pageSrv: PageService) {}

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


  private Scroll(event: any) {
    const viewerContainer = document.getElementById('viewerContainer');

    // 1 => down, -1 => up
    const direction = viewerContainer.scrollTop > this.lastScroll ? 1 : -1;

    this.lastScroll = viewerContainer.scrollTop;

    const MiddleLine = viewerContainer.scrollTop + viewerContainer.offsetHeight / 2;

    const pageElements = document.getElementsByClassName('page');

    let CurrentIndex = this.pageSrv.CurrentIndex;

    if (direction > 0) {
      while (CurrentIndex < pageElements.length - 1 &&  (pageElements[CurrentIndex + direction] as HTMLElement).offsetTop < MiddleLine) {
        CurrentIndex = CurrentIndex + direction;
      }
    } else {
      while (CurrentIndex > 0 && (pageElements[CurrentIndex] as HTMLElement).offsetTop > MiddleLine) {
        CurrentIndex = CurrentIndex + direction;
      }
    }

    this.pageSrv.CurrentIndex = CurrentIndex;

  }
}
