import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  /** 边栏（预览）是否打开 */
  private sideBarStatus = false;
  public get isSideBarOpen(): boolean { return this.sideBarStatus; }

  /** 边栏容器 */
  public readonly SideBarThumbnail: { scale: number, base64: string }[] = [];

  /** 边栏开关 */
  public SideBarToggle(): void { this.sideBarStatus = !this.sideBarStatus; }

  /** 设置边栏容器 */
  public SetThumbnail(index: number, scale: number, base64: string): void {
    this.SideBarThumbnail[index] = { scale, base64 };
  }

  /** 清空边栏 */
  public Clear(): void { this.SideBarThumbnail.length = 0; }
}
