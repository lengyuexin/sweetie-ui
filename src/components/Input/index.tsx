import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";


export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: "lg" | "sm";
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?:(e:ChangeEvent<HTMLInputElement>) => void;
}

/**
 * - 根据props相关属性设置类名，控制样式
 * - 条件渲染子节点(前后缀，图标)
 */
export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props;
  const cnames = classNames("sweet-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  /**react不推荐非受控转为受控，需对初始值进行处理，若为null或undefined 则置空 */
  const fixControlledValue = (value: any) => {
    return value == null ? "" : value;
  };
  /**value和defaultValue不可共存，同时设置value生效 */
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }


  return (
    <div className={cnames} style={style}>
      {prepend && <div className="sweet-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="sweet-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="sweet-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
