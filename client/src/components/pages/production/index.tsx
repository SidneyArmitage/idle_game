import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { stateContext } from "../../../context";
export { Detailed } from "./detailed";
export { Summary } from "./summary";

interface IProps {

}

export const Production = ({}: IProps) => {
  const stateControl = useContext(stateContext);
  useEffect(() => {
    console.log("setting title");
    stateControl.getTitleSetter()("Production");
  }, []);
  return (
    <>
      <Outlet/>
    </>
  );
};