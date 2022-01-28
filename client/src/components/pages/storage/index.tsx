import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { stateContext } from "../../../context";
export { Detailed } from "./detailed";
export { Summary } from "./summary";

interface IProps {

}

export const Storage = ({}: IProps) => {
  const stateControl = useContext(stateContext);
  useEffect(() => {
    stateControl.getTitleSetter()("Storage");
  }, []);
  return (
    <>
      <Outlet/>
    </>
  );
};