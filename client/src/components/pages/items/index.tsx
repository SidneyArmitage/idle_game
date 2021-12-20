import { SimulationControl } from "../../../data/control";
import { EStorageCategory, IGetItem } from "shared";
import { Item } from "../../item";
import { useEffect, useState } from "react";

interface IItemsProps {
  control: SimulationControl
}

export const Items = ({control}: IItemsProps) => {
  const [items, setItems] = useState(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
  useEffect(() => {
    setItems(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
    const subscribable = control.getSubscribable();
    const subscription = subscribable.subscribe(() => {
      setItems(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, []);
  return (
    <>
      <h1>Items</h1>
      {items.map((item, index) => (<Item key={index} {...item}/>))}
    </>
  );
};