import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import SearchIcon from './icons/SearchIcon';
import BarsIcon from './icons/Bars';
import NotificationIcon from './icons/notifIcon';

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  ` }
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px){
    display: flex;    
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  svg{
    height: 20px;
  }
  @media screen and (min-width: 768px){
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  height: 30px;
  width:30px;
  border: 0 ;
  color: white;
  cursor: pointer;
  position: relative;
    z-index: 3;
  @media screen and (min-width: 768px){
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display: inline-block;
    min-width: 20px;
    color: white;
    svg{
      width: 14px;
      height: 14px;
      margin: 0 20px;
    }
  }

`;

export default function Header(){
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return(
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>    
            <NavLink href={'/categories'}>Categories</NavLink>    
            <NavLink href={'/account'}>Account</NavLink>    
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>    
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><SearchIcon/></Link>
            <Link href={'/notifications'}><NotificationIcon/></Link>
            <NavButton onClick={() => {setMobileNavActive(prev => !prev), console.log('movile: ', mobileNavActive)}}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}

