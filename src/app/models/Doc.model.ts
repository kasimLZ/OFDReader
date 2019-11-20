import { Brush } from './Brush.model';
import { Resource } from './Resource.model';
import { Page } from './Page.model';

export class Doc {

    private DocElement: Element;
    private index: number;

    public constructor(index: number, DocElement: Element) {
        this.DocElement = DocElement;

        this.docRoot = this.DocElement.tryGetElementTextByTagName('ofd:DocRoot');
        if (!this.docRoot) { throw new Error(`找不到入口文件`); }

        this.index = index;

        this.Brushs = [];
        this.Resources = [];
        this.Pages = [];
    }

    public get Index(): number { return this.index; }

    private docID: string;

    public get DocID(): string {
        return !this.docID ?
            this.docID = this.TagText('ofd:DocID')
            : this.docID;
    }

    private creationDate: Date;

    public get CreationDate(): Date {
        return !this.creationDate ?
            this.creationDate = new Date(this.TagText('ofd:CreationDate'))
            : this.creationDate;
    }

    private modDate: Date;

    public get ModDate(): Date {
        return !this.modDate ?
            this.modDate = new Date(this.TagText('ofd:ModDate'))
            : this.modDate;
    }

    private title: string;

    public get Title(): string {
        return !this.title ?
            this.title = this.TagText('ofd:Title')
            : this.title;
    }

    private author: string;

    public get Author(): string {
        return !this.author ?
            this.author = this.TagText('ofd:Author')
            : this.author;
    }

    private creator: string;

    public get Creator(): string {
        return !this.creator ?
            this.creator = this.TagText('ofd:Creator')
            : this.creator;
    }

    private customData: { [key: string]: string };

    public get CustomData(): { [key: string]: string } {
        if (!this.customData) {
            const tags = this.DocElement.getElementsByTagName('ofd:CustomData');
            this.customData = {};
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < tags.length; i++) {
                this.customData[tags[i].getAttribute('Name')] = tags[i].innerHTML;
            }
        }
        return this.customData;
    }

    private docRoot: string;

    public get DocRoot(): string { return this.docRoot; }

    /**
     * 画笔
     */
    Brushs: Brush[];

    /**
     * 资源
     */
    Resources: Resource[];

    /**
     * 页面
     */
    Pages: Page[];

    private TagText(Name: string): string {
        return this.DocElement.tryGetElementTextByTagName(Name);
    }
}
