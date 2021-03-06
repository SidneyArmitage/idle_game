import { Link, useMatch } from "react-router-dom";

export const Nav = () => {
  
  return (
  <nav>
  <div className="head"></div>
    <ul>
      <li className={`link ${useMatch({path: "items"}) ? "active" : "button layer"}`}><Link to="items/">Items</Link></li>
      <li className={`link ${useMatch({path: "production"}) ? "active" : "button layer"}`}><Link to="production/">Production</Link></li>
      <li className={`link ${useMatch({path: "research"}) ? "active" : "button layer"}`}><Link to="research/">Research</Link></li>
      <li className={`link ${useMatch({path: "storage"}) ? "active" : "button layer"}`}><Link to="storage/">Storage</Link></li>
    </ul>
    <div className="tail layer"></div>
  </nav>
  );
};