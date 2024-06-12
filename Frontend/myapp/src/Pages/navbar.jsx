import React, { useState, useEffect } from "react";
import "./navbar.css";
export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY || window.pageYOffset);
      console.log(scrollPosition);
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
              <a href="/">Problems</a>
            </li>
            <li>
              <a href="/input">Practice</a>
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
  );
}
