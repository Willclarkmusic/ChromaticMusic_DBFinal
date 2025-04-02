import Invoices from '../components/Invoices';
import Header from '../components/Header';

const InvoicesPage = () => {
    return ( 
        <>
            <Header page={location.pathname}/>
            <Invoices />
        </>
    )
}


export default InvoicesPage;