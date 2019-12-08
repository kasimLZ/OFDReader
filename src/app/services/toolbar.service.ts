import { Injectable } from '@angular/core';
import { ZoomService } from './zoom.service';
import { SideBarService } from './sidebar.service';
import env from './environment.variable';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  constructor(
    public readonly ZoomSrv: ZoomService,
    public readonly SideBarSrv: SideBarService,
    public readonly SearchSrv: SearchService
    ) { }

  /** 手型工具开关 */
  public get HandToolSwitch(): boolean { return env.HandToolSwitch; }
  public set HandToolSwitch(on: boolean) { env.HandToolSwitch = on; }

  /** 副工具栏 */
  public get SecondToolBarSwitch(): boolean { return env.SecondToolBarSwitch; }
  public set SecondToolBarSwitch(on: boolean) { env.SecondToolBarSwitch = on; }

  /** 当前页面索引 */
  public get CurrentIndex(): number { return env.CurrentIndex; }
  public set CurrentIndex(index: number) { env.CurrentIndex = index; }

  /** 最大页面索引 */
  public get MaxPage(): number { return env.MaxPage; }
  public set MaxPage(max: number) { env.MaxPage = max; }

  /** 视图滚动到指定页面 */
  public ScrollTo(Index: number): boolean {
    const pageElements = document.getElementsByClassName('page');
    if (Index < 0 || pageElements.length <= Index) { return false; }

    document.getElementById('viewerContainer').scrollTop = (pageElements[Index] as HTMLElement).offsetTop;
    return true;
  }
}
