// import Button from "@/components/Button";
// import { CartContext } from "@/components/CartContext";
// import Center from "@/components/Center";
// import Header from "@/components/Header";
// import { useContext, useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Input from "@/components/Input";

// const ColumnsWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   @media screen and (min-width: 768px) {
//     grid-template-columns: 1.3fr .7fr;
  
//   }
//   gap: 40px;
//   margin-top: 40px;
// `;

// const Box = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 30px;
// `;

// const ProductInfoCell = styled.td`
//   padding: 10px 0;
// `;

// const ProductImageBox = styled.div`
//   width: 70px;
//   height: 100px;
//   padding: 2px;
//   border: 1px solid rgba(0, 0, 0, 0.1);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 10px;
//   img{
//     max-width: 60px;
//     max-height: 60px;
//   }
//   @media screen and (min-width: 768px) {
//     width: 100px;
//     height: 100px;
//     padding: 10px;
//     img{
//       max-width: 80px;
//       max-height: 80px;
//     }
//   }
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   th{
//     text-align: left;
//     text-transform: uppercase;
//     color: #ccc;
//     font-weight: 700;
//     font-size: .7rem;
//   }
//   td{
//     border-top: 1px solid rgba(0, 0, 0, 0.1);
//   }
// `;

// const QuantityLabel = styled.span`
//   padding: 0 15px;
//   display: block;
//   @media screen and (min-width: 768px) {
//     display: inline-block;
//     padding: 0 10px;
//   }
// `;

// const CityHolder = styled.div`
//   display: flex;
//   gap: 5px;

// `;

// export default function CartPage() {

//   const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [city, setCity] = useState('');
//   const [postalCode, setPostalCode] = useState('');
//   const [streetAdress, setStreetAdress] = useState('');
//   const [country, setCountry] = useState('');
//   const [isSuccess,setIsSuccess] = useState(false);
//   const [shippingFee, setShippingFee] = useState(null);

//   function moreOfThisProduct(id) {
//     addProduct(id);
//   };

//   function lessOfThisProduct(id) {
//     removeProduct(id)
//   }



//   useEffect(() => {
//     // console.log(products[0].images)
//     if (cartProducts.length > 0) {
//       axios.post('/api/cart', { ids: cartProducts })
//         .then(response => {
//           setProducts(response.data);
//         });
//     } else {
//       setProducts([])
//     }
//   }, [cartProducts])


//   useEffect(()=>{
//     if(typeof window ==='undefined'){
//       return;
//     }
//     if (window?.location.href.includes('success')){
//       setIsSuccess(true);
//       clearCart();
//     }
//   },[])

//   let total = 0
//   for (const productId of cartProducts) {
//     const price = products.find(p => p._id === productId)?.price || 0;
//     total += price;
//   };
//   // async function goToPayment() {
//   //   const response = await axios.post('/api/checkout', {
//   //     name,email,city,postalCode,streetAdress,country,
//   //     cartProducts,
//   //   });
//   //   if (response.data.url) {
//   //     window.location = response.data.url
//   //   }
//   // }
//   const goToPayment= async () => {
//     const response= await axios.post('/api/checkout',{
//       name,email, city, postalCode, streetAdress, country,
//       cartProducts,
//     })
//     if(response.data.url){
//       window.location = response.data.url;
//     }
//   };


//   if (isSuccess) {
//     return (
//       <>
//         <Header />
//         <Center>
//           <ColumnsWrapper>
//             <Box>
//               <h1>Thanks for your order!</h1>
//               <p>We will email you when you order will be sent.</p>
//             </Box>
//           </ColumnsWrapper>
//         </Center>
//       </>
//     )
//   }

//   if (window.location.href.includes('success')) {
//     return (
//       <>
//        <Header />
//        <Center>
//         <ColumnsWrapper>
//           <Box>
//             <h1>Thanks for your order!</h1>
//             <p>We will email you when your order will be sent</p>
//           </Box>
//         </ColumnsWrapper>
//        </Center>
//       </>
//     )
//   }


//   return (
//     <>
//       <Header />
//       <Center>
//         <ColumnsWrapper>
//           <Box>
//             <h2>Cart</h2>
//             {!cartProducts?.length && (
//               <div>Your cart is empty</div>
//             )}
//             {products.length > 0 && (
//               <StyledTable>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map(product => (
//                     <tr key={product._id}>
//                       <ProductInfoCell>
//                         <ProductImageBox>
//                           <img src={product.images[0]} alt='imagen' />
//                         </ProductImageBox>
//                         {product.title}
//                       </ProductInfoCell>
//                       <td>
//                         <Button black outline
//                           onClick={() => lessOfThisProduct(product._id)}>
//                           -
//                         </Button>
//                         <QuantityLabel>
//                           {cartProducts.filter(id => id === product._id).length}
//                         </QuantityLabel>
//                         <Button black outline
//                           onClick={() => moreOfThisProduct(product._id)}>
//                           +
//                         </Button>
//                       </td>
//                       <td>${product.price * cartProducts.filter(id => id === product._id).length}</td>
//                     </tr>
//                   ))}
//                   <tr>
//                     <td>Total</td>
//                     <td></td>
//                     <td>$ {total}</td>
//                   </tr>
//                 </tbody>
//               </StyledTable>
//             )}
//           </Box>
//           {!!cartProducts.length && (
//             <Box>
//               <h2>Order Info</h2>
//                 <Input 
//                   type="text" 
//                   placeholder="Name" 
//                   value={name} 
//                   name='name'
//                   onChange={ev => setName(ev.target.value)}/>
//                 <Input 
//                   type="text" 
//                   placeholder="Email" 
//                   value={email} 
//                   name='email'
//                   onChange={ev => setEmail(ev.target.value)}/>
//                 <CityHolder>
//                   <Input 
//                     type="text" 
//                     placeholder="City" 
//                     value={city} 
//                     name='city'
//                     onChange={ev => setCity(ev.target.value)}/>
//                   <Input 
//                     type="text" 
//                     placeholder="Postal Code" 
//                     value={postalCode} 
//                     name='postalCode'
//                     onChange={ev => setPostalCode(ev.target.value)}/>
//                 </CityHolder>
//                 <Input 
//                   type="text" 
//                   placeholder="Street Adress" 
//                   value={streetAdress} 
//                   name='streetAdress'
//                   onChange={ev => setStreetAdress(ev.target.value)}/>
//                 <Input 
//                   type="text" 
//                   placeholder="Country" 
//                   value={country} 
//                   name='country'
//                   onChange={ev => setCountry(ev.target.value)}/>
//                 {/* <input 
//                   type='hidden' 
//                   name='products' 
//                   value={cartProducts.join(',')} /> */}
//                 <Button black block onClick={goToPayment}>Continue to payment</Button>

//             </Box>
//           )}
//         </ColumnsWrapper>
//       </Center>
//     </>
//   )
// }

import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr .7fr;
  
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 700;
    font-size: .7rem;
  }
  td{
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;

`;

export default function CartPage() {

  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAdress, setStreetAdress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);

  function moreOfThisProduct(id) {
    addProduct(id);
  };

  function lessOfThisProduct(id) {
    removeProduct(id)
  }

  useEffect(() => {
    // console.log(products[0].images)
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        });
    } else {
      setProducts([])
    }
  }, [cartProducts])


  useEffect(()=>{
    if(typeof window ==='undefined'){
      return;
    }
    if (window?.location.href.includes('success')){
      setIsSuccess(true);
      clearCart();
    }
  },[])

  let total = 0
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  };

  const goToPayment= async () => {
    const response= await axios.post('/api/checkout',{
      name,email, city, postalCode, streetAdress, country,
      cartProducts,
    })
    if(response.data.url){
      window.location = response.data.url;
    }
  };


  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when you order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }


  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products.length > 0 && (
              <StyledTable>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt='imagen' />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button black outline
                          onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button black outline
                          onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>${product.price * cartProducts.filter(id => id === product._id).length}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td>$ {total}</td>
                  </tr>
                </tbody>
              </StyledTable>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              <h2>Order Info</h2>
              {/* <form method='post' action='/api/checkout'> */}
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name='name'
                  onChange={ev => setName(ev.target.value)} />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name='email'
                  onChange={ev => setEmail(ev.target.value)} />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name='city'
                    onChange={ev => setCity(ev.target.value)} />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name='postalCode'
                    onChange={ev => setPostalCode(ev.target.value)} />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Adress"
                  value={streetAdress}
                  name='streetAdress'
                  onChange={ev => setStreetAdress(ev.target.value)} />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name='country'
                  onChange={ev => setCountry(ev.target.value)} />
                {/* <input
                  type='hidden'
                  name='products'
                  value={cartProducts.join(',')} /> */}
                <Button black block onClick={goToPayment}>Continue to payment</Button>
              {/* </form> */}
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}