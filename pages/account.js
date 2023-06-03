import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import Spinner from "@/components/Spinner";


const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2rf .8fr;
  gap:40px;
  margin: 40px 0;
`;
const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    })
  }
  async function login() {
    await signIn('google')
  }

  const saveAddress = () => {
    const data = { name, email, streetAddress, postalCode, country };
    axios.put('/api/address', data).then((response) => {
      console.log(response)
    });

  }

  useEffect(() => {
    if(!session){
      return; 
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
    axios.get('/api/address').then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });
  }, [])

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>WishList</h2>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? 'Account details' : 'Login'}</h2>
                {!addressLoaded && (
                  <Spinner fullWidth={true} />
                )}
                {addressLoaded && (
                  <>
                    <Input type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={ev => setName(ev.target.value)} />
                    <Input type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={ev => setEmail(ev.target.value)} />
                    <CityHolder>
                      <Input type="text"
                        placeholder="City"
                        value={city}
                        name="city"
                        onChange={ev => setCity(ev.target.value)} />
                      <Input type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        name="postalCode"
                        onChange={ev => setPostalCode(ev.target.value)} />
                    </CityHolder>
                    <Input type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={ev => setStreetAddress(ev.target.value)} />
                    <Input type="text"
                      placeholder="Country"
                      value={country}
                      name="country"
                      onChange={ev => setCountry(ev.target.value)} />
                    <Button black block
                      onClick={saveAddress}>
                      save
                    </Button>
                    <hr />
                  </>
                )}

                {session && (
                  <Button primary onClick={logout}>Logout</Button>
                )}
                {!session && (
                  <Button primary onClick={login}>Login</Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  )
}