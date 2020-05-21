import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
/**
 * - 引入第三方字体图标库FontAwesomeIcon
 * - 继承FontAwesomeIconProps属性，扩展自定义主题和类名
 * - 图标库地址https://fontawesome.com/icons?d=gallery&m=free
 */
export declare type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
    className?: string;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
