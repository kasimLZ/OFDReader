import { LazyCollection, Lazy } from 'type/memory';
import { PageItemBase } from './Infrastructure/PageItem.base';
import { PageItemFactory } from './PageItem/PageItem.Factory';

import { DocShare } from './Infrastructure/DocShare';

export class Layer extends LazyCollection<PageItemBase> {
    public constructor(public LayerElement: Element, private docShare: DocShare) {
        super(index => this.ElementCreater(index), LayerElement.children.length);
    }

    private Id = new Lazy<number>(() => parseInt(this.LayerElement.getAttribute('ID'), null));
    public get ID(): number { return this.Id.Value; }

    public get length(): number { return this.LayerElement.children.length; }

    private ElementCreater(index: number): PageItemBase {
        if (this.LayerElement.children[index]) {
            return PageItemFactory.Create(this.LayerElement.children[index], this.docShare);
        }
        return null;
    }

    public GetByIndex(index: number): PageItemBase {
        return this.Get(index);
    }

    public GetById(id: number): PageItemBase {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.length; i++) {
            if (this.LayerElement.children[i].getAttribute('ID') === id.toString()) {
                return this.Get(id);
            }
        }
        return null;
    }
}
