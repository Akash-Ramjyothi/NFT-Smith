import "./App.css";
import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { Typography } from "antd";
import { UserOutlined, MailOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import {
  generateNFTName,
  generateNFTtokenID,
  uploadToIPFS,
} from "./utils/utils.js";

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
  // To perform HTTP requests
  //const axios = require("axios");

  // Creating instance of Form
  const [form] = Form.useForm();

  // State to track button click
  const [nftCrafted, setNftCrafted] = useState(false);

  // Format IPFS Image response
  async function formatIPFSImageHash(ipfsValue) {
    const hashStartIndex = ipfsValue.lastIndexOf("/") + 1;
    const ipfsHash = ipfsValue.substring(hashStartIndex);
    const prefix = "https://ipfs.io/ipfs/";
    const formatedIPFSImageCID = `${prefix}${ipfsHash}`;
    // console.log("Format NFT function: ", formatedIPFSImageCID);
    return formatedIPFSImageCID;
  }

  // Fetch data from BAYC IPFS for NFT Metadata
  async function fetchNftMetadataFromIPFS() {
    try {
      // Random number generator for IPFS hash suffix
      const ipfsSuffix = Math.floor(Math.random() * 9999) + 1;
      const response = await axios.get(
        `https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${ipfsSuffix}`
      );

      // Retrieve Image and Attributed from BAYC IPFS
      const fetchedMetadata = {
        image: await formatIPFSImageHash(response.data.image),
        attributes: response.data.attributes,
      };
      // console.log("Fetched data:", response.data.image);
      // console.log("Metadata Object: ", fetchedMetadata);

      // Return fetched BAYC Metadata
      return fetchedMetadata;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Callback function to be called when the form is successfully submitted
  const onFinish = async (values) => {
    //console.log("Submitted details:", values);
    const inputName = values.name;
    const inputEmailID = values.emailID;
    const inputCryptoWalletAddress = values.cryptoWalletAddress;
    console.log("Entered Name: ", inputName);
    console.log("Entered E-Mail ID: ", inputEmailID);
    console.log("Entered Crypto Wallet Address: ", inputCryptoWalletAddress);

    let fetchedBAYCMetadata = await fetchNftMetadataFromIPFS();
    // console.log("BAYC Metadata: ", fetchedBAYCMetadata);

    // generate NFT Name
    const nftName = await generateNFTName();

    // Create NFT Metadata object
    let nftMetadata = {
      image: fetchedBAYCMetadata.image,
      name: nftName,
      external_url: "",
      description: `Discover 'Ethereal Dreams', an NFT masterpiece, '${nftName}' minted with NFT-Smith, fusing art and technology in a limited-edition digital gem.`,
      attributes: fetchedBAYCMetadata.attributes,
      tokenID: await generateNFTtokenID(),
    };

    console.log("NFT Metadata: ", nftMetadata);

    await uploadToIPFS(nftMetadata);

    setNftCrafted(true); // Set the state to indicate button click
  };

  // Rendering parent Div
  return (
    <div className="App">
      <div className="white-container">
        <div className="form-wrapper">
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
              <Text className="nft-title">
                Your NFT is successfully Crafted
              </Text>
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
