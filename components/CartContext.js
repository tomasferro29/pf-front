import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [
    ls,
    // PROBLEM: NO INCLUIR ls COMO DEPENDENCIA PUEDE AFECTAR EL DESARROLLO
    cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [
    ls
    // PROBLEM: NO INCLUIR ls COMO DEPENDENCIA PUEDE AFECTAR EL DESARROLLO
  ])

  const countEl =(array, el)=>{
    let count = 0;
    for (let i = 0; i < array.length; i++){
      if(array[i]==el){
        count++;
      }
    }
    return count;
  }
   
  function addProduct(productId, stock) {
    setCartProducts(prev => {
      var pos =countEl(prev, productId);
      console.log(stock);
      if((pos+1)>stock){
        alert("there isn't enough stock");
        return prev
      }
      return [...prev, productId]
    })
  };

  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      } else {
        return prev
      };
    });
  };
  function clearCart(){
    setCartProducts([]);
  }
  
  return (
    <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}