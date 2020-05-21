import React, { useState, useRef } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";
export var Alert = function (props) {
    var _a;
    var _b = useState(true), show = _b[0], setShow = _b[1];
    var title = props.title, content = props.content, type = props.type, onClose = props.onClose, className = props.className, style = props.style, delay = props.delay;
    var classes = classNames("sweet-alert", className, (_a = {},
        _a["sweet-alert-" + type] = type,
        _a));
    var titleClass = classNames("sweet-alert-title", {
        "bold-title": content,
    });
    /**使用useRef保存延时器引用*/
    var timerRef = useRef(null);
    var handleClose = function (e) {
        var _a;
        clearTimeout(timerRef.current);
        e.preventDefault();
        (_a = onClose) === null || _a === void 0 ? void 0 : _a();
        timerRef.current = setTimeout(function () {
            setShow(false);
        }, delay);
    };
    return (React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-top" },
        React.createElement("div", { className: classes, style: style },
            React.createElement("span", { className: titleClass }, title),
            content && React.createElement("p", { className: "sweet-alert-desc" }, content),
            React.createElement("span", { className: "sweet-alert-close", onClick: handleClose },
                React.createElement(Icon, { icon: "times" })))));
};
Alert.defaultProps = {
    type: "default",
    delay: 0,
    style: { width: "400px" },
};
export default Alert;
