import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private currentIndex = 0;
  public get CurrentIndex(): number { return this.currentIndex; }
  public set CurrentIndex(index: number) { this.currentIndex = index; }


  private maxPage = 0;
  public get MaxPage(): number { return this.maxPage; }
  public set MaxPage(max: number) { this.maxPage = max; }

  private sideBarStatus = false;

  public readonly SideBarThumbnail: { scale: number, base64: string }[] = [];

  public SideBarToggle(): void { this.sideBarStatus = !this.sideBarStatus; }

  public SetThumbnail(index: number, scale: number, base64: string): void {
    this.SideBarThumbnail[index] = { scale, base64 };
  }

  public Clear(): void { this.SideBarThumbnail.length = 0; }

  public get isSideBarOpen(): boolean { return this.sideBarStatus; }

  public ScrollTo(Index: number): boolean {
    const pageElements = document.getElementsByClassName('page');
    if (Index < 0 || pageElements.length <= Index) { return false; }

    document.getElementById('viewerContainer').scrollTop = (pageElements[Index] as HTMLElement).offsetTop;
    return true;
  }
}
