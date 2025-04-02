import Products from '../components/Products';
import Header from '../components/Header';

const ProductsPage = () => {
    return ( 
        <>
            <Header page={location.pathname}/>
            <Products />
          
        </>
    )
}


export default ProductsPage;
