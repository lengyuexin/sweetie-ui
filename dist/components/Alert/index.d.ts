import React, { FC } from "react";
export declare type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
    /**标题 */
    title: string;
    /**内容 */
    content?: string;
    /**类型 四种可选 针对四种不同的场景 */
    type?: AlertType;
    /**关闭alert时触发的事件 不受delay影响 */
    onClose?: () => void;
    /**设置提示框类名 */
    className?: string;
    /**设置提示框样式 ,默认宽度400px*/
    style?: React.CSSProperties;
    /**设置提示框消失延迟时间 默认0  */
    delay?: number;
}
export declare const Alert: FC<AlertProps>;
export default Alert;
