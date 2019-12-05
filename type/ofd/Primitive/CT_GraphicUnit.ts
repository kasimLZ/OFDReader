import { Lazy } from 'type/memory';
import { ST_Box } from './ST_Box';
import { LineCapType, LineJoinType } from './EnumType';
import { ST_Array } from './ST_Array';

// tslint:disable-next-line: class-name
export abstract class CT_GraphicUnit {
    public constructor(protected proxy: Element) {}

    private boundary = new Lazy<ST_Box>(() => ST_Box.Parse(this.proxy.getAttribute('Boundary')));
    public get Boundary(): ST_Box { return this.boundary.Value; }

    public get Name(): string { return this.proxy.getAttribute('Name'); }

    public get Visible(): boolean {
        const visible = this.proxy.getAttribute('Visible');
        return visible.IsNullOrEmpty() ? true : parseBoolean(visible);
    }

    public get LineWidth(): number {
        const width = this.proxy.getAttribute('LineWidth');
        return width.IsNullOrEmpty() ? null : parseFloat(width);
    }

    public get Cap(): LineCapType { return this.proxy.getAttribute('Cap') as LineCapType; }

    public get Join(): LineJoinType { return this.proxy.getAttribute('Join') as LineJoinType; }

    public get MiterLimit(): number {
        const limit = this.proxy.getAttribute('MiterLimit');
        return limit.IsNullOrEmpty() ? 3.528 : parseFloat(limit);
    }

    public get DashOffset(): number {
        const offset = this.proxy.getAttribute('DashOffset');
        return offset.IsNullOrEmpty() ? 0 : parseFloat(offset);
    }

    private dashPattern = new Lazy<ST_Array>(() => ST_Array.Parse(this.proxy.getAttribute('DashPattern')));
    public get DashPattern(): ST_Array { return this.dashPattern.Value; }

    public get Alpha(): number {
        const alpha = this.proxy.getAttribute('Alpha');
        return alpha.IsNullOrEmpty() ? 0 : parseFloat(alpha);
    }

    // private get Actions(): any {
    //     Element e = this.getOFDElement("Actions");
    //     return e == null ? null : new Actions(e);
    // }


    // public getClips() {
    //     Element e = this.getOFDElement("Clips");
    //     return e == null ? null : new Clips(e);
    // }
}
