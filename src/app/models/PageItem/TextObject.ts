import PageItem from './PageItem.interface';

export class TextObejct implements PageItem {

    constructor() {

    }

    get ItemType(): 'Text' { return 'Text'; }

    public readonly Color: string;

    public readonly Font: string;

    public readonly X: number;

    public readonly Y: number;

    public readonly WordSpacing: number[];

    public readonly CharSet: string[];

}
