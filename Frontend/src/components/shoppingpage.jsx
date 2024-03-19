import { useEffect , useState} from "react"
import axios  from "axios"
import { DisplayCards } from "./card"
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currData , tokenAtom , fetchData , ifAddedToCart , isVerified} from "../store/cardstate";

export function ShoppingPage(){
    const [refetch,setRefetch] = useRecoilState(fetchData);
    console.log(refetch)
    const setToken = useSetRecoilState(tokenAtom);
    const [verified , setisVerified] = useRecoilState(isVerified);
   
    const putCurrData = useSetRecoilState(currData)
    const [count , setCount] = useState(0)
    useEffect(()=>{
        
        async function getdata(){
            
            const token = localStorage.getItem("token")
            if(verified == true){
                const res = await axios.get("https://ecommerce-website-g6pi.vercel.app/shoes",{ headers: {
                "Content-Type": "application/json",
                "Authorization": token
                }
            });
            if(res.data.msg === true){
                putCurrData(res.data.jsondata)
            }
            else if(res.data.msg === false){
                console.log("Token not verified");
                setisVerified(false)
            }}
            else{
                console.log("Token not verified");
            }
            
    }
    getdata()
}, [setRefetch]
    )
    return(
        <div className="shoppingmain-container">
            {verified && <div className="shoppingmain">
                <DisplayCards/>
                <button className="pagecounterbtn" id="pagecounter" onClick={()=>{setCount(count+1)}}>
                    <span id="pagecountertxt">{count}</span>
                </button>
            </div>}
        </div>
        
    )
}