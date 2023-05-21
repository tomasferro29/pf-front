import React from 'react'
import Center from './Center'
import styled from 'styled-components'
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { primary } from '@/lib/colors';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img{
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;


export default function Featured({product}) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.title[0].toUpperCase().concat(product.title.slice(1, product.title.length))}</Title>
              {/* <Desc>{product.description}</Desc> */}
              <Desc>
                Officia culpa nulla qui sit fugiat eu voluptate.Officia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptateOfficia culpa nulla qui sit fugiat eu voluptate
              </Desc>
              <ButtonsWrapper>
                {/* <ButtonLink href={'/products/'+product._id} white outline>Read more</ButtonLink> */}
                <ButtonLink href={'/products/'} white={1} outline={1}>Read more</ButtonLink>
                <Button white><CartIcon/>Add to cart</Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://http2.mlstatic.com/D_NQ_NP_909797-MLA47953574007_102021-O.jpg" alt="laptop"/>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}


