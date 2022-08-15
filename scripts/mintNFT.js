require("dotenv").config();
const API_URL = "https://eth-goerli.g.alchemy.com/v2/DVeWodd_Pg69LpMzkpo3pZrX81I50tJc";
const CONTRACT_ADDRESS = "0xedC0F71bA3809E7C5eb1432f2783902a68900D3B";

const PUBLIC_KEY = "0x1C0256Cf522149C56EA2e9CaB5604E09A0F11790";

const PRIVATE_KEY = "766843c87c33cdc86b67b28398653f4fe33635e1f6a203475791612d4127d50c";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(API_URL);

const contracts = require("../artifacts/contracts/zkNFT.sol/zkNFT.json");

const nftContract = new web3.eth.Contract(contracts.abi, CONTRACT_ADDRESS);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    gas: 700000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/Qmed4GLYiZM1UAdTzwedjfKPs1FRoGdPvyaTVsGYguwenn"
);
