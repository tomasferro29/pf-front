import styled from 'styled-components'
import Center from './Center';
import ProductBox from './ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-weight: 500;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products?.length > 0 && products.map( product => (
          // <div key={product._id}>{product.title}</div>
          <ProductBox key={product._id} {...product} />
          ))}
      </ProductsGrid>
    </Center>
  )
}