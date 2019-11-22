
interface PageItemType {
    Text: string;
    Path: any;
    Image: ImageBitmap;
}

export default interface PageItem {
    ItemType: keyof PageItemType;
    Draw(canvas: CanvasRenderingContext2D, Zoom?: number): void;
}



