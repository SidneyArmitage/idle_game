import { useContext } from "react";
import { EStorageCategory } from "shared";
import { dataContext } from "../../../context";
import { Store } from "../../store";

interface IProps {
}

export const Summary = ({}: IProps) => {
  const control = useContext(dataContext);
  return (
    <>
      <Store {...control.getStore(EStorageCategory.BULK)}/>
      <Store {...control.getStore(EStorageCategory.MANUFACTURED)}/>
      <Store {...control.getStore(EStorageCategory.EXOTIC)}/>
    </>
  );
};