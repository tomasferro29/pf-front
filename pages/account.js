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
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";
import ProductBox from "@/components/ProductBox";
import CheckIcon from "@/components/icons/CheckIcon";
import {sendEmail} from "@/lib/mail"


const ColsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin:5px;
  }
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [saved, setSaved] = useState(false)
  const [submitText, setSubmitText] = useState('Save')
  const [submitIcon, setSubmitIcon] = useState(null)
  const urlAdmin = process.env.NEXT_PUBLIC_ADMIN_URL;

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    })
  }
  async function login() {
    await signIn('google')

  }

  const goAdmin = () => {
    window.open(urlAdmin)
  }

  const saveAddress = () => {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put('/api/address', data).then((response) => {
      setSaved(true)
      setSubmitText('Information saved')
      setSubmitIcon(<CheckIcon />)
    });

  }

  const productRemovedFromWishlist = (idToRemove) => {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }


  useEffect(() => {
    if (!session) {
      setAddressLoaded(false);
      setWishlistLoaded(false);
      setOrderLoaded(false);
      return;
    } else {
      setAddressLoaded(false);
      setWishlistLoaded(false);
      setOrderLoaded(false);
      axios.get('/api/address').then((response) => {
        if (response.status === 200) {
          setName(response.data?.name);
          setEmail(response.data?.email);
          setCity(response.data?.city);
          setPostalCode(response.data?.postalCode);
          setStreetAddress(response.data?.streetAddress);
          setCountry(response.data?.country);
        }
        setAddressLoaded(true);
      }).catch((error) => {
        console.error(error);
      });
      axios.get('/api/wishlist').then(response => {
        setWishedProducts(response.data.map(wp => wp.product));
        setWishlistLoaded(true);
      });
      axios.get('/api/orders').then(response => {
        setOrders(response.data);
        setOrderLoaded(true);
      });
    }
    axios.get(`/api/admins?email=${session?.user?.email}`).then(response => {
      if (response.status === 200) { setIsAdmin(true) } else {
        setIsAdmin(false);
      }
    }).catch((error) => {
      setIsAdmin(false);
    })
  }, [session]);
  if (!session) {
    return (<>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <WhiteBox>
              <h3>Log in to see your account!</h3>
              <Button primary onClick={login}>Login</Button>
            </WhiteBox>
          </div>
        </ColsWrapper>
      </Center>
    </>)
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Orders', 'Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Orders' && (
                  <>
                    {!orderLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && (
                          <p>You have no orders</p>
                        )}
                        {orders.length > 0 && orders.map((o, i) => (
                          <SingleOrder key={i} {...o} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Wishlist' && (
                  <>
                    {!wishlistLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProducts.length > 0 && wishedProducts.map(wp => (
                            <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                          ))}
                        </WishedProductsGrid>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && (
                              <p>Your wishlist is empty</p>
                            )}

                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                {isAdmin && (
                  <div className="p1">
                    <Button primary onClick={goAdmin}>Go to admin page</Button>
                  </div>
                )}
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
                      {submitText}{saved && <hr />}{submitIcon}
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
                <Button primary onClick={async () => { sendEmail('tomasferro29@gmail.com',
                'rolando', 'esta es una prueba', 'este es un contenido de prueba')}}>Send Email</Button>
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  )
}