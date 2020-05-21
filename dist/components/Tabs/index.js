import React, { useState } from "react";
import classNames from "classnames";
import TabItem from "./tabItem";
/**
 * -TabItem中获取props的label用于生成thead
 * -TabItem中只渲染children,用于生成tbody
 * -父子索引一致则高亮
 */
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, children = props.children, type = props.type;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (e, index, disabled) {
        var _a;
        e.preventDefault();
        if (!disabled) {
            setActiveIndex(index);
            (_a = onSelect) === null || _a === void 0 ? void 0 : _a(index);
        }
    };
    var navClass = classNames("sweet-tabs-nav", {
        "nav-line": type === "line",
        "nav-card": type === "card",
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames("sweet-tabs-nav-item", {
                "is-active": activeIndex === index,
                disabled: disabled,
            });
            return (React.createElement("li", { className: classes, key: "nav-item-" + index, onClick: function (e) {
                    handleClick(e, index, disabled);
                } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: "sweet-tabs " + className },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "sweet-tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: "line",
};
var TransTabs = Tabs;
TransTabs.TabItem = TabItem;
export default TransTabs;
