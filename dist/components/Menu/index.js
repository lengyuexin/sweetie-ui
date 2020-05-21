import React, { useState, createContext } from "react";
import classNames from "classnames";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var MenuIndex = props.MenuIndex, onSelect = props.onSelect, mode = props.mode, className = props.className, style = props.style, children = props.children;
    var _a = useState(MenuIndex ? MenuIndex : "0"), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("sweet-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    /**更新当前外层索引，执行onSelet回调*/
    var handleSelect = function (index) {
        var _a;
        setActive(index);
        (_a = onSelect) === null || _a === void 0 ? void 0 : _a(index);
    };
    /**将父组件的数据传递给子组件 */
    var passContext = {
        index: currentActive,
        onSelet: handleSelect,
        mode: mode,
    };
    /** 定制化渲染children
     * - children.map会有安全性问题，children可以是任何react节点
     * - React.Children更安全，配合cloneElement，将index传递给子组件作为itemIndex
     * - React.Children遍历过程中使用displayName进行节点类型校验
     */
    var renderChlidren = function () {
        return React.Children.map(children, function (child, index) {
            var _child = child;
            var displayName = _child.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(_child, {
                    itemIndex: index.toString(),
                });
            }
            else {
                console.error("Warning:Menu has a child whose type is not either MenuItem or SubMenu  ");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: passContext }, renderChlidren())));
};
Menu.defaultProps = {
    mode: "horizontal",
    MenuIndex: "0",
};
var TransMenu = Menu;
TransMenu.item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
