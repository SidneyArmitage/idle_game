import { useContext, useEffect } from "react";
import { stateContext } from "../../../context";

interface IProps {

}


export const Research = ({}: IProps) => {
  const stateControl = useContext(stateContext);
  useEffect(() => {
    stateControl.getTitleSetter()("Research");
  }, []);
  return (
    <>
      nothing to show...
    </>
  );
};