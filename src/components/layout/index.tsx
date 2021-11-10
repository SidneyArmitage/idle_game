import { Outlet } from "react-router-dom";
import { Nav } from "../nav";

export const Layout = () => (
  <>
  <header>
    <Nav/>
  </header>
  <main>
    <Outlet/>
  </main>
  </>
);