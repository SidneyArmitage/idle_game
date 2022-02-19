import { ReactNode, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { stateContext } from "../../context";
import { Nav } from "../nav";


export const Layout = () => {
  const stateControl = useContext(stateContext);
  const [title, setTitle] = useState(stateControl.getTitle());
  useEffect(()=> {
    setTitle(stateControl.getTitle());
    stateControl.setTitleSetter((input: ReactNode) => {
      setTitle(input);
    });
  }, [stateControl]);
  return (
    <>
    <header>
      <Nav/>
    </header>
    <main>
      <h1>{title}</h1>
      <Outlet/>
    </main>
    </>
  );
};