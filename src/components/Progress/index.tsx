import React, { FC } from "react";
import { ThemeProps } from "../Icon";
export interface ProgressProps {
  percent: number; //进度条百分比
  strokeHeight?: number; //进度条高度
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="sweet-progress-bar" style={styles}>
      <div
        className="sweet-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`sweet-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
