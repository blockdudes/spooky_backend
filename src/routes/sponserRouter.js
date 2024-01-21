const express = require('express');
const ethers = require('ethers');
const router = express.Router();
const { GHO_ABI } = require('../abi/gho_token_abi');

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/JNgaZvSjgBZOpigPGkLeXEBlYf820_pA');

const sponser_pvt_key = '58b0b8ee887bfd9ce2db2d4c5fb878f8d1ea0a4b4705d8b8e1883e0ab9306327'
const sponser_address = '0x7962eBE98550d53A3608f9caADaCe72ef30De68C'

const ghoToken = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";

const sponser = new ethers.Wallet(sponser_pvt_key, provider);
const ghoContract = new ethers.Contract(ghoToken, GHO_ABI, sponser);

router.post('/sponserGas', async(req, res) => {
  try {

    console.log("first")

    const { signerAddress, amountWei, deadline, v, r, s , gasPrice, to } = req.body;
    
    // Permit the sponser to spend tokens on behalf of the signer
        const permit = await ghoContract.connect(sponser).permit(
            signerAddress,
            sponser_address,
            amountWei,
            deadline,
            v,
            r,
            s, {
            gasPrice: gasPrice,
            gasLimit: 80000 //hardcoded gas limit; change if needed
        }
        );

        console.log(permit)
        await permit.wait(2)

        console.log("permit given to",sponser_address,"to pay gas fees of our token transfer")
        const transaction = {
            to: ghoContract.address,
            data: ghoContract.interface.encodeFunctionData('transferFrom', [signerAddress, to, amountWei]),
            gasLimit: 80000,
            gasPrice
        };
        console.log("enter")

        const tx = await sponser.sendTransaction(transaction);
        const receipt = await tx.wait(1);
        console.log(`Transaction executed with hash: ${receipt.transactionHash}`);
        
        return receipt;

  } catch (error) {
    console.log(error)
    return error;
  }
});

module.exports = router;
