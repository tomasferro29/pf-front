import styled from "styled-components"
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { primary } from "@/lib/colors";
import FlyingButton from '@/components/FlyingButton'

const ProductWrapper = styled.div`

`; 

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;

`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-align: right; 
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 700;
    text-align: left;
  }
`;


export default function ProductBox({_id, title, images, description, price}) {
  const {addProduct} = useContext(CartContext)
  const [added, setAdded] = useState(false)
  const [text, setText] = useState('Add to cart')
  const url = '/product/' + _id;

  function showAdded() {
    setAdded(true)
  }

  useEffect(() => {
    added ? setText('Added to your cart !!') : setText('Add to cart')
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }, [added])
  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div><img src={images?.[0]} alt='imagen'></img></div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title[0].toUpperCase().concat(title.slice(1, title.length))}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button onClick={() => {addProduct(_id), showAdded()}}>{text}</Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}