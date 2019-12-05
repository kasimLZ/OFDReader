interface Window {

    /** OFD Reader Configuration Node */
    ofd: OfdConfig;

    /** */
    initReaderConfig(config?: OfdConfig): void;
}

interface OfdConfig {
    /** File server base URL */
    BaseUrl: string;

    /** Default zoom size */
    DefaultZoom: number;

    /** The key of the header where the file's real name is located */
    FileHeader: string;

    /** Describe which features of the reader will be enabled */
    Feature: OfdFeature;
}

interface OfdFeature {
    DownLoad: boolean;
    FullSreen: boolean;
    HandTool: boolean;
    InfoDialog: boolean;
    PageSelecter: boolean;
    Print: boolean;
    RotateCCW: boolean;
    RotateCW: boolean;
    SideBar: boolean;
    ToFirst: boolean;
    ToLast: boolean;
    Zoomable: boolean;
}

Window.prototype.initReaderConfig = function(config?: OfdConfig) {
    this.ofd = config ? config : { Feature: {} };
};
