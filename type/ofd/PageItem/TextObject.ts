import { PageItemBase } from '../Infrastructure/PageItem.base';
import { DocShare } from '../Infrastructure/DocShare';
import { Area } from '../Infrastructure/Area';
import { Font } from '../Resource/PublicResItems/Font';

export class TextObject extends PageItemBase {

    private static readonly DEFAULT_FONT_FAMILY = 'sans-serif';
    private static readonly DEFAULT_FONT_SIZE = 10;
    private static readonly DEFAULT_FONT_WEIGHT = 'normal';
    private static readonly DEFAULT_FONT_STYLE = 'normal';

    public static readonly TagName = 'TextObject';

    constructor(node: Element, docShare: DocShare) {
        super(node, docShare);
        const TextCodes = node.querySelectorAll('TextCode');

        if (TextCodes.length < 1) { throw new Error(`Cannot find output text in ID: ${this.ID} from layer ${this.LayerID}`); }

        this.Area = new Area(node.getAttribute('Boundary'));

        if (node.hasAttribute('Size')) {
            this.Size = parseFloat(node.getAttribute('Size'));
        }

        if (node.hasAttribute('Font')) {
            this.Font = docShare.PublicRes.Fonts.GetByID(parseInt(node.getAttribute('Font'), null));
        }

        TextCodes.forEach(a => { this.AddCharSet(a); });

        const ColorNode = node.querySelector('FillColor,StrokeColor');
        if (ColorNode) { this.SetColor(ColorNode); }
    }
    public Area: Area;

    public readonly Font: Font;

    public readonly Size: number = 1;

    public readonly CharSet: CharPosition[] = [];

    private color = '#000000';
    public get Color(): string { return this.color; }


    private SetColor(Color: Element): void {
        const ColorSpaceID = parseInt(Color.getAttribute('ColorSpace'), null);
        this.color = this.docShare.PublicRes.ColorSpaces.GetByID(ColorSpaceID).ToRgbStyle(Color.getAttribute('Value'));
    }

    private AddCharSet(TextCode: Element): void {
        let x = this.Area.X;
        if (TextCode.hasAttribute('X')) {
            x += parseFloat(TextCode.getAttribute('X'));
        }

        let y = this.Area.Y;
        if (TextCode.hasAttribute('Y')) {
            y += parseFloat(TextCode.getAttribute('Y'));
        }

        const dx: number[] = this.DeltaArray(TextCode.getAttribute('DeltaX'));
        const dy: number[] = this.DeltaArray(TextCode.getAttribute('DeltaY'));

        for (let i = 0; i < TextCode.innerHTML.length; i++) {
            this.CharSet.push({ chr: TextCode.innerHTML[i], x, y });
            if (i < dx.length) { x += dx[i]; }
            if (i < dy.length) { y += dy[i]; }
        }
    }


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
        canvas.font = `${Math.ceil(this.ZoomPos(this.Size, Zoom))}px ${this.Font.FamilyName}`;
        for (const cset of this.CharSet) {
            canvas.fillText(cset.chr, this.ZoomPos(cset.x, Zoom), this.ZoomPos(cset.y, Zoom));
        }
    }
}

export interface CharPosition {
    chr: string;
    x: number;
    y: number;
}
