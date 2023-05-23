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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

export default function ProductBox({_id, title, images, description, price}) {
  
  const {addProduct} = useContext(CartContext)
  const url = '/product/' + _id;
  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={'https://cdn-icons-png.flaticon.com/512/6122/6122991.png'} alt={title}></img>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        {/* <p>{_id}</p> */}
        <Title href={url}>{title[0].toUpperCase().concat(title.slice(1, title.length))}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary outline onClick={() => addProduct(_id)}>
            <CartIcon/>Add
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}