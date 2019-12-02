interface Document {
    getContextNameSpaces(): { [key: string]: string };
    getOfdPrefix(): string;
}

Document.prototype.getContextNameSpaces = function(): { [key: string]: string } {
    const space: { [key: string]: string } = {};
    const docelem = (this as Document).documentElement;
    docelem.getAttributeNames().forEach(item => {
        if (item.startsWith('xmlns:')) {
            space[item.replace('xmlns:', '')] = docelem.getAttribute(item);
        }
    });
    return space;
};

Document.prototype.getOfdPrefix = function(): string {
    const OFdNameSpaceURI = 'http://www.ofdspec.org';

    const NameSpace = this.getContextNameSpaces();

    for (const key of Object.keys(NameSpace)) {
        if (NameSpace[key].startsWith(OFdNameSpaceURI)) {
            return key;
        }
    }
};
