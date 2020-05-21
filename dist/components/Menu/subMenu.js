var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./index";
import Icon from "../Icon";
import Transition from "../Transition";
var SubMenu = function (props) {
    var context = useContext(MenuContext);
    var mode = context.mode;
    var _a = useState(mode === "vertical"), open = _a[0], setOpen = _a[1];
    var itemIndex = props.itemIndex, title = props.title, className = props.className, style = props.style, children = props.children;
    var classes = classNames("menu-item submenu-item", className, {
        active: context.index === itemIndex,
        "is-opened": open,
        "is-vertical": mode === "vertical",
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!open);
    };
    var timer;
    var handleHover = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = mode === "vertical" ? { onClick: handleClick } : {};
    var MouseObj = {
        onMouseEnter: function (e) { return handleHover(e, true); },
        onMouseLeave: function (e) { return handleHover(e, false); },
    };
    var hoverEvents = mode === "horizontal" ? MouseObj : {};
    var renderChlidren = function () {
        var result = React.Children.map(children, function (child, index) {
            var _child = child;
            var displayName = _child.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(_child, {
                    itemIndex: itemIndex + "-" + index.toString(),
                });
            }
            else {
                console.error("Warning:SubMenu has a child whose type is not MenuItem ");
            }
        });
        return (React.createElement(Transition, { in: open, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: "sweet-submenu" }, result)));
    };
    return (React.createElement("li", __assign({ className: classes, style: style }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChlidren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
