import Center from './Center';
import styled from 'styled-components'
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
// import FlyingButton from "@/components/FlyingButton";
import {RevealWrapper} from  'next-reveal';
import Button from './Button';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';

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
  img.main{
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
  const {addProduct} = useContext(CartContext)
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
  }, [added])

  return (
    <Bg>
      <Center>
        <ColumnsWrapper >
          <Column>
            <div>
            <RevealWrapper origin='left' delay={0}>
            <NavLink href={'/product/' + product._id}>
                <Title>
                  {product?.title}
                </Title>
              </NavLink>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/' + product._id} white={1} outline={1}
                  >Read more
                </ButtonLink>
                <Button white={1} onClick={() => {addProduct(product._id, product.stock), showAdded()}}>
                  <CartIcon/>
                  {text}
                </Button>
              </ButtonsWrapper>
            </RevealWrapper>
            </div>
          </Column>
          <Column>
            <RevealWrapper delay={0}>
              <NavLink href={'/product/' + product._id}>
                <img className={'main'} src={product.images[0]} alt="featured-product"/>
              </NavLink>
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}


