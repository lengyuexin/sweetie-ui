import React from "react";
/**
 * SubMenu 用于渲染次级MenuItem
 * - 横向菜单采用hover控制菜单展开状态
 * - 横向菜单采用click控制菜单展开状态,默认全部展开
 * - SubMenu实际渲染结构与Menu一致,li>ul>li
 */
export interface SubMenuItemProps {
    itemIndex?: string;
    title: string;
    className?: string;
    style?: React.CSSProperties;
}
declare const SubMenu: React.FC<SubMenuItemProps>;
export default SubMenu;
