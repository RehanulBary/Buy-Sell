import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import InputForm from './Input_form.jsx'
import Submitted from './Submitted.jsx'
import GetProduct from './GetProduct.jsx'
import RemoveProduct from './RemoveProduct.jsx'
import BuyProduct from './BuyProducs.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/sell' element={<InputForm/>}/>
      <Route path='/sell_submitted' element={<Submitted/>}/>
      <Route path='/get_product' element={<GetProduct/>}/>
      <Route path='/remove_product' element={<RemoveProduct/>}/>
      <Route path='/buy_product' element={<BuyProduct/>}/>
    </Routes>
  </BrowserRouter>
)
