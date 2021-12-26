import { useEffect } from "react";
import { Outlet } from "react-router-dom";
export { Detailed } from "./detailed";
export { Summary } from "./summary";

interface IProps {
  setTitle: (title: string) => void;
}

export const Storage = ({setTitle}: IProps) => {
  useEffect(() => {
    setTitle("Storage");
  }, []);
  return (
    <>
      <Outlet/>
    </>
  );
};