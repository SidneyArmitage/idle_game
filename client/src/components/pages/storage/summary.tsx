import { SimulationControl } from "../../../data/control";
import { EStorageCategory } from "shared";
import { Store } from "../../store";

interface ISummaryProps {
  control: SimulationControl
}

export const Summary = ({control}: ISummaryProps) => {
  return (
    <>
      <Store {...control.getStore(EStorageCategory.BULK)}/>
      <Store {...control.getStore(EStorageCategory.MANUFACTURED)}/>
      <Store {...control.getStore(EStorageCategory.EXOTIC)}/>
    </>
  );
};