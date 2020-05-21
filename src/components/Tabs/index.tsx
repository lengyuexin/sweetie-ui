import React, { FC, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import TabItem, { TabItemProps } from "./tabItem";
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
export const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, children, type } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disabled: boolean | undefined
  ) => {
    e.preventDefault();
    if (!disabled) {
      setActiveIndex(index);
      onSelect?.(index);
    }
  };
  const navClass = classNames("sweet-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("sweet-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled);
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={`sweet-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="sweet-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};

//交叉类型 Tabs.TabItem
type TabsComponentType = FC<TabsProps> & {
  TabItem: FC<TabItemProps>;
};

const TransTabs = Tabs as TabsComponentType;
TransTabs.TabItem = TabItem;
export default TransTabs;
