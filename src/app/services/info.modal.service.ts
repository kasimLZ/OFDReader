import { Injectable } from '@angular/core';
import { DocumentService } from './document.service';
import { Info } from 'type/ofd';
import { Lazy } from 'type/memory';

@Injectable({
    providedIn: 'root'
  })
  export class InfoModalService {

    public constructor(private DocSrv: DocumentService) {}

    private visible = false;

    private info = new Lazy<Info>( () =>  this.DocSrv.PresentDocument.Info);

    public get Info(): Info { return this.info.Value; }

    public get Visible(): boolean { return this.visible; }

    public ShowInfo() { this.visible = true; }

    public Close() { this.visible = false; }
  }
