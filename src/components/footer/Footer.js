import React from 'react';
import ContactLinks from '../contact/ContactLinks';

function Footer() {

    return (
        <div className="footer">
            <p className="footer-copy">&copy; {new Date().getFullYear()} hh-portfolio All Rights Reserved</p>
            <ContactLinks />
        </div>
    );
}

export default Footer;
