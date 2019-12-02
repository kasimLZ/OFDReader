import CollectionElement from './Infrastructure/CollectionElement';
import { IdentityElement } from './Infrastructure/IdentityElement';

export class ColorSpace extends IdentityElement {

    public constructor(private ColorSpaceElement: Element) {
        super(ColorSpaceElement);
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
