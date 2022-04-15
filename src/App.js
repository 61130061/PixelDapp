import { useState, useEffect } from 'react';
import Panel from './components/Panel';
import WrongNet from './components/WrongNet';
import Toast from './components/Toast';
import Web3 from 'web3';
import { ContractABI, ContractAddr } from './contracts/Pixelv0.1';

const web3 = new Web3(window.web3.currentProvider);
const PixelContract = new web3.eth.Contract(ContractABI, ContractAddr);

function App() {
   const [address, setAddress] = useState(null);
   const [selectColor, setSelectColor] = useState('#ffffff');
   const [isRightNet, setRightNet] = useState(true);
   const [pixels, setPixels] = useState([]);
   const [toastList, setToastList] = useState([]);

   const handleChange = (e) => {
      setSelectColor(e.target.value);
   }

   const connectWallet = () => {
      if (window.ethereum) {
         window.ethereum.request({
            method: 'eth_requestAccounts'
         }).then((res) => {
            setAddress(res[0]);
         });
      } else {
         addToast('Please install metamask to continue!', '#ef4444', 3);
      }
   }

   function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
   }
   
   async function loadPixels () {
      if (pixels.length === 0) {
         for (let r=0; r<50; r++) {
            const row = await PixelContract.methods.getRow(r).call();
            var exportRow = [];
            for (let i=0; i<row.length; i++) {
               exportRow.push("#" + row[i].substr(2));
            }
            setPixels(pixels => [...pixels, exportRow]);
         }
      }
   }

   useEffect(() => {
      async function checkNet () {
         const net = await web3.eth.net.getId();
         if (net === 4) {
            setRightNet(true);
         } else {
            setRightNet(false);
         }
      }

      document.title = "Pixel Dapp";
      
      // Fix useEffect Load Twice
      let loaded = false;
      const changeLoaded = async () => {
         await timeout(1000);
         if (!loaded) {
            checkNet();
            loadPixels();
            PixelContract.events.UpdatePixels(
               {
                  fromBlock: 'latest'
               },
               function (err, event) {
                  console.log('new event : ', event.returnValues);
                  // .x .y .color
                  handleUpdate(event.returnValues.x, event.returnValues.y, event.returnValues.color);
               }
            );
            // Dectect account switch
            window.ethereum.on('accountsChanged', function (accounts) {
               connectWallet();
            });
            // Detect Network Switc
            window.ethereum.on('networkChanged', function(networkId){
               checkNet();
            });
         }
      }
      changeLoaded();
      return () => {
         loaded = true;
      };
   }, []);

   const handleUpdate = (x, y, color) => {
      setPixels(prevPixels => {
         const pixels2 = [...prevPixels];
         pixels2[x][y] = "#" + color.substr(2);
         return pixels2;
      });
   }

   const handlePainting = (x, y) => {
      addToast('Please pay gas price and wait for the result...', '#fcd34d', 3);
      if (address) {
         PixelContract.methods.colorPixel(x,y,"0x"+selectColor.substr(1)).send( {from: address } )
            .then((tx) => {
               if (tx.status) {
                  addToast('Painting sucess!', '#4ade80', 5);
               } else {
                  addToast('Something wrong! Cannot complete the paint', '#ef4444', 3);
               }
            });
      } else {
         console.log('Please connect to your wallet!');
         addToast('Connect to the metamask to paint a pixel', '#ef4444', 3);
      }
   }

   const addToast = (message, color, duration) => {
      const newToast = {
         message: message,
         color: color,
         duration: duration,
      }
      if (!toastList.some(ele => ele.message === newToast.message)) {
         setToastList([...toastList, newToast]);
      }
   }

   return (
      <div className="App">
         <div className="toast-container">
            {toastList.map((data, index) => 
               <Toast key={index} data={data} toastList={toastList} setToastList={setToastList} />
            )}
         </div>
         {!isRightNet &&
            <WrongNet />
         }
         <div className="logo">Pixel Dapp</div>
         <div className="top-right">
            {address ?
               <div onClick={connectWallet} className="account">{address}</div>:
               <span className="connect-button"><a onClick={connectWallet}></a></span>
            }
         </div>
         <Panel pixels={pixels} handlePainting={handlePainting} selectColor={selectColor} />
         <div className="color-panel">
            <div>Enter Color Code</div>
            <input placeholder="#ffffff" maxLength="7" value={selectColor} onChange={handleChange} />
         </div>
      </div>
   );
}

export default App;
