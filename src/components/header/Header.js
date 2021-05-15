import React from 'react';


const Header = (props) => {

    if (props.nightMode == false) {
        return (
            <div className="header">
                <div className="titles">
                    <h1 className="title">Hooman Hajarian</h1>
                    <h4 className="subTitle">Full Stack Developer</h4>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className=" header-night">
                <div className=" titles-night" >
                    <h1 className=" title-night">Hooman Hajarian</h1>
                    <h4 className=" subTitle-night">Full Stack Developer</h4>
                </div>
            </div>
        );
    }
}

export default Header;
