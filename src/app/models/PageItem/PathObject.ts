import PageItem from './PageItem.interface';

export default class TextObejct implements PageItem {
    get ItemType(): 'Path' { return 'Path'; }
    public static readonly TagName: string = 'ofd:PathObject';

    public constructor(node: Element) {

    }

    Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void {

    }
}
