import Header from '../components/Header';
import Customers from '../components/Customers';

const CustomersPage = () => {
    return ( 
        <>
            <Header page={location.pathname}/>
            <Customers />
        </>
    )
}


export default CustomersPage;