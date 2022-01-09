import { Link, useMatch } from "react-router-dom";

export const Nav = () => {
  
  return (
  <nav>
  <div className="head"></div>
    <ul>
      <li className={`link ${useMatch({path: "items"}) ? "active" : ""}`}><Link to="items/">Items</Link></li>
      <li className={`link ${useMatch({path: "production"}) ? "active" : ""}`}><Link to="production/">Production</Link></li>
      <li className={`link ${useMatch({path: "research"}) ? "active" : ""}`}><Link to="research/">Research</Link></li>
      <li className={`link ${useMatch({path: "storage"}) ? "active" : ""}`}><Link to="storage/">Storage</Link></li>
    </ul>
    <div className="tail"></div>
  </nav>
  );
};