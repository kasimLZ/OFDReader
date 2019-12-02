import { Lazy } from 'type/memory';
import PageItemType from './PageItem.type';

export default abstract class PageItemBase {

    constructor(protected ItemElement: Element) {}

    private Id = new Lazy<number>(() => parseInt(this.ItemElement.getAttribute('ID'), null));
    public get ID(): number { return this.Id.Value; }

    private layerID = new Lazy<number>(() => parseInt(this.ItemElement.parentElement.getAttribute('ID'), null));
    public get LayerID(): number { return this.layerID.Value; }

    public abstract ItemType: keyof PageItemType;

    public abstract Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void;

}
