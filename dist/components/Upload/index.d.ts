import { FC } from "react";
declare type Status = "ready" | "uploading" | "success" | "error";
interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | File;
    defaultFileList?: UploadFile[];
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (data: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
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
declare const Upload: FC<UploadProps>;
export default Upload;
