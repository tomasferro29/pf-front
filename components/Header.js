import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import SearchIcon from './icons/SearchIcon';

const StyledHeader = styled.header`
    background-color: #222;

`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  svg{
    height: 30px;
  }
`;

export default function Header(){
  const {cartProducts} = useContext(CartContext)
  return(
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>    
            <NavLink href={'/categories'}>Categories</NavLink>    
            <NavLink href={'/account'}>Account</NavLink>    
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>    
          </StyledNav>
          <NavLink href={'/search'}><SearchIcon/></NavLink>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}

