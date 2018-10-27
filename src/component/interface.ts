import { ImageHotspotConfData } from './ImageHotspotConfig/interface';
import { CarouselConfData } from './CarouselConfig/interface';
import { LayerConfData } from './LayerConfig/interface';

export interface ImageInfo {
    url: string;
    name?: string;
}

export interface AreaInfo {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    ref?: number;
}

// 热区定义
export interface HotspotInfo {
    url: string;
    area?: AreaInfo;
}

// 商品定义
export interface IGoodsInfo {
    name: string;
    id: number;
    img: string;
    price?: number;
    description?: string;
}

// 模板定义
export interface ITemplateInfo {
    name: string;
    id: number;
    moduleType: number;
    template?: string;
    style?: string;
    templateBabeled?: string;
    imgUrl?: string;
}

// tempData定义
export interface ITempData {
    isActive: boolean;
    top: number;
    height: number;
}

// moduleData接口定义
export interface IModuleData {
    moduleTypeId: number;
    moduleName: number;
    pageId: number;
    moduleId: number;
    data: any;
    // configData: ImageHotspotConfData | CarouselConfData | GoodsConfData;
    // TODO 详细枚举
    configData: any;
    tempData: ITempData;
}

// moduleConfig接口定义
export interface IModuleConfig {
    isVisible: boolean;
    moduleData: IModuleData;
}

// state中module定义
export interface IModule {
    moduleList: IModuleData[];
}

// state定义
export interface IState {
    module: IModule;
    moduleConfig: IModuleConfig;
}

// pageType
export enum PageType {
    Decorate,
    Preview,
    View,
}

// BASE_DATA
export interface IBASE_DATA {
    pageId: string;
    pageInfo: any;
    pageType: PageType;
    username: string;
}

// Context
export interface IContext {
    BASE_DATA: IBASE_DATA;
}

export enum TemplateType {
    System,
    User,
}