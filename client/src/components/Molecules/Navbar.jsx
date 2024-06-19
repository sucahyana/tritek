import React from 'react';
import { MdMonitor, MdSettingsSuggest } from 'react-icons/md';
import { FaFirstOrder } from 'react-icons/fa';
import {CgMenuHotdog} from "react-icons/cg";
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom";

export default function BasicDemo() {
    const items = [
        {
            label: 'Home',
            icon: () => <MdMonitor size="24px" className="text-gray-900" />,
            command: () => window.location.assign('/Monitoring')
        },
        {
            label: 'Products',
            icon: () => <FaFirstOrder size="24px" className="text-gray-900" />,
            command: () => window.location.assign('/ordering')
        },
        {
            label: 'Materials',
            icon: () => <MdSettingsSuggest size="24px" className="text-gray-900" />,
            command: () => window.location.assign('/modif')
        }

    ];

    return (
        <div className="navbar bg-green-400 block lg:hidden sticky top-0 z-20 shadow-lg">
            <div className="navbar-start ">
                <div className="dropdown ">
                    <div tabIndex={0} role="button" className="shadow-md btn btn-ghost btn-circle">
                        <CgMenuHotdog size={28}/>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 mx-auto shadow bg-green-400 rounded-box w-[calc(100vw-20px)]">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className="absolute -top-4">
                <Link to={"/"} >
                    <img className="w-36 bg-none " src={logo} alt="Logo Kumpulin" />
                </Link>
            </div>

        </div>
    );
}
