import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /** 搜索栏是否打开 */
  private status = false;
  public get Status(): boolean { return this.status; }

  public toggle(): void {
    this.status = !this.status;
  }
}
