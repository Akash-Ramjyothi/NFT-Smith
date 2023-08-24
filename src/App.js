import "./App.css";
import React from "react";
import { Image } from "antd";
import { Space, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

function App() {
  return (
    <div className="App">
      <div className="white-container"></div>
      <div className="black-container">
        <Image width={529} height={459} src="./Exportable Logo_4x.png" />

        <Image width={20} height={20} src="./GitHubLogo.svg" />
        <Link underline href="https://github.com/Akash-Ramjyothi/NFT-Smith" target="_blank">
          Source Code
        </Link>
      </div>
    </div>
  );
}

export default App;
