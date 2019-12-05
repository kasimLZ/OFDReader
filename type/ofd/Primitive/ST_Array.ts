// tslint:disable-next-line: class-name
export class ST_Array {

    public constructor(params: string[]) {
        if (params == null) { throw new Error('参数不能为空'); }

        this.array = [];

        for (const item of params) {
            if (typeof item === 'string' && !item.IsNullOrEmpty()) {
                throw new Error('数组元素为空');
            }
            this.array.push(item.toString());
        }
    }

    public static readonly unitCTM = new ST_Array(['1', '0', '0', '1', '0', '0']);

    /** data container */
    private array: string[] = [];

    public static Parse(data: string): ST_Array {
        return data.IsNullOrEmpty() ? null : new ST_Array(data.trim().split(' '));
    }

    public get size(): number { return this.array.length; }

    public get values(): string[] { return [...this.array]; }

    public get integer(): number[] {
        const arr: number[] = [];
        this.array.forEach(a => arr.push(parseInt(a, null)));
        return arr;
    }

    public get float(): number[] {
        const arr: number[] = [];
        this.array.forEach(a => arr.push(parseFloat(a)));
        return arr;
    }
}
