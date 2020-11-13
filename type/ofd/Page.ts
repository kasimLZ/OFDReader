import { LazyCollection } from 'type/memory';
import { PageItemBase } from './Infrastructure/PageItem.base';

import { DocShare } from './Infrastructure/DocShare';
import { Layer } from './Layer';
import { IdentityElement } from './Infrastructure/IdentityElement';
import { PhysicalBox } from './Infrastructure/PhysicalBox';

export class Page extends IdentityElement {
    private static reg: RegExp = /Pages\/Page_(\d+)\/Content.xml/;
    private Layers: Layer[] = [];
    private PageDocument: Element;
    private BaseLoc: string;

    public status = false;

    public constructor(
        DocID: number,
        private PageElement: Element,
        docShare: DocShare,
    ) {
        super(PageElement);
        this.BaseLoc = this.PageElement.getAttribute('BaseLoc');
        this.DocID = DocID;
        const mths = this.BaseLoc.match(Page.reg);
        this.Index = parseInt(mths[1], null);

        DocShare.PRESENT_ARCHIVE.file(`Doc_${DocID}/${this.BaseLoc}`).async('text').then(ctx => {
            this.PageDocument = ctx.ParseXmlDocument().documentElement;

            const PhysicalBoxs = this.PageDocument.querySelectorAll('PhysicalBox');
            if (PhysicalBoxs.length < 1) {
                this.pageBox = docShare.PhysicalBox;
            } else {
                this.pageBox = new PhysicalBox(PhysicalBoxs[0]);
            }

            const layers = this.PageDocument.querySelectorAll('Layer');

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < layers.length; i++) {
                const layer = new Layer(layers[i], docShare);
                this.Layers.push(layer);
                this.length += layer.length;
            }
            this.status = true;
        });
    }

    public readonly DocID: number = null;

    public readonly Index: number = null;

    private pageBox: PhysicalBox;
    public get Width(): number { return this.status ? this.pageBox.Width : 0; }
    public get Height(): number { return this.status ? this.pageBox.Heigth : 0; }
    public get Scale(): number { return this.status ? this.Width / this.Height : 1; }

    private length = 0;
    public get Length(): number { return this.length; }

    public GetItemByIndex(index: number): PageItemBase {
        if (index >= 0 && index < this.Length) {
            for (const layer of this.Layers) {
                if (index < layer.length) {
                    return layer.GetByIndex(index);
                } else {
                    index -= layer.length;
                }
            }
        }
        return null;
    }

    public GetItemByID(id: number): PageItemBase {
        let item: PageItemBase = null;
        for (const layer of this.Layers) {
            item = layer.GetById(id);
            if (item) { break; }
        }
        return item;
    }

    [Symbol.iterator](): IterableIterator<PageItemBase> {
        let index = 0;
        const length = this.length;
        const self = this;
        return {
            [Symbol.iterator](): IterableIterator<PageItemBase> {
                return this;
            },
            next(): IteratorResult<PageItemBase> {
                return {done: index >= length, value: self.GetItemByIndex(index++)};
            }
        };
    }
}

export class PageCollection extends LazyCollection<Page> implements Iterable<Page> {

    constructor(DocID: number, PageElements: NodeListOf<Element>, docShare: DocShare) {
        super(index => new Page(DocID, PageElements[index], docShare), PageElements.length);
    }
}
