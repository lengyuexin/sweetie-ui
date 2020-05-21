import React, { FC } from "react";
import { UploadFile } from "./index";
import Icon from "../Icon";
import Progress from "../Progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="sweet-upload-list">
      {fileList.map((file) => {
        return (
          <li className="sweet-upload-list-item" key={file.uid}>
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {file.name}
            </span>
            <span className="file-status">
              {(file.status === "uploading" || file.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {file.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {file.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>

            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(file);
                }}
              />
            </span>
            {/* 上传进度条显示 */}
            {file.status === "uploading" && (
              <Progress percent={file.percentage || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
