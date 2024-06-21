import { Link, useLocation } from "react-router-dom";
import { FaFirstOrder } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import logo from "../../assets/logo.png";

const menuItems = [
    { title: 'Products', icon: <FaFirstOrder size="20px" />, path: '/Products' },
    { title: 'Materials', icon: <MdMonitor size="20px" />, path: '/Materials' }
];

export default function LeftSidebar() {
    const location = useLocation();

    return (
        <aside className="shadow-2xl hidden lg:flex flex-col justify-between h-screen p-2 sm:p-3 md:p-4 border-r sticky top-0 whitespace-nowrap px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 bg-martinique-800">
            <Link to={"/"} className="mx-auto">
                <img className="w-auto h-20 sm:h-24 md:h-28 lg:h-32 bg-none" src={logo} alt="Logo Kumpulin" />
            </Link>
            <div className="flex flex-col justify-between w-full mt-12 sm:mt-14 md:mt-16 lg:mt-18">
                <nav className="-mx-2 space-y-3 sm:space-y-4 md:space-y-5">
                    <div className="space-y-1 sm:space-y-2 md:space-y-3">
                        <span className="border ml-3 border-martinique-300"></span>
                        <label className="px-2 text-xs sm:text-sm md:text-base lg:text-lg text-martinique-50 font-semibold">Menu</label>
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center px-2 py-1 text-martinique-50 transition-colors duration-300 transform rounded-lg hover:bg-martinique-700 hover:text-white ${location.pathname === item.path ? 'bg-martinique-700 text-white' : ''}`}
                                style={{ transition: 'all 0.3s ease-in-out' }}
                            >
                                {item.icon}
                                <span className="mx-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
            <footer className="flex flex-col mt-auto text-xxs sm:text-xs md:text-sm text-center text-martinique-300">
                <p>&copy; {new Date().getFullYear()} PT Tritek Indonesia.</p>
                <p>All rights reserved.</p>
            </footer>
        </aside>
    );
}
