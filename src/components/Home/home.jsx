import React from "react";
import './home.css';

import { Link } from "react-router-dom";

const Home = () => {



    return (

        <div className="root-home">
            <main >
                <nav className="mainhome">
                    <h1 className='title-conte'>PRUEBAS</h1>
                    <div className="nav">
                        <nav className="navintro">
                            <ul className="ulLayout">
                                <li className="liLayout">            
                                    
                                    <Link className="aLayout" to="../PruebasAF"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="130" fill="white">A</text>
                                        <text x="90" y="110" font-family="Arial" font-size="130" fill="white">F</text>
                                    </svg>
                                    </Link>
                                </li>
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasGL"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="130" fill="white">G</text>
                                        <text x="90" y="110" font-family="Arial" font-size="130" fill="white">L</text>
                                    </svg></Link>
                                </li>
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasMP"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="128" fill="white">M</text>
                                        <text x="95" y="110" font-family="Arial" font-size="128" fill="white">P</text>
                                    </svg></Link>
                                </li>
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasQU"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="-4" y="110" font-family="Arial" font-size="130" fill="white">Q</text>
                                        <text x="90" y="110" font-family="Arial" font-size="130" fill="white">U</text>
                                    </svg></Link>
                                </li>
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasVZ"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="130" fill="white">V</text>
                                        <text x="90" y="110" font-family="Arial" font-size="130" fill="white">Z</text>
                                    </svg></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </nav>
            </main>
        </div>
    );
};

export default Home;
