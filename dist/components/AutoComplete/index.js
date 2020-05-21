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
import React, { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input";
import Icon from "../Icon";
import Transition from "../Transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, template = props.template, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "template"]);
    //input输入框的值
    var _a = useState(value), inputVal = _a[0], setInputVal = _a[1];
    //存储全部待筛选数据
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    //异步loading
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    //是否显示下拉框showDropdown
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    //防抖处理
    var debounceValue = useDebounce(inputVal, 300);
    //下拉项高亮
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    //triggerSearch 现有数据选中后不再重新搜索
    var triggerSearch = useRef(false);
    //组件外区域点击收起下拉项
    var AutoCompleteRef = useRef(null);
    useClickOutside(AutoCompleteRef, function () {
        setSuggestions([]);
    });
    //effect处理
    useEffect(function () {
        //若inputVal值合法则筛选，否则返回空数组
        if (debounceValue && triggerSearch.current) {
            var res = fetchSuggestions(debounceValue);
            //对异步情况做处理
            setLoading(true);
            if (res instanceof Promise) {
                res.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(res);
                if (res.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setSuggestions([]);
            setShowDropdown(false);
        }
        //每次输入完，去掉上一次高亮的影响
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    // input onChange事件处理函数
    var handleChange = function (e) {
        //更新input值
        var val = e.target.value.trim();
        setInputVal(val);
        //onChange允许搜索
        triggerSearch.current = true;
    };
    //下拉项选中
    var handleSelect = function (item) {
        var _a;
        // 渲染当前值
        setInputVal(item.value);
        //清空待筛选数组
        setSuggestions([]);
        //调用外部onSelect回调
        (_a = onSelect) === null || _a === void 0 ? void 0 : _a(item);
        //handleSelect 不允许搜索
        triggerSearch.current = false;
        //选中后不显示下拉框
        setShowDropdown(false);
    };
    //上下键切换
    var highlight = function (index) {
        if (index < 0)
            index = 0; //上边界处理
        if (index >= suggestions.length) {
            //下边界处理
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    //键盘事件 选择下拉项
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: //enter
                suggestions[highlightIndex] &&
                    handleSelect(suggestions[highlightIndex]);
                break;
            case 38: //↑
                highlight(highlightIndex - 1);
                break;
            case 40: //↓
                highlight(highlightIndex + 1);
                break;
            case 27: //Esc
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    //自定义模板
    var renderTemplate = function (item) {
        return template ? template(item) : item.value;
    };
    //渲染下拉项
    var renderDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, unmountOnExit: true, onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: "sweet-suggestion-list" },
                loading && (React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true }))),
                suggestions.map(function (item, index) {
                    var cnames = classNames("suggestion-item", {
                        "is-active": index === highlightIndex,
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "sweet-auto-complete", ref: AutoCompleteRef },
        React.createElement(Input, __assign({ onChange: handleChange, value: inputVal, onKeyDown: handleKeyDown }, restProps)),
        loading && React.createElement(Icon, { icon: "spinner", spin: true }),
        suggestions.length > 0 && renderDropdown()));
};
export default AutoComplete;
