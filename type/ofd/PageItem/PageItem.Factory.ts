import { PageItemBase } from 'type/ofd/Infrastructure/PageItem.base';

import { TextObject } from './TextObject';
import { PathObject } from './PathObject';
import { DocShare } from '../Infrastructure/DocShare';

const PageItems =
[
    TextObject,
    PathObject
];



export class PageItemFactory {

    public st: TextObject & PageItemBase;

    public static Create(element: Element, docShare: DocShare): PageItemBase {
        let tagName = element.tagName;
        if (tagName.indexOf(':') > -1) {
            const arr = tagName.split(':');
            tagName = arr[arr.length - 1];
        }
        for (const type of PageItems) {
            if (tagName === type.TagName) {
                 return PageItemFactory.Genterany(type, element, docShare);
            }
        }
        return null;
    }

    private static Genterany(
        create: (new (element: Element, docShare: DocShare) => PageItemBase),
        element: Element,
        docShare: DocShare
    ): PageItemBase {
        return new create(element, docShare);
    }
}
