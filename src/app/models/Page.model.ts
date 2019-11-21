import { Lazy } from './lazy';

export class Page  {
    private static reg: RegExp = new RegExp('(Doc_\\d)/Pages/(Page_\\d)/Content.xml');
    private pageItems: any[];
    private pageElement: Element[] = [];
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

        const Member = dom.getElementsByTagName('ofd:Layer')[0].children;
        this.Length = Member.length;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < Member.length; i++) {
            this.pageElement.push(Member[i]);
        }
    }

    public readonly Index: string;

    public readonly PhysicalWidth: number;
    public readonly PhysicalHeight: number;

    public readonly Length: number;

    public Render: () => void;

    [Symbol.iterator](): Iterator<any, any, undefined> {
        return {
            next(value?: any): any {
                
                return null;
                // throw new Error("Method not implemented.");
            },
            return(value?: any): IteratorResult<any, any> {
                throw new Error("Method not implemented.");
            },
            throw(e?: any): IteratorResult<any, any> {
                throw new Error("Method not implemented.");
            }
          };
    }
}