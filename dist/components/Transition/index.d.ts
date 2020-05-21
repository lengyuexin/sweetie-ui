import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
/**
 * display:none时transform冲突，导致局部动画效果消失
 * -解决途径一:调整display:none位置在transform后
 * -解决途径二:忽略占位情况使用visibility替代display
 * -解决途径三：unmountOnExit: true，让CSSTransition控制节点的挂载和卸载
 */
/**
 * 被Transition包裹的唯一children若含有transform属性，会出现覆盖
 * 根本原因是CSSTransition组件classNames内置动画效果使用了transform属性
 * 解决途径一:若存在唯一children，手动添加isOnly标识，将transform添加在父节点上
 * 解决途径二:若存在唯一children，直接在其外层添加一个div作为父节点包裹
 */
declare type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-bottom" | "zoom-in-right";
/**
 * - classNames属性用于自定义动画
 * - animation属性用于内置动画
 * - classNames优先animation生效
 */
declare type TransitionProps = CSSTransitionProps & {
    classNames?: string;
    animation?: AnimationName;
    isOnly?: boolean;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
