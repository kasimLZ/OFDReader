import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class InfoModalService {
    private info: { [key: string]: string }[];

    public get Info(): { [key: string]: string }[] { return this.info; }

    public get IsHide(): boolean { return this.info == null; }

    public ShowInfo(info: { [key: string]: string }[]) { this.info = info; }

    public Close() { this.info = null; }
  }
