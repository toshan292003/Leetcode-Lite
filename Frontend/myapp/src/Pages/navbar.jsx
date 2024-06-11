import React, { useState, useEffect } from "react";
import "./navbar.css";
export default function Navbar() {

    const [scrollPosition, setScrollPosition] = useState(0);

    
    return (
        <>
            <div className="navbox">
                <div className="navitems">
                    <span>TOSHICODE</span>
                </div>
                <div className="navitems">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Tests</a>
                        </li>
                        <li>
                            <a href="/input">Inputs</a>
                        </li>
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                        <li>
                            <a href="/">Login/Sign Up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}