import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { Page } from 'src/app/models/modules';
import { ToolBarService } from 'src/app/services/modules';

@Component({
  selector: 'app-viewer-container',
  templateUrl: './viewer-container.component.html'
})
export class ViewerContainerComponent implements OnInit {

  constructor(private toolbarSrv: ToolBarService) {}


  @Input()
  get Pages() { return this.pages; }

  set Pages(value) {
      this.pages = value;
      this.pagesChange.emit(value);
  }

  public pages: Page[] = [];
  public lastScroll = 0;
  @Output()
  pagesChange: EventEmitter<any> = new EventEmitter();

  private startDrag = false;

  ngOnInit() {
    const thread = setInterval(() => {
      if (this.pages.length > 0) {
        this.pages.forEach(a => a.Render());
        clearInterval(thread);
      }
    } , 10);
    this.lastScroll = 0;
  }

  public Scroll() {
    const viewerContainer = document.getElementById('viewerContainer');

    // 1 => down, -1 => up
    const direction = viewerContainer.scrollTop > this.lastScroll ? 1 : -1;

    this.lastScroll = viewerContainer.scrollTop;

    const MiddleLine = viewerContainer.scrollTop + viewerContainer.offsetHeight / 2;

    const pageElements = document.getElementsByClassName('page');

    let CurrentIndex = this.toolbarSrv.CurrentIndex;

    if (direction > 0) {
      while (CurrentIndex < pageElements.length - 1 &&  (pageElements[CurrentIndex + direction] as HTMLElement).offsetTop < MiddleLine) {
        CurrentIndex = CurrentIndex + direction;
      }
    } else {
      while (CurrentIndex > 0 && (pageElements[CurrentIndex] as HTMLElement).offsetTop > MiddleLine) {
        CurrentIndex = CurrentIndex + direction;
      }
    }

    this.toolbarSrv.CurrentIndex = CurrentIndex;

  }


  @HostListener('mousedown', ['$event'])
  public MouseDown(e: any) {
    if (this.toolbarSrv.HandToolSwitch) {
      this.startDrag = true;
    }
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('mouseup', ['$event'])
  public MouseUp(e: any) {
    if (this.toolbarSrv.HandToolSwitch) {
      this.startDrag = false;
    }
  }

  @HostListener('mousemove', ['$event'])
  public MouseDrag(e: any) {
    if (this.toolbarSrv.HandToolSwitch && this.startDrag) {
      const viewerContainer = document.getElementById('viewerContainer');
      viewerContainer.scrollTop -= e.movementY;
      viewerContainer.scrollLeft -= e.movementX;
    }
  }
}
