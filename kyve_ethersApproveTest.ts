import { ethers } from 'ethers';

// Contracts
const approveABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

// Provider Data
const providerRPC = {
  development: {
    name: 'moonbeam-development',
    rpc: 'http://localhost:9933',
    chainId: 1281,
  },
  moonbase: {
    name: 'moonbase-alpha',
    rpc: 'https://rpc.testnet.moonbeam.network',
    chainId: 1287,
  },
};

// Define Provider
const network = 'moonbase';
const provider = new ethers.providers.StaticJsonRpcProvider(providerRPC[network].rpc, {
  chainId: providerRPC[network].chainId,
  name: providerRPC[network].name,
});

// Data (pk is of a burner account DO NOT USE IN PROD)
const pk = '0x22c1a09e3d5ce9a9b6dc2bbe7f377e2bce6857536583f68e782a9220522e54f0';
const approveAdd = '0x12Cb274aAD8251C875c0bf6872b67d9983E53fDd';
const contractAdd = '0x843C7378309DD8CD82C5013FAb63B6Ea86770433';
const apprAmount = ethers.utils.parseEther('0.1');

// Create Signer and Contract Instance
const signer = new ethers.Wallet(pk, provider);
const KyveToken = new ethers.Contract(contractAdd, approveABI, signer);

const approve = async () => {
  // Log
  console.log(`Approving ${approveAdd} for ${ethers.utils.formatEther(apprAmount)} token`);

  // Send Appr Trx
  const txReceipt = await KyveToken.approve(approveAdd, apprAmount);
  await txReceipt.wait();

  // Log
  console.log(`Tx successful with hash: ${txReceipt.hash}`);
};

approve();
