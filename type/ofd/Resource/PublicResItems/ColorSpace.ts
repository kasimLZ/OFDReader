import { CollectionElement } from 'type/ofd/Infrastructure/CollectionElement';
import { IdentityElement } from 'type/ofd/Infrastructure/IdentityElement';

type ColorMode = 'RGB' | 'CMYK' | 'GREY';

export class ColorSpace extends IdentityElement {

    public constructor(ColorSpaceElement: Element) {
        super(ColorSpaceElement);
        this.Mode = ColorSpaceElement.getAttribute('Type') as ColorMode;
    }

    public readonly Mode: ColorMode;

    public ToRgbStyle(
        c: string | number,
        m?: number,
        y?: number,
        k?: number
    ): string {
        let R: number;
        let G: number;
        let B: number;
        if (typeof c === 'string') {
            const arr = c.split(' ');
            switch (this.Mode) {
                case 'RGB':
                    if (arr.length < 3) { throw new Error(''); }
                    R = parseInt(arr[0], null);
                    G = parseInt(arr[1], null);
                    B = parseInt(arr[2], null);
                    break;
                case 'CMYK':
                    if (arr.length < 4) { throw new Error(''); }
                    const K = 100 - parseInt(arr[3], null);
                    R = 255 * (100 - parseInt(arr[0], null)) * K / 10000;
                    G = 255 * (100 - parseInt(arr[1], null)) * K / 10000;
                    B = 255 * (100 - parseInt(arr[2], null)) * K / 10000;
                    break;
                case 'GREY':
                    if (arr.length < 1) { throw new Error(''); }
                    R = G = B = parseInt(arr[0], null);
                    break;
                default:
                    throw new Error();
            }
        } else {
            switch (this.Mode) {
                case 'RGB':
                    if (!(c && m && y)) { throw new Error(''); }
                    R = c; G = m; B = y;
                    break;
                case 'CMYK':
                    R = 255 * (100 - c) * k / 10000;
                    G = 255 * (100 - m) * k / 10000;
                    B = 255 * (100 - y) * k / 10000;
                    break;
                case 'GREY':
                    R = G = B = c;
                    break;
            }
        }

        const color = [R, G, B];

        let style = '#';
        for (const value of color) {
            if (value < 0 || value > 255) { throw new Error(''); }
            style += value.toString(16).padStart(2, '0');
        }
        return style;
    }

}

export class ColorSpaceCollection extends CollectionElement<ColorSpace> {
    public constructor(private ColorSpaceElement: Element) {
        super(ColorSpaceElement,
            'ColorSpace',
            index => new ColorSpace(this.ColorSpaceElement.children[index]),
            ColorSpaceElement.children.length);
    }
}
