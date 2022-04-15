export const ContractAddr = '0x2210b8647cFD764d0d9206B3292790768802c708';
export const ContractABI = [
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "y",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "bytes3",
            "name": "color",
            "type": "bytes3"
         }
      ],
      "name": "UpdatePixels",
      "type": "event"
   },
   {
      "inputs": [
         {
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
         },
         {
            "internalType": "uint256",
            "name": "y",
            "type": "uint256"
         },
         {
            "internalType": "bytes3",
            "name": "color",
            "type": "bytes3"
         }
      ],
      "name": "colorPixel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
         }
      ],
      "name": "getRow",
      "outputs": [
         {
            "internalType": "bytes3[50]",
            "name": "",
            "type": "bytes3[50]"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
         },
         {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
         }
      ],
      "name": "pixels",
      "outputs": [
         {
            "internalType": "bytes3",
            "name": "",
            "type": "bytes3"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   }
]
