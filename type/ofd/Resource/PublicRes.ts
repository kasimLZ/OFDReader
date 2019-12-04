import { Lazy } from 'type/memory';
import { FontCollection } from './PublicResItems/Font';
import { ColorSpaceCollection } from './PublicResItems/ColorSpace';
import { DocShare } from 'type/ofd/Infrastructure/DocShare';

export class PublicRes {
    public constructor(private readonly PublicResElement: Element) {}

    private fonts = new Lazy<FontCollection>(() => this.LazyLoadCollection<FontCollection>(FontCollection, 'Fonts'));
    public get Fonts(): FontCollection { return this.fonts.Value; }

    private colorSpaces = new Lazy<ColorSpaceCollection>(() =>
        this.LazyLoadCollection<ColorSpaceCollection>(ColorSpaceCollection, 'ColorSpaces'));
    public get ColorSpaces(): ColorSpaceCollection { return this.colorSpaces.Value; }

    public static async Parse(DocId: number, ResElement: Element): Promise<PublicRes> {
        const Path = `Doc_${DocId}/${ResElement.innerHTML}`;
        const File = DocShare.PRESENT_ARCHIVE.file(Path);

        if (!File) { throw new Error(`Cannot found "PublicRes" profile for document ${DocId}`); }

        const PublicResElement = (await File.async('text')).ParseXmlDocument().documentElement;
        return new PublicRes(PublicResElement);
    }

    private LazyLoadCollection<T>(collection: new(element: Element) => T, ElementName: string): T {
        const Element = this.PublicResElement.querySelector(ElementName);
        if (!Element) { return null; }
        return new collection(Element);
    }
}
