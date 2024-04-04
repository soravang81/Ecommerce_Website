import { useRecoilState, useRecoilValue } from "recoil"
import { tokenAtom , isEmpty , cartData ,reFetchCartData} from "../store/cardstate"
import axios from 'axios';
import { useEffect } from "react";

export default function Cart(){
    const token = useRecoilValue(tokenAtom);
    const [empty , setEmpty] = useRecoilState(isEmpty);
    const [getCartData , setCartData] = useRecoilState(cartData);
    const FetchCartData = useRecoilValue(reFetchCartData);

    useEffect(()=>{
        const fetchCartData = async ()=>{
            console.log("refetched cart")
            const token = localStorage.getItem("token")
            const res = await axios.get("http://13.49.246.102:3000/cart" , {headers : {
            "Content-Type": "application/json",
            "Authorization": token
            }})
            if(res.data.msg){
                setEmpty(false);
                console.log(res.data.cartjsondata)
                console.log(getCartData)
                setCartData(res.data.cartjsondata)
            }
            else{
                console.log("setempty true")
                console.log(res.data.cartjsondata)
                console.log(getCartData)
                setCartData(res.data.cartjsondata)
                setEmpty(true);
            }
            }
        fetchCartData()
        console.log(getCartData)
    },[FetchCartData])
    
    function OneCartItem({cart}){
        const maxLength = 40;
        const truncateTitle = (title) => {
            if (title.length > maxLength) {
                return title.substring(0, maxLength) + "...";
            } else {
                return title;
            }
        };
        return(
            <div className="cartmain">
                <div className="cart">
                        <div className="cartitems">
                            <img src= {cart.link} alt={cart.link} className="cartimage"></img>
                            <div className="carttextdiv">
                                <h3 className="carttext" id="carttitle">{truncateTitle(cart.title, maxLength)}</h3>
                                <h3 className="carttext" id="cartprice">{cart.price}</h3>
                                <h3 className="carttext" id="cartrating">{cart.rating}</h3>
                                <h3 className="carttext" id="cartcount">{cart.count}</h3>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
    return(
        <div className="cartrenderer">
        {empty && <div className="emptycart"><span className="emptytcarttxt">The Cart is Empty</span></div>}
            {getCartData.map((data , index)=>{
                return(
                    <OneCartItem key={index} cart={data}/>
                )
            })}
        </div>
        
    )


}