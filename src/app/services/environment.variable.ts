import * as JSZip from 'jszip';

export default class EnvironmentVariable {

    public static readonly DEFAULT_SCALE = 'auto';
    public static readonly MAX_AUTO_SCALE = 1.25;
    public static readonly SCROLLBAR_PADDING = 40;
    public static readonly VERTICAL_PADDING = 5;

    public static HandToolSwitch = false;
    public static SecondToolBarSwitch = false;
    public static CurrentIndex = 0;
    public static MaxPage = 0;

    public static PRESENT_ARCHIVE: JSZip = null;
}
