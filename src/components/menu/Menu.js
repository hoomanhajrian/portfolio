import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 90%)',
        border: 0,
        borderRadius: 15,
        marginTop: 15,
        boxShadow: '3px 4px 6px 4px rgba(0, 0, 0, 0.1)',
        color: 'white',
        height: 40,
        padding: '0 30px',
    },
});


const Menu = (props) => {
    const classes = useStyles();
    const [status, changeStatus] = useState(false);

    const handleMenuStatusChange = () => {
        changeStatus(!status);
        if (status === true) {
            const menu = document.getElementById("menuitems");
            const menuItems = document.getElementsByClassName("menu-item");
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove("animated-menu");
            }
            menu.style.display = "none";
        }
        else {
            const menu = document.getElementById("menuitems");
            const menuItems = document.getElementsByClassName("menu-item");
            menu.style.display = "flex";
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.add("animated-menu");
            }
        }
    }


    return (
        <div className="menu">
            <Button className={classes.root} onClick={handleMenuStatusChange}>Menu</Button>
        </div>
    )
};

export default Menu;