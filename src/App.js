import "./App.css";
import React from "react";
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
  // Creatingg instance of Form
  const [form] = Form.useForm();

  // Callback function to be called when the form is successfully submitted
  const onFinish = (values) => {
    //console.log("Submitted details:", values);
    console.log("Entered Name: ", values.name);
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
              name="name"
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
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                placeholder="Please Enter Name"
                style={{ fontSize: "18px", width: "400px" }}
              />
            </Form.Item>
            <Form.Item
              name="emailID"
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
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                placeholder="Please Enter E-Mail ID"
                style={{ fontSize: "18px", width: "400px" }}
              />
            </Form.Item>
            <Form.Item
              name="cryptoWalletAddress"
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
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                placeholder="Please Enter Crypto Wallet Address"
                style={{ fontSize: "18px", width: "400px" }}
              />
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
    </div>
  );
}

export default App;
