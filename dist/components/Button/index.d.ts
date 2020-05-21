import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
declare type ButtonSize = "lg" | "sm";
declare type ButtonType = "primary" | "default" | "danger" | "link";
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
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: FC<ButtonProps>;
export default Button;
