import { exec } from 'child_process';
import { BigNumber, providers } from 'ethers';
import { ethers, network, artifacts } from 'hardhat';
import { Greeter } from '../typechain/Greeter';
import { getMyProvider, getOwnerPrivateKey } from '../.privatekey';

let main = async () => {
  console.log('network:', network.name, (await ethers.provider.getNetwork()).chainId);
  let user;
  let owner = new ethers.Wallet(await getOwnerPrivateKey(network.name), ethers.provider);
  [, user] = await ethers.getSigners();

  let oldBalance = await owner.getBalance();
  console.log('deploy account:', owner.address, ethers.utils.formatEther(oldBalance).toString());

  let gasprice = (await owner.getGasPrice()).add(1);
  let gasLimit = (await ethers.provider.getBlock('latest')).gasLimit.div(2);
  let blockNumber = await ethers.provider.getBlockNumber();
  console.log('gasPrice:', blockNumber, gasprice.toString(), ethers.utils.formatEther(gasprice));
  console.log('gasLimit:', blockNumber, gasLimit.toString(), ethers.utils.formatEther(gasLimit));
  let feeData = await ethers.provider.getFeeData();
  console.log(
    'deploy feeData:',
    feeData.gasPrice.toString(),
    feeData.maxFeePerGas.toString(),
    feeData.maxPriorityFeePerGas.toString(),
  );

  let GreeterFactory = await ethers.getContractFactory('Greeter');
  gasLimit = await ethers.provider.estimateGas(GreeterFactory.getDeployTransaction());
  console.log('deploy Greeter ready:', GreeterFactory.bytecode.length, gasLimit.toString());
  let instanceGreeter: Greeter;
  instanceGreeter = (await GreeterFactory.connect(owner).deploy({
    maxFeePerGas: feeData.gasPrice,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    gasLimit: gasLimit.mul(2),
  })) as Greeter;
  console.log(
    'new Greeter address:',
    instanceGreeter.address,
    ethers.utils.formatEther(oldBalance.sub(await owner.getBalance())),
  );
};

main();
