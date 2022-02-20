import { useContext, useEffect, useReducer } from "react";
import { EStorageCategory, IGetItem } from "shared";
import { fallbackIcon } from "../../../config/constants";
import { dataContext } from "../../../context";
import { ESubscribables, SimulationControl } from "../../../data/control";
import { getFree } from "../../../data/storage";
import { Item } from "../../item";

interface IProps {
  id: EStorageCategory;
}

const update = (control: SimulationControl, id: EStorageCategory) => {
  const store = control.getStore(id);
  const free = getFree(store);
  const itemList = Array.from(new Set([...Object.keys(store.reserved).map(Number.parseInt), ...Object.keys(store.stored).map(Number.parseInt)])) as number[];
  return {
    items: itemList.map((cur) => control.getItem(cur, true, free)),
    store,
    free,
  };
};

export const Detailed = ({id}: IProps) => {
  const control = useContext(dataContext);
  const [{
    free,
    store,
    items,
  }, dispatch] = useReducer(() => update(control, id), {
    items: [] as IGetItem[],
    free: 0,
    store: {
      id: 0,
      name: "",
      description: "",
      available: 0,
      reserved: {},
      stored: {},
      icon: fallbackIcon,
      used: 0,
    },
  });
  useEffect(() => {
    const subscribable = control.getSubscribable(ESubscribables.STORE);
    const subscription = subscribable.subscribe(() => dispatch());
    return () => {
      subscribable.unsubscribe(subscription);
    };
  },[control]);
  return (
    <div className={"expanded"}>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <p>
        <span>{store.available - free}</span> / <span>{store.available}</span>
      </p>
      <div>
        {items.map((item, index) => (<Item key={index} {...item}/>))}
      </div>
    </div>
  );
};