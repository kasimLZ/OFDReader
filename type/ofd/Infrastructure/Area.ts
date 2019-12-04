export class Area {
    constructor(position: string);

    constructor(x: number, y: number, w: number, h: number)

    constructor(x: string | number, y?: number, w?: number, h?: number ) {
        if (typeof x === 'string') {
            const parr = x.split(' ');
            if (parr.length !== 4) { throw new Error(''); }
            x = parseFloat(parr[0]);
            y = parseFloat(parr[1]);
            w = parseFloat(parr[2]);
            h = parseFloat(parr[3]);
        }

        this.X = x;
        this.Y = y;
        this.W = w;
        this.H = h;
        this.R = x + w;
        this.B = y + h;
    }

    /** Left */
    public readonly X: number;

    /** Top */
    public readonly Y: number;

    /** Width */
    public readonly W: number;

    /** Height */
    public readonly H: number;

    /** Rigth */
    private readonly R: number;
    /** Bottom */
    private readonly B: number;


    public InArea(x: number, y: number, w: number, h: number): boolean;

    public InArea(other: Area): boolean;

    public InArea(x: number | Area, y?: number, w?: number, h?: number): any {
        if (typeof x !== 'number') {
            y = x.Y;
            w = x.W;
            h = x.H;
            x = x.X;
        }

        return x >= this.X && y >= this.Y && (x + w) <= this.R && (y + h) <= this.B;
    }
}
