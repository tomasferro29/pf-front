import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  border: solid 1px #eeeeeeaa;

`;

const InputWrapper = styled.div`
  position:sticky;
  top: 70px;
  padding: 5px 0;
  /* background-color: #eeeeeeaa; */
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if ( phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrase]);

  function searchProducts (phrase) {
    axios.get('/api/products?phrase='+encodeURIComponent(phrase))
    .then(response => {
      setProducts(response.data);
      setIsLoading(false);
    });    
  }
  return(
    <>
       <Header />
       <Center>
       <InputWrapper>
          <SearchInput
            autoFocus
            value={phrase}
            onChange={ev => setPhrase(ev.target.value)}
            placeholder='Search for products...' 
          />
        </InputWrapper>
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2>Not products found for {`"` + phrase + `"`}</h2>
        )}
        {isLoading && (
          <Spinner fullWidth={true} />
        )}
        {!isLoading && products.length > 0 &&(
          <ProductsGrid products={products} />
        )}
        </Center>
     </>
  )
}