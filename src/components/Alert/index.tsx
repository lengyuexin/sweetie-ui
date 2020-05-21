import React, { FC, useState, useRef } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";
export type AlertType = "success" | "default" | "danger" | "warning";

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

export const Alert: FC<AlertProps> = (props) => {
  const [show, setShow] = useState(true);
  const { title, content, type, onClose, className, style, delay } = props;
  const classes = classNames("sweet-alert", className, {
    [`sweet-alert-${type}`]: type,
  });
  const titleClass = classNames("sweet-alert-title", {
    "bold-title": content,
  });

  /**使用useRef保存延时器引用*/
  const timerRef = useRef<any>(null);

  const handleClose = (e: React.MouseEvent) => {
    clearTimeout(timerRef.current)
    e.preventDefault();
    onClose?.();
    timerRef.current = setTimeout(() => {
      setShow(false);
    }, delay);
  };



  return (
    <Transition in={show} timeout={300} animation="zoom-in-top">
      <div className={classes} style={style}>
        <span className={titleClass}>{title}</span>
        {content && <p className="sweet-alert-desc">{content}</p>}
        <span className="sweet-alert-close" onClick={handleClose}>
          <Icon icon="times" />
        </span>
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: "default",
  delay: 0,
  style: { width: "400px" },
};
export default Alert;
