import React, { FC } from "react";
import { MenuItemProps } from "./menuItem";
import { SubMenuItemProps } from "./subMenu";
declare type SelectCallBack = (selectIndex: string) => void;
declare type MenuMode = "horizontal" | "vertical";
interface MenuProps {
    /**索引 */
    MenuIndex?: string;
    /**点击切换的回调 */
    onSelect?: SelectCallBack;
    /**菜单模式 横竖 */
    mode?: MenuMode;
    /**类名 */
    className?: string;
    /**样式 */
    style?: React.CSSProperties;
}
/**
 * - 使用context自上而下传递数据流
 * - 父子组件index一致则高亮
 * - onSelet用于更新父组件索引并执行传入的回调
 */
interface IMenuContext {
    index: string;
    onSelet?: SelectCallBack;
    mode?: MenuMode;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare type MenuComponentType = FC<MenuProps> & {
    item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuItemProps>;
};
declare const TransMenu: MenuComponentType;
export default TransMenu;
