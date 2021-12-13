import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

import './tasks/accounts';
import './tasks/deploy';

import { resolve } from 'path';

import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import { NetworkUserConfig } from 'hardhat/types';

import { task } from 'hardhat/config';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.info('account:', account.address);
  }
});

dotenvConfig({ path: resolve(__dirname, './.env') });

const chainIds = {
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file');
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
  throw new Error('Please set your INFURA_API_KEY in a .env file');
}

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = 'https://' + network + '.infura.io/v3/' + infuraApiKey;
  return {
    accounts: {
      count: 10,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
  };
}

// const config: HardhatUserConfig = {
export default {
  default: 'hardhat',
  defaultNetwork: 'hardhat',
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : true,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      chainId: chainIds.hardhat,
    },
    goerli: getChainConfig('goerli'),
    kovan: getChainConfig('kovan'),
    rinkeby: getChainConfig('rinkeby'),
    ropsten: getChainConfig('ropsten'),
    mainnet: {
      commit_url: 'http://10.0.0.89:18545',
      commit_ws: 'ws://10.0.0.89:18546',
      url: 'http://10.0.0.89:18545',
      ws: 'ws://10.0.0.51:31004',
      slavers: [
        'ws://10.0.0.51:31004',
        'ws://10.0.0.89:30004',
        'ws://10.0.0.89:18546',
        'wss://mainnet.infura.io/ws/v3/' + infuraApiKey,
      ],
      accounts: {
        mnemonic,
      },
      chainId: 1,
    },
    bsctestnet: {
      //url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      //url: "https://data-seed-prebsc-2-s1.binance.org:8545",
      url: 'https://data-seed-prebsc-2-s3.binance.org:8545',
      gasPrice: 20000000000,
      rpcUr: 'https://data-seed-prebsc-2-s3.binance.org:8545',
      blockUrl: 'https://testnet.bscscan.com/',
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic,
      },
      chainId: 97,
    },
    bsc: {
      url: 'https://dataseed1.binance.org/',
      blockUrl: 'https://bscscan.com/',
      gasPrice: 20000000000,
      accounts: {
        mnemonic,
      },
      chainId: 56,
    },
    ganache: {
      url: 'http://127.0.0.1:7545',
      ws: 'ws://127.0.0.1:7546',
      allowUnlimitedContractSize: true,
      chainId: 1337,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      ws: 'ws://127.0.0.1:8546',
      allowUnlimitedContractSize: true,
      chainId: chainIds.hardhat,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './build/cache',
    artifacts: './build/artifacts',
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/solidity-template/issues/31
            bytecodeHash: 'none',
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: '0.8.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
      {
        version: '0.8.3',
      },
      {
        version: '0.5.5',
      },
      {
        version: '0.6.7',
        settings: {},
      },
      {
        version: '0.7.4',
      },
      {
        version: '0.8.4',
      },
      {
        version: '0.4.23',
      },
    ],
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '<api-key>',
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT || 'hardcatstudy',
    username: process.env.TENDERLY_USERNAME || 'fatter',
  },
};

// export default config;
