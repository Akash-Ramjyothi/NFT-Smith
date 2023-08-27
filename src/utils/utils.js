import axios from "axios";

// Using UUID to ggenerate NFT Token ID
const { v4: uuidv4 } = require("uuid");

// Dataset for first word of NFT
const firstWords = [
  "Ape",
  "Primal",
  "Jungle",
  "Mighty",
  "Bongo",
  "Kong",
  "Gorilla",
  "Bamboo",
  "Vine",
  "Ape",
  "Wild",
  "Savage",
  "Tropical",
  "Ruler",
  "Forest",
  "Leafy",
  "Mountain",
  "Majestic",
  "Ancient",
  "Golden",
];

// Dataset for second word of NFT
const secondWords = [
  "Essence",
  "Simian",
  "Majesty",
  "Titan",
  "Guardian",
  "Sovereign",
  "Monarch",
  "Kingpin",
  "Kong",
  "Sovereign",
  "Champion",
  "Warrior",
  "Explorer",
  "Keeper",
  "Emperor",
  "Legend",
  "Sage",
  "Warden",
  "Prophet",
  "Conqueror",
];

// Pinata API Keys
const apiKey = "2ab01bd6f0bceb3fa783";
const apiSecret =
  "0e28bdca88c2d61df7d311552f96df1cde9990ba09ae7bd6dc2b8f8ea30cb8ca";

// Function to generate Random NFT Name
export async function generateNFTName() {
  const randomFirstIndex = Math.floor(Math.random() * firstWords.length);
  const randomSecondIndex = Math.floor(Math.random() * secondWords.length);

  const firstWord = firstWords[randomFirstIndex];
  const secondWord = secondWords[randomSecondIndex];

  return `${firstWord} ${secondWord}`;
}

// Function to generate NFT Token ID
export async function generateNFTtokenID() {
  // Generate a random UUID (version 4)
  const uuid = uuidv4();

  // Extract the last 4 characters of the UUID
  const lastFourChars = uuid.slice(-4);

  // Convert hexadecimal to decimal and limit to 4 digits
  const decimalNumber = parseInt(lastFourChars, 16) % 10000;

  // Storing required value in a variable
  const nftTokenID = decimalNumber.toString().padStart(4, "0");

  // Return NFT Token ID
  return nftTokenID;
}

// Function to upload NFT Metadata object into IPFS with Pinata
export async function uploadToIPFS(objectToUpload) {
  try {
    const jsonContent = JSON.stringify(objectToUpload);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      jsonContent,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: apiKey,
          pinata_secret_api_key: apiSecret,
        },
      }
    );

    console.log("IPFS CID:", response.data.IpfsHash);
  } catch (error) {
    console.error("Error uploading to IPFS:", error.message);
  }
}
