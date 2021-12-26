import { ESubscribables, SimulationControl } from "../../../data/control";
import { EStorageCategory, IGetItem } from "shared";
import { Item } from "../../item";
import { useEffect, useState } from "react";

interface IProps {
  control: SimulationControl;
  setTitle: (title: string) => void;
}

export const Items = ({control, setTitle}: IProps) => {
  const [items, setItems] = useState(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
  useEffect(() => {
    setTitle("Items");
    setItems(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
    const subscribable = control.getSubscribable(ESubscribables.ITEM);
    const subscription = subscribable.subscribe(() => {
      setItems(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, []);
  return (
    <>
      {items.map((item, index) => (<Item key={index} {...item}/>))}
    </>
  );
};