import { PageComponent } from '../components/page/page.component';

export class Page {
    public constructor(path: string, dom: Document) {

    }

    Index: number;

    PhysicalWidth: number;

    PhysicalHeight: number;

    Component: PageComponent | null;
}
