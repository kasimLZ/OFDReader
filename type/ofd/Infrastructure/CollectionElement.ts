import { LazyCollection } from 'type/memory';
import { IdentityElement } from './IdentityElement';

export class CollectionElement<T extends IdentityElement> extends LazyCollection<T> implements Iterable<T> {

    public constructor(
        private readonly Element: Element,
        private readonly TagName: string,
        Creater: (index: number) => T,
        length: number
    ) {
        super(Creater, length);
    }

    private ID_MAP: { [key: number]: T } = {};

    public GetByIndex(index: number): T {
        if (index < 0 || index >= this.Element.children.length) { return null; }
        const entity = this.Get(index);
        this.Element[entity.ID] = entity;
        return entity;
    }

    public GetByID(ID: number): T {
        if (!this.ID_MAP[ID]) {
            const font = this.Element.querySelector(`${this.TagName}[ID='${ID}']`);
            if (font == null) { return null; }
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.Element.children.length; i++) {
                if (ID === parseInt(this.Element.children[i].getAttribute('ID'), null)) {
                    return this.GetByIndex(i);
                }
            }
        }
        return null;
    }
}
