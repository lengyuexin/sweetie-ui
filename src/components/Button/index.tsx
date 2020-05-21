import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonSize = "lg" | "sm";
type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  /**设置按钮尺寸 */
  size?: ButtonSize;
  /**设置按钮类型 */
  btnType?: ButtonType;
  /**设置按钮类名 */
  className?: string;
  /**设置按钮是否禁用 */
  disabled?: boolean;
  /**按钮类型为链接时设置链接地址 */
  href?: string;
  /**设置children */
  children?: React.ReactNode;
}

/**
 * 设置交叉类型，获取原生button标签和原生a标签的属性
 * 某些button属性a没有，反之亦然，需用Partial将所有属性设为可选
 */

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonProps> = (props) => {
  const {
    size,
    btnType,
    className,
    disabled,
    href,
    children,
    ...restProps
  } = props;

  /**
   * - 添加类名
   */

  const classes = classNames("sweet-btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled,
  });

  /**
   * - 渲染节点
   * - btnType为link则渲染a标签
   * - btnType不为link则渲染button标签
   */

  if (href && btnType === "link") {

  
  
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={classes} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
