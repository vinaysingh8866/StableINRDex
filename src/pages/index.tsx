import type { NextPage } from 'next'
import { ethers, providers, Signer } from "ethers";
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  let _provider = new providers.JsonRpcProvider("https://kovan.infura.io/v3/245cec32609940d58feb298620576264")
  let _signer = _provider.getSigner()
  const [localProvider, setProvider] = useState(_provider)
  const [walletSigner, setSigner] = useState(_signer)
  const [token1, setToken1Val] = useState("0.0")
  const [token2, setToken2Val] = useState("0.0")

  const [swapEth, setSwapEth] = useState(true)
  const abi = '[  {   "inputs": [],   "stateMutability": "nonpayable",   "type": "constructor"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "address",     "name": "owner",     "type": "address"    },    {     "indexed": true,     "internalType": "address",     "name": "spender",     "type": "address"    },    {     "indexed": false,     "internalType": "uint256",     "name": "value",     "type": "uint256"    }   ],   "name": "Approval",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "bytes32",     "name": "id",     "type": "bytes32"    }   ],   "name": "ChainlinkCancelled",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "bytes32",     "name": "id",     "type": "bytes32"    }   ],   "name": "ChainlinkFulfilled",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "bytes32",     "name": "id",     "type": "bytes32"    }   ],   "name": "ChainlinkRequested",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": false,     "internalType": "address",     "name": "reciever",     "type": "address"    },    {     "indexed": false,     "internalType": "uint256",     "name": "amount",     "type": "uint256"    }   ],   "name": "MintINR",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "address",     "name": "from",     "type": "address"    },    {     "indexed": true,     "internalType": "address",     "name": "to",     "type": "address"    }   ],   "name": "OwnershipTransferRequested",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "address",     "name": "from",     "type": "address"    },    {     "indexed": true,     "internalType": "address",     "name": "to",     "type": "address"    }   ],   "name": "OwnershipTransferred",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "bytes32",     "name": "requestId",     "type": "bytes32"    },    {     "indexed": false,     "internalType": "uint256",     "name": "price",     "type": "uint256"    }   ],   "name": "RequestPrice",   "type": "event"  },  {   "anonymous": false,   "inputs": [    {     "indexed": true,     "internalType": "address",     "name": "from",     "type": "address"    },    {     "indexed": true,     "internalType": "address",     "name": "to",     "type": "address"    },    {     "indexed": false,     "internalType": "uint256",     "name": "value",     "type": "uint256"    }   ],   "name": "Transfer",   "type": "event"  },  {   "inputs": [],   "name": "acceptOwnership",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "owner",     "type": "address"    },    {     "internalType": "address",     "name": "spender",     "type": "address"    }   ],   "name": "allowance",   "outputs": [    {     "internalType": "uint256",     "name": "",     "type": "uint256"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [],   "name": "amount",   "outputs": [    {     "internalType": "uint256",     "name": "",     "type": "uint256"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "spender",     "type": "address"    },    {     "internalType": "uint256",     "name": "amount",     "type": "uint256"    }   ],   "name": "approve",   "outputs": [    {     "internalType": "bool",     "name": "",     "type": "bool"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "account",     "type": "address"    }   ],   "name": "balanceOf",   "outputs": [    {     "internalType": "uint256",     "name": "",     "type": "uint256"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [    {     "internalType": "uint256",     "name": "_amount",     "type": "uint256"    }   ],   "name": "convertToEth",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [],   "name": "decimals",   "outputs": [    {     "internalType": "uint8",     "name": "",     "type": "uint8"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "spender",     "type": "address"    },    {     "internalType": "uint256",     "name": "subtractedValue",     "type": "uint256"    }   ],   "name": "decreaseAllowance",   "outputs": [    {     "internalType": "bool",     "name": "",     "type": "bool"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [],   "name": "destroy",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "bytes32",     "name": "_requestId",     "type": "bytes32"    },    {     "internalType": "uint256",     "name": "_price",     "type": "uint256"    }   ],   "name": "fulfillBurn",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "bytes32",     "name": "_requestId",     "type": "bytes32"    },    {     "internalType": "uint256",     "name": "_price",     "type": "uint256"    }   ],   "name": "fulfillMint",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "spender",     "type": "address"    },    {     "internalType": "uint256",     "name": "addedValue",     "type": "uint256"    }   ],   "name": "increaseAllowance",   "outputs": [    {     "internalType": "bool",     "name": "",     "type": "bool"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "uint256",     "name": "_amount",     "type": "uint256"    }   ],   "name": "mintRupee",   "outputs": [],   "stateMutability": "payable",   "type": "function"  },  {   "inputs": [],   "name": "name",   "outputs": [    {     "internalType": "string",     "name": "",     "type": "string"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [],   "name": "owner",   "outputs": [    {     "internalType": "address",     "name": "",     "type": "address"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [],   "name": "price",   "outputs": [    {     "internalType": "uint256",     "name": "",     "type": "uint256"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [],   "name": "requestPriceDataBurn",   "outputs": [    {     "internalType": "bytes32",     "name": "requestId",     "type": "bytes32"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [],   "name": "requestPriceDataMint",   "outputs": [    {     "internalType": "bytes32",     "name": "requestId",     "type": "bytes32"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [],   "name": "symbol",   "outputs": [    {     "internalType": "string",     "name": "",     "type": "string"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [],   "name": "totalSupply",   "outputs": [    {     "internalType": "uint256",     "name": "",     "type": "uint256"    }   ],   "stateMutability": "view",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "recipient",     "type": "address"    },    {     "internalType": "uint256",     "name": "amount",     "type": "uint256"    }   ],   "name": "transfer",   "outputs": [    {     "internalType": "bool",     "name": "",     "type": "bool"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "sender",     "type": "address"    },    {     "internalType": "address",     "name": "recipient",     "type": "address"    },    {     "internalType": "uint256",     "name": "amount",     "type": "uint256"    }   ],   "name": "transferFrom",   "outputs": [    {     "internalType": "bool",     "name": "",     "type": "bool"    }   ],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [    {     "internalType": "address",     "name": "to",     "type": "address"    }   ],   "name": "transferOwnership",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  },  {   "inputs": [],   "name": "withdrawLink",   "outputs": [],   "stateMutability": "nonpayable",   "type": "function"  } ]'
  async function handleValChangeEth(val:string){
    const data = await fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=INR")
    const jj = await data.json()
    setToken1Val(val)
    if(swapEth){
      const valInr = String(Number(val) * (jj["RAW"]["ETH"]["INR"]["PRICE"]))
      setToken2Val(valInr)
    }
    else{
      const valEth = String(Number(val) / (jj["RAW"]["ETH"]["INR"]["PRICE"]))
      setToken2Val(valEth)
    }
  }

  function swap(){
    const inrContract = new ethers.Contract("0x17552E05ABD11092FD3D17ACa9E28846D40569Eb", abi, walletSigner);
    swapEth? inrContract.mintRupee(ethers.utils.parseEther(token1),{ value: ethers.utils.parseEther(token1) }) : inrContract.convertToEth(ethers.utils.parseEther(token1))
  }

  function handleSwitch(){
    setSwapEth(!swapEth)
    setToken1Val(token2)
  }
  
  useEffect(()=>{
    handleValChangeEth(token1)
  }, [token1])

  useEffect(()=>{
    const connect = async () =>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      console.log(signer)
      setSigner(signer)
      setProvider(provider)
    }
    connect()
    
  }, [])


  return (
    <div className='w-screen h-screen flex flex-col bg-black text-white'>
      <div className='content-center flex flex-col w-96 h-72 mx-auto my-auto rounded-2xl bg-gray-700 '>
        <div className='mx-auto text-xl my-1'>
        Swap
        </div>
        <div className='w-80 h-20 mx-auto flex flex-row bg-black rounded-lg my-2'>
          <div className='my-auto mx-auto'>
          <input type="number" id="token1" name="last" value={token1} className='bg-black' onChange={(e)=>{handleValChangeEth(e.target.value)}}/>
          </div>
          <div className='my-auto mx-auto'>
            {swapEth? <div>ETH</div> : <div>INR</div>}
           
          </div>
        </div>
        <button onClick={()=>{handleSwitch()}}>
          Switch
        </button>
        <div className='w-80 h-20 mx-auto flex flex-row bg-black rounded-lg my-2'>
          <div className='my-auto mx-auto w-44'>
            {token2}
          </div>
          <div className='my-auto mx-auto'>
          {swapEth? <div>INR</div> : <div>ETH</div>}
          </div>
        </div>
        <button className='w-36 h-10 text-center rounded-sm  mx-auto my-auto bg-blue-500' onClick={swap}>
          Swap
        </button>
      </div>
      {}
    </div>
  )
}

export default Home