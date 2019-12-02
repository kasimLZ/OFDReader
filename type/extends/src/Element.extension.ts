interface Element {
    tryGetElementTextByTagName(TagName: string): string;
}

Element.prototype.tryGetElementTextByTagName = function(TagName: string) {
    const tags = this.getElementsByTagName(TagName);
    return tags.length < 1 ? null : tags[0].innerHTML;
};
