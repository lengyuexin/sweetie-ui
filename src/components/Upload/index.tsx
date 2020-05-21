import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
type Status = "ready" | "uploading" | "success" | "error";
interface UploadProps {
  action: string;
  // beforeUpload?: (file: File) => boolean | Promise<File>;
  beforeUpload?: (file: File) => boolean | File;
  defaultFileList?: UploadFile[];
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (data: any, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any }; //请求头
  name?: string; //前后端数据交互字段 默认file
  data?: { [key: string]: any }; //表单发送的数据
  withCredentials?: boolean; //是否允许携带跨域cookie
  accept?: string; //上传格式限制
  multiple?: boolean;
  drag?: boolean; //是否可拖拽
}

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: Status;
  percentage?: number;
  raw?: File;
  response?: any;
  error?: any;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name = "file",
    data,
    withCredentials,
    accept,
    multiple = true,
    children,
    drag = true,
  } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  //点击按钮实际点击的是input[type=file]
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const updateFileList = (
    uploadFile: UploadFile, //旧数据
    uploadObj: Partial<UploadFile> //更新任意项 新数据
  ) => {
    setFileList((preFileList) => {
      return preFileList.map((file) => {
        if (file.uid === uploadFile.uid) {
          return { ...file, ...uploadObj };
        } else {
          return file;
        }
      });
    });
  };

  //上传事件处理函数
  const uploadFiles = (files: FileList) => {
    //将文件类数组 转成纯数组
    const postFiles = Array.from(files);
    //遍历文件数组
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        //执行上传逻辑
        _post(file);
      } else {
        const res = beforeUpload(file);

        if (res instanceof File) {
          _post(res);
        } else if (res) {
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
  const _post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percentage: 0,
      raw: file,
    };

    setFileList((prevList) => {
      return [_file, ...prevList];
    });

    //创建formData表单数组对象并填充
    const formData = new FormData();
    formData.append(name, file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    //发送指定action的上传异步请求，传送数据为formData
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          //数据可监测
          if (e.lengthComputable) {
            //上传进度条--onProgress
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              //更新进度条和状态
              updateFileList(_file, {
                percentage: percentage,
                status: "uploading",
              });
              onProgress?.(percentage, _file);
            }
          }
        },
      })
      //成功回调--onSuccess
      .then((res) => {
        onSuccess?.(res.data, _file);
        updateFileList(_file, {
          response: res.data,
          status: "success",
        });
        onChange?.(_file);
      })
      //失败回调--onError
      .catch((err) => {
        updateFileList(_file, {
          error: err,
          status: "error",
        });
        onError?.(err, _file);
        onChange?.(_file);
      });
  };

  //文件域发生变化，事件处理函数
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //获取所有文件 单或多
    const files = e.target.files;
    //空文件直接返回
    if (!files) return;
    //文件上传
    uploadFiles(files);
    //上传后清空input文件域
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //删除上传项
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      //过滤非点击删除项
      return prevList.filter((item) => item.uid !== file.uid);
    });

    //执行用户传入的onRemove回调
    onRemove?.(file);
  };

  return (
    <div className="sweet-upload-component">
      
      <div
        className="sweet-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}

        <input
          className="sweet-file-input"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>

  )
};

export default Upload;
