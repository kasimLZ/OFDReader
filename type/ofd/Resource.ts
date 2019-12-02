import { IdentityElement } from './Infrastructure/IdentityElement';

export class Resource extends IdentityElement {
    public constructor(private ResourceElement: Element) {
        super(ResourceElement);
    }

}
