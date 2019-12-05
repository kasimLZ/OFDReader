interface String {
    /**
     * Convert xml string to dom
     * @param content xml string
     */
    ParseXmlDocument(): Document;

    IsNullOrEmpty(): boolean;
}


String.prototype.ParseXmlDocument = function(): Document {
    if (DOMParser) {
        return new DOMParser().parseFromString(this, 'text/xml');
    } else {
        const xmlDoc = new (window as any).ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = 'false';
        xmlDoc.loadXML(this);
        return xmlDoc;
    }
};

String.prototype.IsNullOrEmpty = function(): boolean {
    return this == null || this.trim().length === 0;
}
