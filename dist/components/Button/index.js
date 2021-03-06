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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
var Button = function (props) {
    var _a;
    var size = props.size, btnType = props.btnType, className = props.className, disabled = props.disabled, href = props.href, children = props.children, restProps = __rest(props, ["size", "btnType", "className", "disabled", "href", "children"]);
    /**
     * - 添加类名
     */
    var classes = classNames("sweet-btn", className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        _a.disabled = disabled,
        _a));
    /**
     * - 渲染节点
     * - btnType为link则渲染a标签
     * - btnType不为link则渲染button标签
     */
    if (href && btnType === "link") {
        return (React.createElement("a", __assign({ href: href, className: classes }, restProps), children));
    }
    return (React.createElement("button", __assign({ disabled: disabled, className: classes }, restProps), children));
};
Button.defaultProps = {
    disabled: false,
    btnType: "default",
};
export default Button;
