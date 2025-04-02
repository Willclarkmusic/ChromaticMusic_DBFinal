import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";

interface HeaderProps {
    page: string;
}

const Header = ({ page }: HeaderProps) => {
    const navigate = useNavigate();


    const navButtons = [
        { name: 'Products', path: '/products' },
        { name: 'Customers', path: '/customers' },
        { name: 'Departments', path: '/departments' },
        { name: 'Employees', path: '/employees' },
        { name: 'Invoices', path: '/invoices' },
    ]

    return (
        <>
            <div className="bg-teal-300 h-24 flex flex-row items-center justify-center px-4 rounded-md m-3">
                <button
                    className={`bg-[#1e1e1e] text-white text-2xl hover:bg-[#2e2e2e] hover:text-teal-100 p-[0.5em] m-[5px] rounded-md
                        ${page == '/' ? 'text-black bg-teal-300 ' : ''} `}
                    onClick={() => {
                        navigate('/');
                    }}>
                    <IoHomeSharp />
                </button>

                {navButtons
                    .map((button, index) => (
                        <button
                            key={index}
                            className={`bg-[#1e1e1e] text-white text-xl hover:bg-[#2e2e2e] hover:text-teal-100 p-[0.5em] m-[5px] rounded-md
                                ${button.path == page ? 'text-black font-semibold bg-teal-300 ' : ''} `}
                            onClick={() => {
                                navigate(button.path);
                            }}
                        >
                            {button.name}
                        </button>
                    ))}

            </div>
        </>
    );
}

export default Header;