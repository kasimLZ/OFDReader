import { Lazy } from './lazy';
import PageItem from './PageItem/PageItem.interface';
import TextObject from './PageItem/TextObject';
import PathObject from './PageItem/PathObject';

export class Page {
    private static reg: RegExp = new RegExp('(Doc_\\d)/Pages/(Page_\\d)/Content.xml');
    private pageItems: PageItem[] = [];
    private Member: HTMLCollection;
    private Document: Document;
    private pointer: number;

    public constructor(path: string, dom: Document) {
        this.Document = dom;
        const mths = path.match(Page.reg);
        this.Index = `_${mths[1]}_${mths[2]}`;

        const PhysicalBoxs = this.Document.getElementsByTagName('ofd:PhysicalBox');
        if (PhysicalBoxs.length < 1) { throw new Error('找不到默认页面尺寸'); }
        const Size = PhysicalBoxs[0].innerHTML.split(' ');
        this.PhysicalWidth = parseInt(Size[2], null);
        this.PhysicalHeight = parseInt(Size[3], null);
        this.PhysicalScale = this.PhysicalWidth / this.PhysicalHeight;

        this.Member = dom.getElementsByTagName('ofd:Layer')[0].children;
    }

    public readonly Index: string;

    public readonly PhysicalWidth: number;
    public readonly PhysicalHeight: number;
    public readonly PhysicalScale: number;

    public get Length(): number { return this.Member.length; }

    public Render: () => void;

    public Get(index: number): PageItem {
        if (index < 0 || index >= this.Length) {
            return null;
        }
        if (!this.pageItems[index]) {
            switch (this.Member[index].nodeName) {
                case TextObject.TagName:
                    this.pageItems.push(new TextObject(this.Member[index])); break;
                case PathObject.TagName:
                    this.pageItems.push(new PathObject(this.Member[index])); break;
                default:
                    console.warn(this.Member[index].nodeName);
            }
        }
        return this.pageItems[index];
    }
}
