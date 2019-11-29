import { Lazy } from 'type/memory';

export class Info {
    constructor(
        private InfoElement: Element,
        private Prefix: string
    ) {}

    private readonly docID = new Lazy<string>(() => this.TagText('DocID'));

    public get DocID(): string { return this.docID.Value; }

    private readonly creationDate = new Lazy<Date>(() => new Date(this.TagText('CreationDate')));

    public get CreationDate(): Date { return this.creationDate.Value; }

    private readonly modDate = new Lazy<Date>(() => new Date(this.TagText('ModDate')));

    public get ModDate(): Date { return this.modDate.Value; }

    private readonly title = new Lazy<string>(() => this.TagText('Title'));

    public get Title(): string { return this.title.Value; }

    private readonly author = new Lazy<string>(() => this.TagText('Author'));

    public get Author(): string { return this.author.Value; }

    private readonly creator = new Lazy<string>(() => this.TagText('Creator'));

    public get Creator(): string { return this.creator.Value; }

    private customData: { [key: string]: string };

    public get CustomData(): { [key: string]: string } {
        if (!this.customData) {
            const tags = this.InfoElement.getElementsByTagName(`${this.Prefix}:CustomData`);
            this.customData = {};
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < tags.length; i++) {
                this.customData[tags[i].getAttribute('Name')] = tags[i].innerHTML;
            }
        }
        return this.customData;
    }

    private TagText(Name: string): string {
        return this.InfoElement.tryGetElementTextByTagName(`${this.Prefix}:${Name}`);
    }
}
