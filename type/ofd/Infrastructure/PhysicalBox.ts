import { Lazy } from 'type/memory';
import { DocShare } from './DocShare';

export class PhysicalBox {

    public constructor(PhysicalBoxElement: Element) {
        const data = PhysicalBoxElement.innerHTML.split(' ');

        this.Width = parseInt(data[2], null) * DocShare.DEFAULT_ZOOM;
        this.Heigth = parseInt(data[3], null) * DocShare.DEFAULT_ZOOM;
    }

    public readonly Width: number;

    public readonly Heigth: number;
}
