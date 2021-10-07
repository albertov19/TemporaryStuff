import Web3 from 'web3';

// Contracts
const approveABI: any = [
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
// Provider
const providerRPC = {
  moonbase: 'https://rpc.testnet.moonbeam.network',
};
// Define Provider
const network = 'moonbase';
const web3 = new Web3(providerRPC[network]);

// Data (pk is of a burner account DO NOT USE IN PROD)
const pk = '0x22c1a09e3d5ce9a9b6dc2bbe7f377e2bce6857536583f68e782a9220522e54f0';
const addr = '0x4a0cC6464a539Fb66230645717cb6263DF596B2c';
const approveAdd = '0x12Cb274aAD8251C875c0bf6872b67d9983E53fDd';
const contractAdd = '0x843C7378309DD8CD82C5013FAb63B6Ea86770433';
const apprAmount = web3.utils.toWei('1', 'ether');

// Create Signer and Contract Instance
const KyveToken = new web3.eth.Contract(approveABI, contractAdd);

// Build Appr Tx
const apprTx = KyveToken.methods.approve(approveAdd, apprAmount);

const approve = async () => {
  // Log
  console.log(`Approving ${approveAdd} for ${web3.utils.fromWei(apprAmount, 'ether')} token`);

  // Sign Appr Tx with PK
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAdd,
      data: apprTx.encodeABI(),
      gas: await apprTx.estimateGas({ from: addr }),
    },
    pk
  );

  // Send Tx and Wait for Receipt
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // Log
  console.log(`Tx successful with hash: ${txReceipt.transactionHash}`);
};

approve();
