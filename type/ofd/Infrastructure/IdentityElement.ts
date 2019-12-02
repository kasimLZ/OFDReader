import { Lazy } from 'type/memory';

export abstract class IdentityElement {
    public constructor(private element: Element) {}

    private Id = new Lazy<number>(() => parseInt(this.element.getAttribute('ID') , null));
    public get ID(): number { return this.Id.Value; }
}
