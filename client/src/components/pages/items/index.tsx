import { SimulationControl } from "../../../data/control";
import { EStorageCategory } from "shared";
import { Item } from "../../item";

interface IItemsProps {
  control: SimulationControl
}

export const Items = ({control}: IItemsProps) => {
  return (
    <>
      <h1>Items</h1>
      {control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC).map((item) => (<Item {...item}/>))}
    </>
  );
};