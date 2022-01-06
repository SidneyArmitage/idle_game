import { useEffect } from "react";
import { Outlet } from "react-router-dom";
export { Detailed } from "./detailed";
export { Summary } from "./summary";

interface IProps {
  setTitle: (title: string) => void;
}

export const Production = ({setTitle}: IProps) => {
  useEffect(() => {
    console.log("setting title");
    setTitle("Production");
  }, []);
  return (
    <>
      <Outlet/>
    </>
  );
};