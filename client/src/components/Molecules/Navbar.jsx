import { Link, useLocation } from "react-router-dom";
import { GiJigsawBox } from "react-icons/gi";
import logo from "../../assets/logo.png";
import { SiMaterialformkdocs } from "react-icons/si";
import { FaHome } from "react-icons/fa";

const menuItems = [
    { title: 'Dashboard', icon: <FaHome size="20px" />, path: '/' },
    { title: 'Products', icon: <GiJigsawBox size="20px" />, path: '/Products' },
    { title: 'Materials', icon: <SiMaterialformkdocs size="20px" />, path: '/Materials' }
];

export default function TopNavbar() {
    const location = useLocation();

    return (
        <nav className="lg:hidden bg-martinique-800 shadow-md px-4 py-2 flex justify-between items-center">
            <Link to={"/"} className="flex items-center space-x-2">
                <img className="h-8 sm:h-10 w-auto" src={logo} alt="Logo Kumpulin" />
                <h1 className="text-martinique-200 text-lg sm:text-xl font-semibold">PT Tritek Indonesia</h1>
            </Link>
            <div className="flex space-x-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center px-2 py-1 text-martinique-50 transition-colors duration-300 transform rounded-lg hover:bg-martinique-700 hover:text-white ${location.pathname === item.path ? 'bg-martinique-700 text-white' : ''}`}
                        style={{ transition: 'all 0.3s ease-in-out' }}
                    >
                        {item.icon}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
