import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import DefaultImage from "./icons/DefaultImage";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

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
  const url = '/product/' + _id;
  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt='imagen'></img>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        {/* <p>{_id}</p> */}
        <Title href={url}>{title[0].toUpperCase().concat(title.slice(1, title.length))}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button block primary outline onClick={() => addProduct(_id)}>
            <CartIcon/>Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}