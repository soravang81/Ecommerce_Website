import {React , useEffect} from 'react'
import { NavBar , LpBody} from './components/landing'
import { lazy , Suspense} from "react";
import { BrowserRouter ,Routes, Route  } from "react-router-dom";
import './App.css';
import { ShoppingPage } from './components/shoppingpage';
import { RecoilRoot } from 'recoil';
import { LoginPage } from './components/loginpage';

function App() {
  return (
    <div className='main'>
      <RecoilRoot>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/shop" element={<><ShoppingPage/><NavBar/></>}/>
              <Route path="/home" element={<><LpBody/><NavBar/></>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )

}

export default App
