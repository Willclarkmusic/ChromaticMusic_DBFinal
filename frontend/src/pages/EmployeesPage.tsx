import Header from '../components/Header';
import Employees from '../components/Employees';

const EmployeesPage = () => {
    return ( 
        <>
            <Header page={location.pathname}/>
            <Employees />
        </>
    )
}


export default EmployeesPage;