import Header from '../components/Header';
import Departments from '../components/Departments';

const DepartmentsPage = () => {
    return ( 
        <>
            <Header page={location.pathname}/>
            <Departments />
        </>
    )
}


export default DepartmentsPage;