import { Link, NavLink } from "react-router-dom";
import logo3 from "../assets/logo3.png"

function Navbar() {
    return (
        <div className="navbar bg-base-200 shadow-sm md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/services"}>Services</NavLink></li>
                        <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
                        <li><NavLink to={"/tasks"}>Tasks</NavLink></li>

                    </ul>
                </div>
                <div className="bg-white w-10px h-30px">
                    
                </div>
                <Link to={"/"} className="btn btn-ghost text-2xl" > <img src={logo3} className="w-[40px] " alt="" />TaskFlow</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/services"}>Services</NavLink></li>
                    <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
                    <li><NavLink to={"/tasks"}>Tasks</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <NavLink to={"/login"} className="mr-4 ">Login</NavLink>
                <Link to={"/register"} className="btn btn-primary hidden md:flex">Get TaskFlow for free</Link>
            </div>
        </div>
    );
}

export default Navbar;