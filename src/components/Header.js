import { useState, useEffect } from 'react';
import '../styles/HeaderStyle.css';
import logo from "../images/slogo.png";

export default function Header() {
    const [headerWidth, setHeaderWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setHeaderWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>

            {headerWidth >= 600 ? (
                <div className='super-header-container'>
                    <div className="header-container">
                        {headerWidth >= 600 ? (
                            <>
                                <a href='/'><img src={logo} alt="logo" className="logo" /></a>
                                <div className="title">
                                    <a href='/'><h1>SPOTIFY MANAGER</h1></a>
                                </div>
                                {/* Este espacio vacío ayudará a empujar el título al centro */}
                                <div className="space"></div>
                            </>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <img src={logo} alt="logo" style={{ height: 50, width: 50 }} />
                                <div style={{ marginTop: 10 }}>
                                    <h1>SPOTIFY MANAGER</h1>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            ) : (
                <div className="header-container">
                    {headerWidth >= 600 ? (
                        <>
                            <a href='/'><img src={logo} alt="logo" className="logo" /></a>
                            <div className="title">
                                <a href='/'><h1>SPOTIFY MANAGER</h1></a>
                            </div>
                            {/* Este espacio vacío ayudará a empujar el título al centro */}
                            <div className="space"></div>
                        </>
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            <img src={logo} alt="logo" style={{ height: 50, width: 50 }} />
                            <div style={{ marginTop: 10 }}>
                                <h1>SPOTIFY MANAGER</h1>
                            </div>
                        </div>
                    )}

                </div>
            )}


        </>


    );
}
