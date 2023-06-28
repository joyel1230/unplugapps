import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-center bg-[#3c096c] font-bold py-5 flex items-center justify-center">
      <div className="w-[60%] lg:w-[20%]">
        <ul className="flex justify-between">
          <Link to={'/'}>
            <li className="tracking-widest">HEADER</li>
          </Link>
          <Link to={'/details'}>
            <li className="tracking-widest">DETAILS</li>
          </Link>
          <Link to={'/items'}>
            <li className="tracking-widest">ITEMS</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
