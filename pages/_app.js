import { CartContext } from '../lib/context'
import '../styles/mustard-ui.min.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState([])
  const [dataCart, setdataCart] = useState([])
  const [totalCart, settotalCart] = useState(cart.length)

  return (<>
    <CartContext.Provider value={{cart, setcart, totalCart, settotalCart}}>
        <Component {...pageProps} />
    </CartContext.Provider>
  </>)
}

export default MyApp