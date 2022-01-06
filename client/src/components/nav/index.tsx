import { Link, useMatch } from "react-router-dom";

export const Nav = () => {
  
  return (
  <nav>
    <ul>
      <li className={useMatch({path: "items"}) ? "active-link" : ""}><Link to="items/">Items</Link></li>
      <li className={useMatch({path: "production"}) ? "active-link" : ""}><Link to="production/">Production</Link></li>
      <li className={useMatch({path: "research"}) ? "active-link" : ""}><Link to="research/">Research</Link></li>
      <li className={useMatch({path: "storage"}) ? "active-link" : ""}><Link to="storage/">Storage</Link></li>
    </ul>
  </nav>
  );
};