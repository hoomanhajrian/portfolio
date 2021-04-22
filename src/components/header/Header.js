import React from 'react';
import Contact from './Contact';


function Header() {

    return (
        <div className="header">
            <div className="titles">
                <h1 className="title">Hooman Hajarian</h1>
                <h3 className="subTitle">Front End Developer</h3>
            </div>
            <Contact />
        </div>
    );
}

export default Header;
