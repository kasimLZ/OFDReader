import { Lazy, SearchMap } from 'type/memory';
import { CollectionElement } from 'type/ofd/Infrastructure/CollectionElement';
import { IdentityElement } from 'type/ofd/Infrastructure/IdentityElement';

const FontFamilyMap = new SearchMap<string>();

export class Font extends IdentityElement {

    public constructor(private PencilElement: Element) {
        super(PencilElement);
    }

    private fontName = new Lazy<string>(() => this.PencilElement.getAttribute('FontName'));
    public get FontName(): string { return this.fontName.Value; }

    private familyName = new Lazy<string>(() => this.TranslateFamilyName());
    public get FamilyName(): string { return this.familyName.Value; }

    private TranslateFamilyName(): string {
        let family = this.PencilElement.getAttribute('FamilyName');
        const code = FontFamilyMap.Query(family);
        if (code) { family = code; }
        return family;
    }
}

export class FontCollection extends CollectionElement<Font> {
    public constructor(private PencilsElement: Element) {
        super(PencilsElement, 'Font', index => new Font(this.PencilsElement.children[index]), PencilsElement.children.length);
    }
}

FontFamilyMap.Add('黑体', 'SimHei');
FontFamilyMap.Add('微软雅黑', 'Microsoft YaHei');
FontFamilyMap.Add('微软正黑体', 'Microsoft JhengHei');
FontFamilyMap.Add('新宋体', 'NSimSun');
FontFamilyMap.Add('新细明体', 'PMingLiU');
FontFamilyMap.Add('细明体', 'MingLiU');
FontFamilyMap.Add('标楷体', 'DFKai-SB');
FontFamilyMap.Add('仿宋', 'FangSong');
FontFamilyMap.Add('楷体', 'KaiTi');
FontFamilyMap.Add('仿宋_GB2312', 'FangSong_GB2312');
FontFamilyMap.Add('楷体_GB2312', 'KaiTi_GB2312');

// Mac OS的一些：
// 华文细黑：STHeiti Light [STXihei]'
// 华文黑体：STHeiti'
// 华文楷体：STKaiti'
// 华文宋体：STSong'
// 华文仿宋：STFangsong'
// 儷黑 Pro：LiHei Pro Medium'
// 儷宋 Pro：LiSong Pro Light'
// 標楷體：BiauKai'
// 蘋果儷中黑：Apple LiGothic Medium'
// 蘋果儷細宋：Apple LiSung Light'

// Windows的一些：
// 新細明體：PMingLiU
// 細明體：MingLiU
// 標楷體：DFKai-SB
// 黑体：SimHei
// 新宋体：NSimSun
// 仿宋：FangSong'
// 楷体：KaiTi'
// 仿宋_GB2312：FangSong_GB2312'
// 楷体_GB2312：KaiTi_GB2312'
// 微軟正黑體：Microsoft JhengHei'
// 微软雅黑体：Microsoft YaHei'

// 装Office会生出来的一些：
// 隶书：LiSu'
// 幼圆：YouYuan'
// 华文细黑：STXihei'
// 华文楷体：STKaiti'
// 华文宋体：STSong'
// 华文中宋：STZhongsong'
// 华文仿宋：STFangsong'
// 方正舒体：FZShuTi'
// 方正姚体：FZYaoti'
// 华文彩云：STCaiyun'
// 华文琥珀：STHupo'
// 华文隶书：STLiti'
// 华文行楷：STXingkai'
// 华文新魏：STXinwei'
