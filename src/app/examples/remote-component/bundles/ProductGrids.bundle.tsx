import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra';
import { ProductGrids } from '../components/ProductGrids';

const ProductGridsBundle = ({}) => {
  return (
    <ChakraProvider theme={theme}>
      <ProductGrids />
    </ChakraProvider>
  );
};

export default ProductGridsBundle;
