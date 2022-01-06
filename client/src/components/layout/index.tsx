import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../nav";

interface ILayoutProps {
  titleSetter: (fn: (input: string) => void) => void;
  defaultTitle: () => string;
}

export const Layout = ({ titleSetter, defaultTitle }: ILayoutProps) => {
  const [title, setTitle] = useState(defaultTitle());
  useEffect(()=> {
    setTitle(defaultTitle);
    titleSetter((input: string) => {
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