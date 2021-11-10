import { Link, useMatch } from "react-router-dom";

export const Nav = () => {
  
  return (
  <nav>
    <ul>
      <li><Link className={useMatch({path: "items"}) ? "activeLink" : ""} to="items/">Items</Link></li>
      <li><Link className={useMatch({path: "production"}) ? "activeLink" : ""} to="production/">Production</Link></li>
      <li><Link className={useMatch({path: "research"}) ? "activeLink" : ""} to="research/">Research</Link></li>
      <li><Link className={useMatch({path: "storage"}) ? "activeLink" : ""} to="storage/">Storage</Link></li>
    </ul>
  </nav>
  );
};