import {Link, useLocation} from "react-router-dom";
import {FaFirstOrder} from "react-icons/fa";
import {MdMonitor} from "react-icons/md";
import logo from "../../assets/logo.png";

const menuItems = [
    {title: 'Products', icon: <FaFirstOrder size="24px"/>, path: '/Products'},
    {title: 'Materials', icon: <MdMonitor size="24px"/>, path: '/Materials'}
];

export default function LeftSidebar() {
    const location = useLocation();

    return (
        <aside
            className="shadow-lg hidden lg:flex flex-col justify-between h-screen p-5 border-r sticky top-0 whitespace-nowrap px-4 xl:px-12 bg-martinique-950">
            <Link to={"/"} className="mx-auto">
                <img className="w-auto h-36 bg-none" src={logo} alt="Logo Kumpulin"/>
            </Link>
            <div className="flex flex-col justify-between w-full mt-24">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-4">
                        <span className="border ml-4 border-martinique-300"></span>
                        <label
                            className="px-3 text-base md:text-lg lg:text-xl text-martinique-50 font-semibold">Menu</label>

                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center px-3 py-2 text-martinique-50 transition-colors duration-300 transform rounded-lg hover:bg-martinique-700 hover:text-white ${location.pathname === item.path ? 'bg-martinique-700 text-white' : ''}`}
                            >
                                {item.icon}
                                <span className="mx-2 text-lg xl:text-xl font-medium">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
            <footer className="flex flex-col mt-auto text-sm text-center text-martinique-300">
                <p>&copy; {new Date().getFullYear()} Billing Billiard UPB.</p>
                <p>All rights reserved.</p>
            </footer>
        </aside>
    )
}
