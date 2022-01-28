import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { stateContext } from "../../context";
import { Nav } from "../nav";

interface ILayoutProps {

}

export const Layout = ({  }: ILayoutProps) => {
  const stateControl = useContext(stateContext);
  const [title, setTitle] = useState(stateControl.getTitle());
  useEffect(()=> {
    setTitle(stateControl.getTitle());
    stateControl.setTitleSetter((input: string) => {
      setTitle(input);
    });
  }, []);
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