/** A rectangular area divided by spaces. */
// tslint:disable-next-line: class-name
export class ST_Box {

    /** X axis (from left to right) coordinates */
    public readonly X: number = 0;

    /** Y axis (top to bottom) coordinates */
    public readonly Y: number = 0;

    /** The width of the rectangle */
    public readonly Width: number = 0;

    /** The width of the rectangle */
    public readonly Height: number = 0;

    /**
     * @param x X coordinate of the upper left corner of the rectangle, integer or floating
     * @param y Y coordinate of the upper left corner of the rectangle, integer or floating
     * @param width The width of the rectangle, integer or floating, but must be greater than 0
     * @param height The height of the rectangle, integer or floating, but must be greater than 0
     */
    public constructor(x: number, y: number, width: number, height: number) {
        this.X = x;
        this.Y = y;
        if (width <= 0) { throw new Error('width 应大于0'); }
        this.Width = width;
        if (height <= 0) { throw new Error('height 应大于0'); }
        this.Height = height;
    }

    /**
     * Get ST_Box instance, return null if the parameter is invalid
     * @param data Numeric string
     * @return Instance or null
     */
    public static Parse(data: string): ST_Box {
        if (data == null || data.trim().length === 0) { return null;  }
        const values = data.trim().split(' ');

        if (values.length !== 4) { return null; }

        return new ST_Box(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]));
    }
}
