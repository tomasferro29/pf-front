import styled from "styled-components"
import ProductBox from "@/components/ProductBox";
import { RevealWrapper } from "next-reveal";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr ;
    gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ProductsGrid = ({products}) => {
  return (
    <StyledProductsGrid interval={100} >
      {products?.length > 0 && products.map((product, index) =>(
        <RevealWrapper delay={index * 50} key={product._id}>
          <ProductBox {...product} />
        </RevealWrapper>
      ))}
    </StyledProductsGrid>
  );
}

export default ProductsGrid