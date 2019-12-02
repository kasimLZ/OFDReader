import { Pencil } from './Pencil';
import { Resource } from './Resource';
import { PageCollection } from './Page';
import { Lazy } from 'type/memory';
import { Info } from './Info';
import { DocShare } from './Infrastructure/DocShare';
import { PhysicalBox } from './Infrastructure/PhysicalBox';

export class Doc {
    private static readonly Reg = /Doc_(\d+)\/Document\.xml/;
    private DocPrefix: string;
    private docShare: DocShare = new DocShare();
    private DocID: number;

    private readonly DocElement: Element;

    public constructor(
        public readonly DocRoot: string,
        private readonly RootElement: Element,
        private readonly RootPrefix: string,
        XmlContext: Document
    ) {
        this.DocID = parseInt(DocRoot.match(Doc.Reg)[1], null);
        this.DocPrefix = XmlContext.getOfdPrefix();
        this.DocElement = XmlContext.documentElement;
        this.pages = new PageCollection(this.DocID, this.DocElement.querySelectorAll(`Pages Page`), this.docShare);

        const PhysicalBoxElement = XmlContext.querySelector('PhysicalBox');
        if (PhysicalBoxElement) { this.docShare.PhysicalBox = new PhysicalBox(PhysicalBoxElement); }
    }

    public readonly Index: number = 0;

    /** Document Information Container */
    private readonly info = new Lazy<Info>(() =>
        new Info(this.RootElement.getElementsByTagName(`${this.RootPrefix}:DocInfo`)[0], this.RootPrefix));

    /** Document Information Access Interface */
    public get Info(): Info { return this.info.Value; }


    private pages: PageCollection;
    public get Pages(): PageCollection { return this.pages; }

    public static async Parse(RootElement: Element, RootPrefix: string): Promise<Doc> {
        const DocRoot = RootElement.tryGetElementTextByTagName(`${RootPrefix}:DocRoot`);
        if (!DocRoot) { throw new Error(`Document root path not found`); }

        const File = DocShare.PRESENT_ARCHIVE.file(DocRoot);
        if (!File) { throw new Error(`Document root file not found`); }

        const XmlContext = (await File.async('text')).ParseXmlDocument();


        return new Doc(DocRoot, RootElement, RootPrefix, XmlContext);
    }

}
