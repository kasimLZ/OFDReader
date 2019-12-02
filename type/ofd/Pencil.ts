import { Lazy } from 'type/memory';
import CollectionElement from './Infrastructure/CollectionElement';
import { IdentityElement } from './Infrastructure/IdentityElement';

export class Pencil extends IdentityElement {

    public constructor(private PencilElement: Element) {
        super(PencilElement);
    }

    private fontName = new Lazy<string>(() => this.PencilElement.getAttribute('FontName'));
    public get FontName(): string { return this.fontName.Value; }

    private familyName = new Lazy<string>(() => this.PencilElement.getAttribute('FamilyName'));
    public get FamilyName(): string { return this.familyName.Value; }
}

export class PencilCollection extends CollectionElement<Pencil> {
    public constructor(private PencilsElement: Element) {
        super(PencilsElement, 'Font', index => new Pencil(this.PencilsElement.children[index]), PencilsElement.children.length);
    }
}
