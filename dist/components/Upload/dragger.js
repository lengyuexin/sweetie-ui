import React, { useState } from "react";
import classNames from "classnames";
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    //控制拖拽样式
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var cls = classNames("sweet-uploader-dragger", {
        "is-dragover": dragOver,
    });
    var handleDrop = function (e) {
        e.preventDefault();
        //移除类样式-执行回调onFile 上传
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (React.createElement("div", { className: cls, 
        //在目标容器内拖动-添加类样式
        onDragOver: function (e) {
            handleDrag(e, true);
        }, 
        //离开目标容器-移除类样式
        onDragLeave: function (e) {
            handleDrag(e, false);
        }, 
        //鼠标释放
        onDrop: handleDrop }, children));
};
export default Dragger;
