import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import DepartmentsPage from './pages/DepartmentsPage'
import EmployeesPage from './pages/EmployeesPage'
import InvoicesPage from './pages/InvoicesPage'
import HomePage from './pages/HomePage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
  {path: '/', element: <HomePage />},
  {path: '/products', element: <ProductsPage />},
  {path: '/customers', element: <CustomersPage />},
  {path: '/departments', element: <DepartmentsPage />},
  {path: '/employees', element: <EmployeesPage />},
  {path: '/invoices', element: <InvoicesPage />},
])

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
