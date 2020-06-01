const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()
const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://ropsten.infura.io/v3/${process.env.Project_Id}`),
      network_id: 3,
      gas: 3000000,
      gasPrice: 10000000000
    },
    kovan: {
      propvider: () => new HDWalletProvider(process.env.MNENOMIC, `https://kovan.infura.io/v3/${process.env.Project_Id}`),
      network_id: 42,
      gas: 3000000,
      gasPrice: 10000000000
    }
  }
};
