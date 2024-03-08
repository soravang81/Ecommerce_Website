import { atom } from "recoil";

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
export{ currData , tokenAtom , fetchData }