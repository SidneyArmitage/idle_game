import { SimulationControl } from "../../../data/control";
import { EStorageCategory, getFree } from "../../../data/storage";
import { Item } from "../../item";

interface IDetailedProps {
  control: SimulationControl;
  id: EStorageCategory;
}

export const Detailed = ({control, id}: IDetailedProps) => {
  const store = control.getStore(id);
  const free = getFree(store);
  // @ts-ignore
  const itemList = Array.from(new Set([...Object.keys(store.reserved), ...Object.keys(store.stored)])) as number[];
  return (
    <div className={"expanded"}>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <p>
        <span>{store.available - free}</span> / <span>{store.available}</span>
      </p>
      <div>
        {itemList.map((key) => (<Item {...{
          max: store.reserved[key] ?? free,
          current: store.stored[key] ?? 0,
          ...control.getItem(key),
          }}/>))}
      </div>
    </div>
  );
};