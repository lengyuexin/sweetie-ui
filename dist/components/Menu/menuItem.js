import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./index";
var MenuItem = function (props) {
    var context = useContext(MenuContext);
    var itemIndex = props.itemIndex, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var classes = classNames("menu-item", className, {
        disabled: disabled,
        active: context.index === itemIndex,
    });
    var handleSelect = function () {
        if (!disabled && context.onSelet && itemIndex) {
            context.onSelet(itemIndex);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleSelect }, children));
};
MenuItem.defaultProps = {
    disabled: false,
    itemIndex: "0",
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
