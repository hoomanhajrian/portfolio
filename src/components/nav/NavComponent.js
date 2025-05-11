import { useEffect, useState } from "react";
import ContactLinks from "../contact/ContactLinks";
import {
    NavLink,
} from "react-router-dom";
import $ from 'jquery';


const NavComponent = () => {
    const [screenWidth, updateScreenWidth] = useState(null);

    // close menu on select
    const toggleMenu = () => {
        $('.navbar-collapse').toggleClass('show');
    };
    // close menu when click out
    useEffect(() => {
        const closeMenu = () => {
            $('.navbar-collapse').removeClass('show');
        };
        document.addEventListener('click',closeMenu);
        return ()=>document.removeEventListener('click',closeMenu);
    }, []);


    useEffect(() => {
        updateScreenWidth(window.innerWidth);
        function handleResize() {
            updateScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    {screenWidth > 500 ? <img alt="portfolio-logo" src="/logo.png" style={{ width: '100px', height: '100px' }} /> : <></>}
                    Hooman Hajarian
                </a>
                <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink onClick={toggleMenu} exact className="nav-link" to="/">
                                Projects
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink onClick={toggleMenu} className="nav-link" to="/resume">
                                Resume
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink onClick={toggleMenu} className="nav-link" to="/showoff">
                                Showoff
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink onClick={toggleMenu} className="nav-link" to="/game">
                                Game
                            </NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink onClick={toggleMenu} className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <ContactLinks />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>)
};
export default NavComponent;