import * as JSZip from 'jszip';
import { PhysicalBox } from './PhysicalBox';

export class DocShare {

    public static readonly DEFAULT_ZOOM = 2;

    public static PRESENT_ARCHIVE: JSZip = null;

    public PhysicalBox: PhysicalBox;
}
