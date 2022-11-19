import { NFTCard } from "./nftCard"
import { useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);
  const [res, setRes]=useState(0);

  const fetchNFTs = async() => {
    let nfts; 
    setRes(1);
    console.log("fetching nfts");
    // const api_key = "D16ziZ0827VqpKmdnkfPpqExmiF7cuUB"
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/ysSZaXGXMK172tG99nlKYCgURNqgiqdV/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(
        data => {setRes(2); return data.json();}
      )
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(
        data => {setRes(2); return data.json();}
      )
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      setRes(1);
      var requestOptions = {
        method: 'GET'
      };
      // const api_key = "D16ziZ0827VqpKmdnkfPpqExmiF7cuUB"
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/ysSZaXGXMK172tG99nlKYCgURNqgiqdV/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => {setRes(2); return data.json();})
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col py-8 gap-y-3 bg-cover bg-no-repeat w-full h-screen" style={{background: `linear-gradient(267.45deg, #05d5ff -34.23%, #5533ff 99.39%)`}}>
         <div style={{paddingLeft:"40px"}}>
          <img src="data:image/png;base64,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" style={{width:'100px',height:'28px'}} />
         </div>
      <div className="flex justify-between">

    
      
        <div className="flex flex-col justify-center items-center">
        {
          (wallet || collection) ? ( 
            NFTs.length ? (
              <div className="absolute left-[290px] top-[160px]">
                <h1 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-6xl">My Collections</h1>
                <h2 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-4xl">Have {NFTs.length} NFTs</h2>
              </div>
              ) : ( res == 1 ? (
                    <div className="absolute left-[290px] top-[160px]">
                      <h2 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-4xl"> Waiting... </h2>
                    </div>
                  ) : ( res == 2 ? (
                      <div className="absolute left-[290px] top-[160px]">
                        <h2 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-4xl">No NFT to show</h2>
                      </div>
                      ) : (
                        <div className="hidden"></div>
                      )
                  )
                )
          ) : (
            <div className="hidden"></div>
          )
        }
        </div>
        {/* <div style={{background:"#4c84ff",borderRadius:"30px"}}> */}
        <div className="flex flex-col justify-center items-center gap-y-4 top-[300px] right-[240px]  absolute" style={{border:" 2px solid #fff", borderRadius:"10px",background:'#4c84ff'}}>
          

          <input className="border-4 border-indigo-500/75 w-80 rounded-xl" disabled={fetchForCollection} type={"text"} onChange={(e)=>{setWalletAddress(e.target.value);setCollectionAddress("");}} value={wallet} placeholder="Input your wallet address"></input>
          <input className="border-4 border-indigo-500/75 w-80 rounded-xl" disabled={!fetchForCollection} type={"text"} onChange={(e)=>{setCollectionAddress(e.target.value);setWalletAddress("");}} value={collection} placeholder="Add the collection address"></input>
          <label className="text-green-600 font-semibold"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
          <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-full w-40 font-bold shadow-inner bottom-2 border-solid"} 
            onClick={ () => {
              if (fetchForCollection) {
                fetchNFTsForCollection()
              } else {
                fetchNFTs()
              }
            }
          }> Show NFTs </button>
          </div>
        {/* </div> */}
      </div>
      
      <div className="flex flex-col justify-start gap-y-12 mt-4 gap-x-2 absolute bottom-[20px] left-[50px]">
      {
        
        NFTs.length ? ( 
          <div className="flex m-4" 
          style={ {border:" 2px solid #fffff",borderRadius:"10px",background: "#4651b3"}}>
            <InfiniteScroll
              dataLength={100}
              height={500}
              
            > 
              { 
                NFTs.map(nft => {
                  return (
                    <NFTCard nft={nft}></NFTCard>          
                  )
                })
              }
            </InfiniteScroll>
          </div> 
        ) : ( 
          <div className="hidden"></div>
        )
      }
      </div>
    </div>
  )
}

export default Home