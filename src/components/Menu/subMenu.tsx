import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./index";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon";
import Transition from "../Transition";

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

const SubMenu: React.FC<SubMenuItemProps> = (props) => {
  const context = useContext(MenuContext);
  const { mode } = context;

  const [open, setOpen] = useState(mode === "vertical");

  const { itemIndex, title, className, style, children } = props;
  const classes = classNames("menu-item submenu-item", className, {
    active: context.index === itemIndex,
    "is-opened": open,
    "is-vertical": mode === "vertical",
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  let timer: any;
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const clickEvents = mode === "vertical" ? { onClick: handleClick } : {};

  const MouseObj = {
    onMouseEnter: (e: React.MouseEvent) => handleHover(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleHover(e, false),
  };
  const hoverEvents = mode === "horizontal" ? MouseObj : {};

  const renderChlidren = () => {
    const result = React.Children.map(children, (child, index) => {
      const _child = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = _child.type;

      if (displayName === "MenuItem") {
        return React.cloneElement(_child, {
          itemIndex: `${itemIndex}-${index.toString()}`,
        });
      } else {
        console.error(
          "Warning:SubMenu has a child whose type is not MenuItem "
        );
      }
    });

    return (
      <Transition in={open} timeout={300} animation="zoom-in-top">
        <ul className={"sweet-submenu"}>{result}</ul>
      </Transition>
    );
  };

  return (
    <li className={classes} style={style} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChlidren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
