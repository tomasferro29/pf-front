import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
// import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display:flex;
  gap:20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.5rem;
`;

export default  function ProductPage({product}) {

  const {addProduct} = useContext(CartContext);
  const [added, setAdded] = useState(false)
  const [text, setText] = useState('Add to cart')

  function showAdded() {
    setAdded(true)
  }

  useEffect(() => {
    added ? setText('Added to your cart !!') : setText('Add to cart')
    setTimeout(() => {
      setAdded(false)
    }, 3000)
  }, [added]);
  
  return(
    <>
      <Header/>
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <p><span>Stock: <strong>{product.stock}</strong></span></p>
              <div>
                <Button main onClick={() => {addProduct(product._id, product.stock), showAdded()}}>
                  <CartIcon />{text}
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
        <ProductReviews product={product} />
      </Center> 
    </>
  )
}

export async function getServerSideProps (context) {
  await mongooseConnect();
  const {id} = context.query
  const product = await Product.findById(id)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}