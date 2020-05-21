import React from "react";
/**
 * 作为Menu或subMenu子组件渲染数据
 * - itemIndex根据React.children 遍历结果生成，与外层索引比对，用于高亮控制
 * - 非禁用状态，点击MenuItem进行索引切换，更改父节点索引，执行onSelet回调
 */
export interface MenuItemProps {
    itemIndex?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
