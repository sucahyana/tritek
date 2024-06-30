import { Link, useLocation } from "react-router-dom";
import { GiJigsawBox } from "react-icons/gi";
import logo from "../../assets/logo.png";
import {SiMaterialformkdocs} from "react-icons/si";
import {FaHome} from "react-icons/fa";

const menuItems = [
    { title: 'Dashboard', icon: <FaHome size="20px" />, path: '/' },
    { title: 'Products', icon: <GiJigsawBox size="20px" />, path: '/Products' },
    { title: 'Materials', icon: <SiMaterialformkdocs size="20px" />, path: '/Materials' }
];

export default function LeftSidebar() {
    const location = useLocation();

    return (
        <aside className="shadow-2xl hidden lg:flex flex-col justify-between h-screen p-2 sm:p-3 md:p-4 border-r sticky top-0 whitespace-nowrap px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 bg-martinique-800">
            <Link to={"/"} className="mx-auto flex flex-col justify-center border-dashed border shadow-xl border-martinique-400 p-4 rounded-2xl">
                <img className="w-auto bg-none" src={logo} alt="Logo Kumpulin" />
                <h1 className={'text-center text-martinique-200'}>PT Tritek Indonesia</h1>
            </Link>
            <div className="flex flex-col justify-between w-full mt-12 sm:mt-14 md:mt-16 lg:mt-18">
                <nav className="-mx-2 space-y-3 sm:space-y-4 md:space-y-5">
                    <div className="space-y-1 sm:space-y-2 md:space-y-3">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center px-2 py-2  text-martinique-50 transition-colors duration-300 transform rounded-lg hover:bg-martinique-700 hover:text-white ${location.pathname === item.path ? 'bg-martinique-700 text-white' : ''}`}
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
