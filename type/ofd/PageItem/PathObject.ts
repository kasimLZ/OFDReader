import PageItemBase from '../Infrastructure/PageItem.base';

export default class TextObejct extends PageItemBase {
    get ItemType(): 'Path' { return 'Path'; }
    public static readonly TagName: string = 'ofd:PathObject';

    public constructor(node: Element) {
        super(node);
    }

    Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void {

    }
}
