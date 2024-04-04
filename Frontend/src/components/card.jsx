import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currData , ifAddedToCart , reFetchCartData} from "../store/cardstate";
import axios from "axios";

export function DisplayCards(){
    let timeoutId;
    const getCurrData = useRecoilValue(currData)
    const [IfAddedToCart , setIfAddedToCart] = useRecoilState(ifAddedToCart);
    const [FetchCartData ,setreFetchCartData] = useRecoilState(reFetchCartData);


    function OneCard({data}){
        const maxLength = 70;
        const truncateTitle = (title) => {
            if (title.length > maxLength) {
                return title.substring(0, maxLength) + "...";
            } else {
                return title;
            }
        };
        async function AddToCart(){
            setreFetchCartData(FetchCartData+1)
            
            const token = localStorage.getItem("token")
            const res = await axios.post("http://13.49.246.102:3000/cart/add" , {id : data.id}, {headers : {
                Authorization : token
            }})
            if (res.data.msg) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                } else {
                    setIfAddedToCart(true);
                    timeoutId = setTimeout(() => {
                        setIfAddedToCart(false);
                    }, 5000);
                }
            }
            console.log(FetchCartData)
            
        }
        return(
            <div className="card-container">
                <div className="card">
                    <div className="carditems">
                        <img src= {data.link} alt={data.link} className="cardimage"></img>
                        <div className="cardtextdiv">
                            <h3 className="cardtext" id="cardtitle">{truncateTitle(data.title, maxLength)}</h3><br/>
                            <h3 className="cardtext" id="cardprice">{data.price}</h3><br/>
                            <h3 className="cardtext" id="cardrating">{data.rating}</h3><br/>
                        </div>
                        <div className="lwrcardbtndiv">
                            <button className="lwrcardbtns" id={data.id} ><span className="buynowtxt">Buy Now</span></button>
                            <button className="lwrcardbtns" id={data.id} onClick={AddToCart}><span className="buynowtxt">Add to cart</span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function CardRenderer(){
        return(
            <div className="cardrenderer">
                
                {getCurrData.map((data , index)=>{
                    return(
                        <OneCard key={index} data={data}/>
                    )
                })}
            </div>
        )
    }
    return(
        <div className="Page1">
            {IfAddedToCart && <div className="addtocartpopup">Added To Card Succesfully</div>}
            <CardRenderer/>
        </div>
        
    )
}