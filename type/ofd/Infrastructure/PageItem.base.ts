import { Lazy } from 'type/memory';
import { PageItemType } from './PageItem.type';
import { DocShare } from './DocShare';

/** Generic base class for page element nodes */
export abstract class PageItemBase {

    constructor(protected ItemElement: Element, protected docShare: DocShare) {}

    private Id = new Lazy<number>(() => parseInt(this.ItemElement.getAttribute('ID'), null));
    public get ID(): number { return this.Id.Value; }

    private layerID = new Lazy<number>(() => parseInt(this.ItemElement.parentElement.getAttribute('ID'), null));
    public get LayerID(): number { return this.layerID.Value; }

    /** Abstract rendering interface, which requires different types of elements to independently display rendering solutions */
    public abstract Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void;

    protected ZoomPos(coordinate: number, zoom?: number): number {
        if (!zoom) { zoom = 1; }
        return coordinate * DocShare.DEFAULT_ZOOM * zoom;
    }

}
