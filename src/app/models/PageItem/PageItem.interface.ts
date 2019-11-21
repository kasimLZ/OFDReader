
interface PageItemType {
    Text: string;
    Path: any;
    Image: ImageBitmap;
}

export default interface PageItem {
    ItemType: keyof PageItemType;
}



