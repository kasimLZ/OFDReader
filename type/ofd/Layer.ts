import { LazyCollection, Lazy } from 'type/memory';
import PageItemBase from './Infrastructure/PageItem.base';

import TextObject from './PageItem/TextObject';
import PathObject from './PageItem/PathObject';

export class Layer extends LazyCollection<PageItemBase> {
    public constructor(public LayerElement: Element) {
        super(index => this.ElementCreater(index), LayerElement.children.length);
    }

    private Id = new Lazy<number>(() => parseInt(this.LayerElement.getAttribute('ID'), null));
    public get ID(): number { return this.Id.Value; }

    public get length(): number { return this.LayerElement.children.length; }

    private ElementCreater(index: number): PageItemBase {
        if (this.LayerElement.children[index]) {
            switch (this.LayerElement.children[index].nodeName) {
                case TextObject.TagName:
                    return new TextObject(this.LayerElement.children[index]);
                case PathObject.TagName:
                    return new PathObject(this.LayerElement.children[index]);
                default:
                    throw new Error('error');
            }
        }
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
