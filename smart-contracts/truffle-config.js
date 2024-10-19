require('dotenv').config();
const { MNEMONIC, RPC_NODE } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     
     ganache: {
       provider: () => new HDWalletProvider(MNEMONIC, RPC_NODE),
       network_id: 888766674,       
       confirmations: 0,    
       timeoutBlocks: 50000, 
       skipDryRun: true 
     },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.19", // 8.20 ya me lo rompe el ganache
    }
  }
};
