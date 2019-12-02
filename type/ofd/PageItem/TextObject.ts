import PageItemBase from '../Infrastructure/PageItem.base';
import { DocShare } from '../Infrastructure/DocShare';

export default class TextObejct extends PageItemBase {

    constructor(node: Element) {
        super(node);

        const TextCode = node.getElementsByTagName('ofd:TextCode')[0];

        const Boundarys = node.getAttribute('Boundary').split(' ');

        let x = parseFloat(Boundarys[0]);
        if (TextCode.hasAttribute('X')) {
            x += parseFloat(TextCode.getAttribute('X'));
        }

        let y = parseFloat(Boundarys[1]);
        if (TextCode.hasAttribute('Y')) {
            y += parseFloat(TextCode.getAttribute('Y'));
        }

        const dx: number[] = this.DeltaArray(TextCode.getAttribute('DeltaX'));
        const dy: number[] = this.DeltaArray(TextCode.getAttribute('DeltaY'));

        this.CharSet = [];
        for (let i = 0; i < TextCode.innerHTML.length; i++) {
            this.CharSet.push({ chr: TextCode.innerHTML[i], x, y });
            if (i < dx.length) { x += dx[i]; }
            if (i < dy.length) { y += dy[i]; }
        }

        const ColorNodes = node.getElementsByTagName('ofd:FillColor');
        if (ColorNodes.length > 0) {
            const ColorArr = ColorNodes[0].getAttribute('Value').split(' ');
            this.Color = '#';
            for (let i = 0; i < 3; i++) {
                const color = ColorArr.length > i ? ColorArr[i] : '0';
                this.Color += parseInt(color, null).toString(16).padStart(2, '0');
            }
        }

        if (node.hasAttribute('Size')) {
            this.Size = parseFloat(node.getAttribute('Size'));
        }
    }

    get ItemType(): 'Text' { return 'Text'; }

    public static readonly TagName: string = 'ofd:TextObject';

    public readonly Color: string = '#000000';

    public readonly Size: number = 1;

    public readonly CharSet: {chr: string, x: number, y: number}[];

    private DeltaArray(deltaStr: string): number[] {
        const delta: number[] = [];
        if (!deltaStr || deltaStr.length < 1) {
            return delta;
        }

        const deltaArr = deltaStr.split(' ');

        for (let i = 0; i < deltaArr.length; i++) {
            if (deltaArr[i] !== 'g') {
                delta.push(parseFloat(deltaArr[i]));
            } else {
                const len = parseInt(deltaArr[++i], null);
                const ix = parseFloat(deltaArr[++i]);
                for (let j = 0; j < len; j++) { delta.push(ix); }
            }
        }
        return delta;
    }

    public Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void {
        if (!Zoom) { Zoom = 1; }
        canvas.fillStyle = this.Color;
        canvas.font = `${Math.ceil(this.Size * DocShare.DEFAULT_ZOOM * Zoom)}px SimSun`;
        for (const cset of this.CharSet) {
            canvas.fillText(cset.chr, cset.x * DocShare.DEFAULT_ZOOM * Zoom, cset.y  * DocShare.DEFAULT_ZOOM * Zoom);
        }
    }
}
