import { Brush } from './Brush';
import { Resource } from './Resource';
import { PageCollection } from './Page';
import { Lazy } from 'type/memory';
import { Info } from './Info';
import Env from '../services/environment.variable';

export class Doc {
    public readonly DocRoot: string;

    private DocPrefix: string;

    private DocElement: Element;

    public constructor(
        private readonly RootElement: Element,
        private readonly RootPrefix: string
    ) {
        this.DocRoot = this.RootElement.tryGetElementTextByTagName(`${RootPrefix}:DocRoot`);
        if (!this.DocRoot) { throw new Error(`Document root path not found`); }

        const File = Env.PRESENT_ARCHIVE.file(this.DocRoot);
        if (!File) { throw new Error(`Document root file not found`); }

        File.async('text').then(context => {
            const XmlContext = context.ParseXmlDocument();
            this.DocPrefix = XmlContext.getOfdPrefix();
            this.DocElement = XmlContext.documentElement;

            this.pages = new PageCollection(this.DocElement.querySelectorAll(`${this.DocPrefix}:Pages ${this.DocPrefix}:Page`));
        });
    }

    public readonly Index: number = 0;

    /** Document Information Container */
    private readonly info = new Lazy<Info>(() =>
        new Info(this.RootElement.getElementsByTagName(`${this.RootPrefix}:DocInfo`)[0], this.RootPrefix));

    /** Document Information Access Interface */
    public get Info(): Info { return this.info.Value; }


    private pages: PageCollection;
    public get Pages(): PageCollection { return this.pages; }

}
