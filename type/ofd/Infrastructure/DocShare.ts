import * as JSZip from 'jszip';
import { PhysicalBox } from './PhysicalBox';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentRes } from 'type/ofd/Resource/DocumentRes';
import { PublicRes } from 'type/ofd/Resource/PublicRes';

export class DocShare {

    public static get DEFAULT_ZOOM(): number { return window.ofd.DefaultZoom; }

    public static PRESENT_ARCHIVE: JSZip = null;

    public static DOMSANITIZER: DomSanitizer;

    public PhysicalBox: PhysicalBox;

    public DocumentRes: DocumentRes;

    public PublicRes: PublicRes;
}
