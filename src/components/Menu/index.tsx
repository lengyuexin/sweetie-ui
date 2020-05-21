import React, { useState, createContext, FC } from "react";
import classNames from "classnames";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuItemProps } from "./subMenu";

type SelectCallBack = (selectIndex: string) => void;
type MenuMode = "horizontal" | "vertical";
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

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: FC<MenuProps> = (props) => {
  const { MenuIndex, onSelect, mode, className, style, children } = props;
  const [currentActive, setActive] = useState(MenuIndex ? MenuIndex : "0");
  const classes = classNames("sweet-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  /**更新当前外层索引，执行onSelet回调*/
  const handleSelect = (index: string) => {
    setActive(index);
    onSelect?.(index);
  };

  /**将父组件的数据传递给子组件 */
  const passContext: IMenuContext = {
    index: currentActive,
    onSelet: handleSelect,
    mode: mode,
  };

  /** 定制化渲染children
   * - children.map会有安全性问题，children可以是任何react节点
   * - React.Children更安全，配合cloneElement，将index传递给子组件作为itemIndex
   * - React.Children遍历过程中使用displayName进行节点类型校验
   */

  const renderChlidren = () => {
    return React.Children.map(children, (child, index) => {
      const _child = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = _child.type;

      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(_child, {
          itemIndex: index.toString(),
        });
      } else {
        console.error(
          "Warning:Menu has a child whose type is not either MenuItem or SubMenu  "
        );
      }
    });
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passContext}>
        {renderChlidren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  MenuIndex: "0",
};

//交叉类型 Menu.Item  Menu.SubMenu
type MenuComponentType = FC<MenuProps> & {
  item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuItemProps>;
};

const TransMenu = Menu as MenuComponentType;
TransMenu.item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
