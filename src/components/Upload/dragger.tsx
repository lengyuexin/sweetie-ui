import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  //控制拖拽样式
  const [dragOver, setDragOver] = useState(false);
  const cls = classNames("sweet-uploader-dragger", {
    "is-dragover": dragOver,
  });
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    //移除类样式-执行回调onFile 上传
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={cls}
      //在目标容器内拖动-添加类样式
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      //离开目标容器-移除类样式
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      //鼠标释放
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
