import { atom } from "recoil";

const currData = atom({
    key: "currData",
    default: []
});
const token = atom({
    key : "token",
    default : ""
})
export{ currData , token }