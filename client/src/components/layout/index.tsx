import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../nav";

interface ILayoutProps {
  titleSetter: (fn: (input: string) => void) => void;
}

export const Layout = ({ titleSetter }: ILayoutProps) => {
  const [title, setTitle] = useState("");
  useEffect(()=> {
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