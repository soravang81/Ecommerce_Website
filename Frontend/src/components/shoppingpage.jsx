import { useEffect , useState} from "react"
import axios  from "axios"
import { DisplayCards } from "./card"
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currData , token} from "../store/cardstate";


export function ShoppingPage(){
    const Token = useRecoilValue(token)
    console.log(Token)
    const putCurrData = useSetRecoilState(currData)
    const [count , setCount] = useState(0)
    useEffect(()=>{
        async function getdata(){
            const res = await axios.get("http://localhost:3000/shoes")
            putCurrData(res.data.jsondata)
    }
    getdata()
}, [setCount]
    )
    return(
        <div className="shoppingmain">
            <DisplayCards/>
            <button className="pagecounterbtn" id="pagecounter" onClick={()=>{setCount(count+1)}}>
                <span id="pagecountertxt">{count}</span>
            </button>
        </div>
    )
}