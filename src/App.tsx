import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button";
import Icon from "./components/Icon";

import "./styles/index.scss";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Transition from "./components/Transition";
import Alert from "./components/Alert";
import Tabs from "./components/Tabs";
import TabItem from "./components/Tabs/tabItem";
import Input from "./components/Input";
import AutoComplete, { DataSourceType } from "./components/AutoComplete";

import Upload,{UploadFile} from "./components/Upload";

import axios from "axios";

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");

  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .post("http://jsonplaceholder.typicode.com/posts", {
        title: "hello",
        body: "test body",
      })
      .then((res) => {
        setTitle(res.data.title);
      });
  }, [title]);

  const list = [
    { name: "1", value: "11" },
    { name: "2", value: "1122" },
    { name: "3", value: "112233" },
    { name: "4", value: "11223344" },
  ];

  const defaultFileList:UploadFile[] = [
    { size: 1024, status: "uploading", name: "a.jpg", uid: "11",'percentage':30 },
    { size: 1025, status: "success", name: "b.jpg", uid: "1122" },
    { size: 1026, status: "error", name: "c.jpg", uid: "112233" },
  ];

  const list2 = ["11", "1122", "2233", "2564"];

  interface LProps {
    name: string;
    value: string;
  }
  const handleFetch = (keyword: string) => {
    return list.filter((item) => item.value.includes(keyword));
  };

  const handleBeforeBoolean = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert("file is too big");
      return false;
    }
    return true;
  };

  const handleBeforePromise = (file: File) => {
    const newFile = new File([file], "new_name.png", { type: file.type });
    //  return Promise.resolve(newFile)
    return newFile;
  };

  const handleFetch2 = (keyword: string) => {
    return list2
      .filter((item) => item.includes(keyword))
      .map((item) => ({ value: item }));
  };

  const handleFetch3 = (keyword: string) => {
    return fetch("https://api.github.com/search/users?q=" + keyword)
      .then((res) => res.json())
      .then(({ items }) => {
        let sliceItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...items }));
        console.log(sliceItems);
        return sliceItems;
      });
  };

  return (
    <div>
      <div
        style={{
          padding: "20px 40px",
          width: "800px",
        }}
      >
        <h3>title:{title}</h3>
        <hr />
        <h3>Input</h3>
        <Input
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
        <hr />
        <h3>Upload</h3>
        <Upload
          // action="http://jsonplaceholder.typicode.com/posts"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          defaultFileList={defaultFileList}
          name={"fileName"}
          data={{'key':'value'}}
          headers={{"X-Powered-By":"helloHead"}}
          accept=".png"
          // beforeUpload={handleBeforePromise}
          // onSuccess={(data, file) => {
          //   console.log("onSuccess");
          // }}
          // onError={(err, file) => {
          //   console.log("onSuccess");
          //   console.error(err);
          // }}
          onProgress={(percentage, file) => {
            console.log("onProgress");
            console.log(percentage);
          }}
        />
        <h3>AutoComplete</h3>

        <AutoComplete
          onSelect={(item) => {
            console.log(item);
          }}
          fetchSuggestions={handleFetch3}
          template={(item: DataSourceType) => {
            const itemWithValue = item as DataSourceType<LProps>;
            // const itemWithName=item as DataSourceType<LProps>
            return (
              <div>
                <h2>{itemWithValue.value}</h2>
                {/* <p>{itemWithName.name}</p> */}
              </div>
            );
          }}
        />

        <h3>组件演示</h3>
        <Tabs defaultIndex={0} onSelect={function noRefCheck() {}} type="line">
          <TabItem label="选项卡一">this is content one</TabItem>
          <TabItem label="选项卡二">this is content two</TabItem>
          <TabItem label="用户管理">this is content three</TabItem>
        </Tabs>
      </div>
      <div
        style={{
          padding: "20px 40px",
          width: "500px",
        }}
      >
        <h3>组件演示</h3>
        <Tabs defaultIndex={0} onSelect={function noRefCheck() {}} type="card">
          <TabItem label="card1">this is card one</TabItem>
          <TabItem label="card2">this is content two</TabItem>
          <TabItem disabled label="disabled">
            this is content three
          </TabItem>
        </Tabs>
      </div>
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        default btn
      </Button>
      <Button
        btnType="primary"
        size="lg"
        onClick={() => {
          alert(1);
        }}
      >
        primary btn
      </Button>
      <Button
        disabled
        onClick={() => {
          alert(1);
        }}
      >
        disabled btn
      </Button>
      <Button btnType="link" target="_black" href="https://www.baidu.com">
        link btn
      </Button>
      <Button
        disabled
        btnType="link"
        target="_black"
        href="https://www.baidu.com"
      >
        disabled link btn
      </Button>

      <Icon icon="coffee" theme="dark" />

      <Transition in={show} timeout={300} animation="zoom-in-left">
        <div>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </div>
      </Transition>

      <Transition isOnly in={show} timeout={300} animation="zoom-in-left">
        <Button>default btn</Button>
      </Transition>

      <Alert title="info">hello</Alert>
      <Alert type="danger" title="info" content="I am admin">
        hello
      </Alert>
      <Alert type="success" title="info" content="I am admin">
        hello
      </Alert>
      <Alert type="warning" title="info" content="I am admin">
        hello
      </Alert>

      <Menu
        onSelect={(index) => {
          alert(index);
        }}
      >
        {/* <MenuItem itemIndex="0">list-00</MenuItem> */}
        <MenuItem>list-01</MenuItem>
        <MenuItem>list-02</MenuItem>
        <MenuItem>list-03</MenuItem>
        <SubMenu title={"下拉选项"}>
          <MenuItem>下拉选项一</MenuItem>
          <MenuItem>下拉选项二</MenuItem>
          <MenuItem>下拉选项三</MenuItem>
        </SubMenu>
      </Menu>
      {
        <Menu
          mode="vertical"
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>list-03</MenuItem>
          <MenuItem>list-03</MenuItem>
          <MenuItem>list-03</MenuItem>
          <SubMenu title={"下拉选项"}>
            <MenuItem>下拉选项一</MenuItem>
            <MenuItem>下拉选项二</MenuItem>
          </SubMenu>
          <SubMenu title={"下拉选项"}>
            <MenuItem>下拉选项一</MenuItem>
            <MenuItem>下拉选项二</MenuItem>
          </SubMenu>
          <SubMenu title={"下拉选项"}>
            <MenuItem>下拉选项一</MenuItem>
            <MenuItem>下拉选项二</MenuItem>
          </SubMenu>
        </Menu>
      }
      {/* 
     <Button size="lg" btnType="primary" onClick={()=>setShow(!show)}>toggle</Button>

     <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
  
       <Button size="lg" btnType="primary" onClick={()=>setShow(!show)}>toggle</Button>
       
     </Transition> */}
    </div>
  );
}

render(<App />, document.getElementById("root"));
