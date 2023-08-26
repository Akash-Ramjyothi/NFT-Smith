import "./App.css";
import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { Typography } from "antd";
import { UserOutlined, MailOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";

const { Text, Link } = Typography;

// Submit Button for Form
const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      icon={<Image width={20} src="./hammer_svg.svg" />}
      className="craft-nft-button"
    >
      Craft NFT
    </Button>
  );
};

function App() {
  // Creating instance of Form
  const [form] = Form.useForm();

  const [nftCrafted, setNftCrafted] = useState(false); // State to track button click

  // Callback function to be called when the form is successfully submitted
  const onFinish = (values) => {
    //console.log("Submitted details:", values);
    const inputName = values.name;
    const inputEmailID = values.emailID;
    const inputCryptoWalletAddress = values.cryptoWalletAddress;
    console.log("Entered Name: ", inputName);
    console.log("Entered E-Mail ID: ", inputEmailID);
    console.log("Entered Crypto Wallet Address: ", inputCryptoWalletAddress);

    setNftCrafted(true); // Set the state to indicate button click
  };

  // Rendering parent Div
  return (
    <div className="App">
      <div className="white-container">
        <div class="form-wrapper">
          <Text className="form-title">Enter details to Mint your NFT !</Text>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            className="form-container"
            onFinish={onFinish} // Set the onFinish callback
          >
            <Form.Item
              label={
                <span
                  style={{
                    color: "#3D1766D9",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Name{" "}
                  <UserOutlined
                    style={{
                      marginLeft: "2px",
                      width: "20px",
                      color: "#3D1766D9",
                    }}
                  />
                </span>
              }
            >
              <Form.Item
                name="name"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Name required to Mint NFT",
                  },
                ]}
              >
                <Input
                  placeholder="Please Enter Name"
                  style={{ fontSize: "18px", width: "400px" }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label={
                <span
                  style={{
                    color: "#3D1766D9",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  E-Mail ID{" "}
                  <MailOutlined
                    style={{
                      marginLeft: "2px",
                      width: "20px",
                      color: "#3D1766D9",
                    }}
                  />
                </span>
              }
            >
              <Form.Item
                name="emailID"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "E-Mail ID required to Mint NFT",
                  },
                ]}
              >
                <Input
                  placeholder="Please Enter E-Mail ID"
                  style={{ fontSize: "18px", width: "400px" }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label={
                <span
                  style={{
                    color: "#3D1766D9",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Crypto Wallet Address{" "}
                  <WalletOutlined
                    style={{
                      marginLeft: "2px",
                      width: "20px",
                      color: "#3D1766D9",
                    }}
                  />
                </span>
              }
            >
              <Form.Item
                name="cryptoWalletAddress"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Crypto Wallet Address required to Mint NFT",
                  },
                ]}
              >
                <Input
                  placeholder="Please Enter Crypto Wallet Address"
                  style={{ fontSize: "18px", width: "400px" }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Space>
                <SubmitButton form={form} />
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="black-container">
        {/* <div class="premint-container">
          <div className="black-items-wrapper">
            <Image width={529} height={459} src="./Exportable Logo_4x.png" />
          </div>
          <div className="hyperlink-wrapper">
            <Image width={20} height={20} src="./GitHubLogo.svg" />
            <div className="paddingRight-10" />
            <Link
              underline
              href="https://github.com/Akash-Ramjyothi/NFT-Smith"
              target="_blank"
            >
              Source Code
            </Link>
          </div>
        </div>
        <div className="nft-container">This is a Text</div> */}
        <div className={nftCrafted ? "nft-container" : "premint-container"}>
          {/* Conditional rendering based on the state */}
          {nftCrafted ? (
            <div className="nft-items-wrapper">
              {/* Contents of the "nft-container" */}
              {/* Replace this with your actual content */}
              This is the NFT container content.
            </div>
          ) : (
            <div className="premint-items-wrapper">
              <div className="black-items-wrapper">
                <Image
                  width={529}
                  height={459}
                  src="./Exportable Logo_4x.png"
                />
              </div>
              <div className="hyperlink-wrapper">
                <Image width={20} height={20} src="./GitHubLogo.svg" />
                <div className="paddingRight-10" />
                <Link
                  underline
                  href="https://github.com/Akash-Ramjyothi/NFT-Smith"
                  target="_blank"
                >
                  Source Code
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
