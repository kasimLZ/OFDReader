import { PageItemBase } from '../Infrastructure/PageItem.base';
import { DocShare } from '../Infrastructure/DocShare';
import { Area } from '../Infrastructure/Area';
import { timingSafeEqual } from 'crypto';

/** Line drawing instructions */
type actionType = 'S' | 'M' | 'L' | 'Q' | 'B' | 'C';

/** Single-step operation instruction, including instruction type and required coordinates */
interface Operation {
    /** `A` instruction is not currently supported */
    action: actionType;

    /** Coordinate points required to execute the instruction */
    points: Point[];
}

/** Coordinate structure */
class Point {
    public readonly x: number;
    public readonly y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

/** Path node object, responsible for parsing and receipt of path type nodes */
export class PathObject extends PageItemBase {
    public static readonly TagName = 'PathObject';

    public constructor(node: Element, docShare: DocShare) {
        super(node, docShare);
        const AbbreviatedDatas = node.querySelectorAll('AbbreviatedData');

        this.Area = new Area(node.getAttribute('Boundary'));

        AbbreviatedDatas.forEach(a => { this.AbbreviatedDataSet(a); });

        const ColorNode = node.querySelector('FillColor,StrokeColor');
        if (ColorNode) { this.SetColor(ColorNode); }
    }

    public Area: Area;

    private color = '#000000';
    public get Color(): string { return this.color; }

    private Operations: Operation[] = [];

    private AbbreviatedDataSet(AbbreviatedData: Element): void {
        const opera = AbbreviatedData.innerHTML.trim().split(' ');
        for (let i = 0; i < opera.length; i++) {
            const item: Operation = { action: 'S', points: [] };
            const mode = opera[i].toUpperCase();
            let cxtract: number;
            switch (mode) {
                case 'S':
                case 'M':
                case 'L': cxtract = 1; break;
                case 'Q': cxtract = 2; break;
                case 'B': cxtract = 3; break;
                case 'C': break;
                default: throw new Error(`'${mode}'`);
            }
            item.action = mode;
            item.points.push(...this.CxtractCoordinate(opera, i, cxtract));
            i += cxtract * 2;
            this.Operations.push(item);
        }
    }

    private CxtractCoordinate(opera: string[], index: number, count: number): Point[] {
        const points: Point[] = [];
        for (let i = index; i < opera.length && points.length < count; i++) {
            const x = parseFloat(opera[++i]) + this.Area.X;
            if (isNaN(x)) { throw new Error (''); }
            const y = parseFloat(opera[++i]) + this.Area.Y;
            if (isNaN(y)) { throw new Error(''); }
            points.push(new Point(x, y));
        }
        return points;
    }


    private SetColor(Color: Element): void {
        const ColorSpaceID = parseInt(Color.getAttribute('ColorSpace'), null);
        this.color = this.docShare.PublicRes.ColorSpaces.GetByID(ColorSpaceID).ToRgbStyle(Color.getAttribute('Value'));
    }

    Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void {
        canvas.lineWidth = 1;
        canvas.strokeStyle = this.color;
        canvas.beginPath();

        let start: Point = null;

        for (const opera of this.Operations) {
            switch (opera.action) {
                case 'S':
                    start = opera.points[0]; break;
                case 'M':
                    canvas.moveTo(this.ZoomPos(opera.points[0].x, Zoom), this.ZoomPos(opera.points[0].y, Zoom)); break;
                case 'L':
                    canvas.lineTo(this.ZoomPos(opera.points[0].x, Zoom), this.ZoomPos(opera.points[0].y, Zoom)); break;
                case 'Q':
                case 'B': break;
                case 'C':
                    canvas.lineTo(start.x * DocShare.DEFAULT_ZOOM * Zoom, start.y * DocShare.DEFAULT_ZOOM * Zoom);
                    break;
                default:
                    throw new Error('');
            }
        }
        canvas.stroke();
    }
}


