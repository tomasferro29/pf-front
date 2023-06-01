import React, { useContext } from 'react'
import Center from './Center'
import styled from 'styled-components'
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { primary } from '@/lib/colors';
import { CartContext } from './CartContext';
import Link from 'next/link';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px){
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  gap: 40px;
  
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {        // ESTO PUSO A LA IMAGEN POR ENCIMA DEL NOMBRE EN MEDIA
    order: 2;
  }
  @media screen and (min-width: 768px){
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {       
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
    width: 200px;
    margin-left: 40px;
    border-radius: 10px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default function Featured({product}) {

  const {addProduct} = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <NavLink href={'/product/' + product._id}>
                <Title>
                  {product?.title[0].toUpperCase().concat(product.title.slice(1, product.title.length))}
                </Title>
              </NavLink>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                {/* <ButtonLink href={'/products/'+product._id} white outline>Read more</ButtonLink> */}
                <ButtonLink href={'/product/' + product._id} white={1} outline={1}>Read more</ButtonLink>
                <Button white onClick={addFeaturedToCart}><CartIcon/>Add to cart</Button>
                {/* FlyingButton white={1}*/}
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
          <NavLink href={'/product/' + product._id}>
            <img src={product.images[0]} alt="featured-product"/>
          </NavLink>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}


