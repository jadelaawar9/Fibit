import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/_dashboard';
import Trade from '@/components/ui/trade';
import {BigNumber, ethers} from 'ethers';
import {coinList} from "../data/static/coin-list";
import { Bitcoin } from '@/components/icons/bitcoin';
import CoinSelectView from '@/components/ui/coin-select-view';
import { array } from 'yup';

const SwapPage: NextPageWithLayout = () => {
  const contractAddress = '0x02eC0e250a6e5D52235f2BA7e344b7af8Af36a58';
  const [tokenAddress, setTokenaddress] = useState<any | null>(null)
  const [provider, setProvider] = useState<any | null>(null);
  const [signer, setSigner] = useState<any | null>(null);
  const [contract, setContract] = useState<any | null>(null);

  async function Swap() {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);  

    let tempContract = new ethers.Contract(contractAddress, JSON.stringify([{
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
      ],
      "name": "createPair",
      "outputs": [
        {
          "internalType": "address",
          "name": "pair",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }, 
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "getPair",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }]), tempSigner);
    setContract(tempContract);

    // "0x57651923cD181500e906fB496b01d30dFD0356e6"
    // "0xcB64F254a55Aa78Ca3C9108dC9f89BD4Cc97CC89"
    let token1 = "0x57651923cD181500e906fB496b01d30dFD0356e6"
    let token2 = "0xcB64F254a55Aa78Ca3C9108dC9f89BD4Cc97CC89"

    /*
    for(let i = 0; i < coinList.length; i++){
      if(coinList[i].isActive = true)
      {
        token1 = coinList[i].contract;
        coinList[i].isActive = false;
      }
    }
    for(let i = 0; i < array.length; i++)
    {
      if(coinList[i].isActive = true)
      {
        token2 = coinList[i].contract
        coinList[i].isActive = false;
      }
    }
    */

    //await tempContract.createPair(token1, token2);

    let swapAddress = await tempContract.getPair(token1, token2);
    console.log(swapAddress)
    let contr = new ethers.Contract(swapAddress, JSON.stringify([{
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }]), tempSigner);
    let amount1 = BigNumber.from("10")
    let amount2 = BigNumber.from("10")
    let token1Amount = amount1.toNumber()
    let token2Amount = amount2.toNumber()
    console.log(token1Amount, token2Amount)
    contr.swap(token1Amount, token2Amount, signer.getAddress(), '');
    
  }

  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <NextSeo
        title="Farms"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div 
            className={cn(
              'relative flex gap-3',
              toggleCoin ? 'flex-col-reverse' : 'flex-col'
            )}
          >
            <CoinInput
              label={'From'}
              exchangeRate={0.0}
              defaultCoinIndex={0}
              getCoinValue={(data) => console.log('From coin value:', data)}
            />
            <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
                onClick={() => setToggleCoin(!toggleCoin)}
              >
                <SwapIcon className="h-auto w-3" />
              </Button>
            </div>
            <CoinInput
              label={'To'}
              exchangeRate={0.0}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('To coin value:', data)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px]">
          <TransactionInfo label={'Min. Received'} />
          <TransactionInfo label={'Rate'} />
          <TransactionInfo label={'Offered by'} />
          <TransactionInfo label={'Price Slippage'} value={'1%'} />
          <TransactionInfo label={'Network Fee'} />
          <TransactionInfo label={'Criptic Fee'} />
        </div>
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
          onClick={Swap}
        >
          SWAP
        </Button>
      </Trade>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SwapPage;
