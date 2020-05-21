import { FC } from "react";
import { TabItemProps } from "./tabItem";
export interface TabsProps {
    /**当前激活 tab 面板的 index，默认为0 */
    defaultIndex?: number;
    /**可以扩展的 className */
    className?: string;
    /**点击 Tab 触发的回调函数 */
    onSelect?: (selectedIndex: number) => void;
    /**Tabs的样式，两种可选，默认为 line */
    type?: "line" | "card";
}
/**
 * -TabItem中获取props的label用于生成thead
 * -TabItem中只渲染children,用于生成tbody
 * -父子索引一致则高亮
 */
export declare const Tabs: FC<TabsProps>;
declare type TabsComponentType = FC<TabsProps> & {
    TabItem: FC<TabItemProps>;
};
declare const TransTabs: TabsComponentType;
export default TransTabs;
