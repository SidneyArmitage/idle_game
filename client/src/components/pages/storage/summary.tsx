import { SimulationControl } from "../../../data/control";
import { EStorageCategory } from "shared";
import { Store } from "../../store";

interface IProps {
  control: SimulationControl
}

export const Summary = ({control}: IProps) => {
  return (
    <>
      <Store {...control.getStore(EStorageCategory.BULK)}/>
      <Store {...control.getStore(EStorageCategory.MANUFACTURED)}/>
      <Store {...control.getStore(EStorageCategory.EXOTIC)}/>
    </>
  );
};