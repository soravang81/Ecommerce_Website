import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currData } from "../store/cardstate";

export function DisplayCards(){
    const getCurrData = useRecoilValue(currData)
    function OneCard({data}){
        const maxLength = 70;
        const truncateTitle = (title) => {
            if (title.length > maxLength) {
                return title.substring(0, maxLength) + "...";
            } else {
                return title;
            }
        };
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
                            <button className="lwrcardbtns" id="buy" ><span className="buynowtxt">Buy Now</span></button>
                            <button className="lwrcardbtns" id="cart" ><span className="buynowtxt">Add to cart</span></button>
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
            <CardRenderer/>
        </div>
        
    )
}