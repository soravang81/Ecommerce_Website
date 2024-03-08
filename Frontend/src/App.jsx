import {React , useEffect} from 'react'
import { HomePage} from './components/homepage'
import { lazy , Suspense} from "react";
import { BrowserRouter ,Routes, Route  } from "react-router-dom";
import './App.css';
import { ShoppingPage } from './components/shoppingpage';
import { RecoilRoot } from 'recoil';
import { LoginPage } from './components/loginpage';
import { NavBar } from './components/navbar';


function App() {
  return (
    <div className='main'>
      <RecoilRoot>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LoginPage/>}></Route>
              <Route path="/shop" element={<><ShoppingPage/><NavBar/></>}/>
              <Route path="/home" element={<><HomePage/><NavBar/></>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )

}

export default App
