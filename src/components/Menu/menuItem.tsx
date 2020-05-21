import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./index";

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
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext);
  const { itemIndex, disabled, className, style, children } = props;
  const classes = classNames("menu-item", className, {
    disabled: disabled,
    active: context.index === itemIndex,
  });

  const handleSelect = () => {
    if (!disabled && context.onSelet && itemIndex) {
      context.onSelet(itemIndex);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleSelect}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  disabled: false,
  itemIndex: "0",
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
