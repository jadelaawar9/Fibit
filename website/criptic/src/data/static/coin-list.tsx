import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';

export const coinList = [
  {
    icon: <Bitcoin />,
    code: 'BTC',
    name: 'Bitcoin',
    price: 19076.29,
    contract: "",
    isActive: true,
  },
  {
    icon: <Ethereum />,
    code: 'ETH',
    name: 'Ethereum',
    price: 1053.28,
    contract: "",
    isActive: true,
  },
  {
    icon: <Tether />,
    code: 'USDT',
    name: 'Tether USD',
    price: 0.999,
    contract: "0xdE4fB4fD5D65EEA0e7126a4978B2B6a7b42466aA",
    isActive: false,
  },
  {
    icon: <Bnb />,
    code: 'BNB',
    name: 'Binance Coin',
    price: 214.96,
    contract: "",
    isActive: false,
  },
  {
    icon: <Usdc />,
    code: 'USDC',
    name: 'USD Coin',
    price: 1.001,
    contract: "0x526f0A95EDC3DF4CBDB7bb37d4F7Ed451dB8e369",
    isActive: false,
  },
  {
    icon: <Cardano />,
    code: 'ADA',
    name: 'Cardano',
    price: 0.448,
    contract: "",
    isActive: false,
  },
  {
    icon: <Doge />,
    code: 'DOGE',
    name: 'Doge Coin',
    price: 0.065,
    contract: "",
    isActive: false,
  },
];
