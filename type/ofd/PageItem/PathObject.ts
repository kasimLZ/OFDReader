import { PageItemBase } from '../Infrastructure/PageItem.base';
import { DocShare } from '../Infrastructure/DocShare';

export class PathObject extends PageItemBase {
    public static readonly TagName = 'PathObject';


    public constructor(node: Element, docShare: DocShare) {
        super(node, docShare);
    }

    Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void {

    }
}
