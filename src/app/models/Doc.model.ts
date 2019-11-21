import { Brush } from './Brush.model';
import { Resource } from './Resource.model';
import { Page } from './Page.model';
import { Lazy } from './lazy';

export class Doc {

    private DocElement: Element;

    public readonly DocRoot: string;

    public constructor(index: number, DocElement: Element) {
        this.DocElement = DocElement;

        this.DocRoot = this.DocElement.tryGetElementTextByTagName('ofd:DocRoot');
        if (!this.DocRoot) { throw new Error(`找不到入口文件`); }

        this.Index = index;
    }

    public readonly Index: number;

    private readonly docID = new Lazy<string>(() => this.TagText('ofd:DocID'));

    public get DocID(): string { return this.docID.Value; }

    private readonly creationDate = new Lazy<Date>(() => new Date(this.TagText('ofd:CreationDate')));

    public get CreationDate(): Date { return this.creationDate.Value; }

    private readonly modDate = new Lazy<Date>(() => new Date(this.TagText('ofd:ModDate')));

    public get ModDate(): Date { return this.modDate.Value; }

    private readonly title = new Lazy<string>(() => this.TagText('ofd:Title'));

    public get Title(): string { return this.title.Value; }

    private readonly author = new Lazy<string>(() => this.TagText('ofd:Author'));

    public get Author(): string { return this.author.Value; }

    private readonly creator = new Lazy<string>(() => this.TagText('ofd:Creator'));

    public get Creator(): string { return this.creator.Value; }

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

    public Brushs: Brush[] = [];

    public Resources: Resource[] = [];

    public Pages: Page[] = [];

    private TagText(Name: string): string {
        return this.DocElement.tryGetElementTextByTagName(Name);
    }
}
