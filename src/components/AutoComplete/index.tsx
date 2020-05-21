import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input";
import Icon from "../Icon";
import Transition from "../Transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

//支持复杂数据类型
interface DataSource {
  value: string;
}

//支持复杂数据类型
export type DataSourceType<T = {}> = T & DataSource;

interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    keyword: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  template?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, template, ...restProps } = props;
  //input输入框的值
  const [inputVal, setInputVal] = useState(value);
  //存储全部待筛选数据
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  //异步loading
  const [loading, setLoading] = useState(false);
  //是否显示下拉框showDropdown
  const [showDropdown, setShowDropdown] = useState(false);
  //防抖处理
  const debounceValue = useDebounce(inputVal, 300);
  //下拉项高亮
  const [highlightIndex, setHighlightIndex] = useState(-1);
  //triggerSearch 现有数据选中后不再重新搜索
  const triggerSearch = useRef(false);
  //组件外区域点击收起下拉项
  const AutoCompleteRef = useRef<HTMLDivElement>(null);
  useClickOutside(AutoCompleteRef, () => {
    setSuggestions([]);
  });

  //effect处理

  useEffect(() => {
    //若inputVal值合法则筛选，否则返回空数组
    if (debounceValue && triggerSearch.current) {
      const res = fetchSuggestions(debounceValue);
      //对异步情况做处理
      setLoading(true);
      if (res instanceof Promise) {
        res.then((data) => {
          setSuggestions(data);
          setLoading(false);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(res);
        if (res.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
    //每次输入完，去掉上一次高亮的影响
    setHighlightIndex(-1);
  }, [debounceValue,fetchSuggestions]);

  // input onChange事件处理函数
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //更新input值
    const val = e.target.value.trim();
    setInputVal(val);
    //onChange允许搜索
    triggerSearch.current = true;
  };

  //下拉项选中
  const handleSelect = (item: DataSourceType) => {
    // 渲染当前值
    setInputVal(item.value);
    //清空待筛选数组
    setSuggestions([]);
    //调用外部onSelect回调
    onSelect?.(item);

    //handleSelect 不允许搜索
    triggerSearch.current = false;
    //选中后不显示下拉框
    setShowDropdown(false);
  };

  //上下键切换
  const highlight = (index: number) => {
    if (index < 0) index = 0; //上边界处理
    if (index >= suggestions.length) {
      //下边界处理
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  //键盘事件 选择下拉项
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: //enter
        suggestions[highlightIndex] &&
          handleSelect(suggestions[highlightIndex]);
        break;
      case 38: //↑
        highlight(highlightIndex - 1);
        break;
      case 40: //↓
        highlight(highlightIndex + 1);
        break;
      case 27: //Esc
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  //自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return template ? template(item) : item.value;
  };
  //渲染下拉项

  const renderDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        unmountOnExit
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="sweet-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="sweet-auto-complete" ref={AutoCompleteRef}>
      <Input
        onChange={handleChange}
        value={inputVal}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <Icon icon="spinner" spin />}
      {suggestions.length > 0 && renderDropdown()}
    </div>
  );
};

export default AutoComplete;
