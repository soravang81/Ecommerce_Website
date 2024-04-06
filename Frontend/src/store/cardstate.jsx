import { atom, selector } from "recoil";
import axios from "axios";
const token = localStorage.getItem("token")

const currData = atom({
    key: "currData",
    default: []
});
const tokenAtom = atom({
    key : "tokenAtom",
    default : ""
})
const fetchData = atom({
    key : "fetchData",
    default : (0)
})
const errormsg = atom({
    key : "errormsg",
    default : (0)
})
const ifAddedToCart = atom({
    key : "ifAddedToCart",
    default : false
})
const isVerified = atom({
    key : "isVerified",
    default : true
})
const isEmpty = atom({
    key :"isEmpty",
    default : false
})
const reFetchCartData = atom({
    key :"reFetchCartData",
    default : 0
})
const cartData = atom({
    key: "cartData",
    default: selector({
        key: "cartDataSelector",
        get: async () => {
            const res = await axios.get("https://backend.skillcode.website/cart", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            console.log(res.data.cartjsondata)
            console.log(res.data.msg)
            return res.data.cartjsondata;
        }
    })
});

export{ currData , tokenAtom , fetchData , errormsg , ifAddedToCart , isVerified , isEmpty , cartData ,reFetchCartData}