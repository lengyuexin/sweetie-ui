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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, _a = props.name, name = _a === void 0 ? "file" : _a, data = props.data, withCredentials = props.withCredentials, accept = props.accept, _b = props.multiple, multiple = _b === void 0 ? true : _b, children = props.children, _c = props.drag, drag = _c === void 0 ? true : _c;
    var fileInputRef = useRef(null);
    var _d = useState(defaultFileList || []), fileList = _d[0], setFileList = _d[1];
    //点击按钮实际点击的是input[type=file]
    var handleClick = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var updateFileList = function (uploadFile, //旧数据
    uploadObj //更新任意项 新数据
    ) {
        setFileList(function (preFileList) {
            return preFileList.map(function (file) {
                if (file.uid === uploadFile.uid) {
                    return __assign(__assign({}, file), uploadObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    //上传事件处理函数
    var uploadFiles = function (files) {
        //将文件类数组 转成纯数组
        var postFiles = Array.from(files);
        //遍历文件数组
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                //执行上传逻辑
                _post(file);
            }
            else {
                var res = beforeUpload(file);
                if (res instanceof File) {
                    _post(res);
                }
                else if (res) {
                    _post(file);
                }
                // if (res instanceof Promise) {
                //   res.then((file) => {
                //     _post(file);
                //   });
                // } else if (res) {
                //   _post(file);
                // }
            }
        });
    };
    //_post具体上传逻辑
    var _post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percentage: 0,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        //创建formData表单数组对象并填充
        var formData = new FormData();
        formData.append(name, file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        //发送指定action的上传异步请求，传送数据为formData
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var _a;
                //数据可监测
                if (e.lengthComputable) {
                    //上传进度条--onProgress
                    var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                    if (percentage < 100) {
                        //更新进度条和状态
                        updateFileList(_file, {
                            percentage: percentage,
                            status: "uploading",
                        });
                        (_a = onProgress) === null || _a === void 0 ? void 0 : _a(percentage, _file);
                    }
                }
            },
        })
            //成功回调--onSuccess
            .then(function (res) {
            var _a, _b;
            (_a = onSuccess) === null || _a === void 0 ? void 0 : _a(res.data, _file);
            updateFileList(_file, {
                response: res.data,
                status: "success",
            });
            (_b = onChange) === null || _b === void 0 ? void 0 : _b(_file);
        })
            //失败回调--onError
            .catch(function (err) {
            var _a, _b;
            updateFileList(_file, {
                error: err,
                status: "error",
            });
            (_a = onError) === null || _a === void 0 ? void 0 : _a(err, _file);
            (_b = onChange) === null || _b === void 0 ? void 0 : _b(_file);
        });
    };
    //文件域发生变化，事件处理函数
    var handleFileChange = function (e) {
        //获取所有文件 单或多
        var files = e.target.files;
        //空文件直接返回
        if (!files)
            return;
        //文件上传
        uploadFiles(files);
        //上传后清空input文件域
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    //删除上传项
    var handleRemove = function (file) {
        var _a;
        setFileList(function (prevList) {
            //过滤非点击删除项
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        //执行用户传入的onRemove回调
        (_a = onRemove) === null || _a === void 0 ? void 0 : _a(file);
    };
    return (React.createElement("div", { className: "sweet-upload-component" },
        React.createElement("div", { className: "sweet-upload-input", style: { display: "inline-block" }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: function (files) {
                    uploadFiles(files);
                } }, children)) : (children),
            React.createElement("input", { className: "sweet-file-input", style: { display: "none" }, ref: fileInputRef, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
