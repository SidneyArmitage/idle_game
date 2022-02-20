import { ESubscribables } from "../../../data/control";
import { EStorageCategory } from "shared";
import { Item } from "../../item";
import { useContext, useEffect, useState } from "react";
import { dataContext, stateContext } from "../../../context";

export const Items = () => {
  const stateControl = useContext(stateContext);
  const control = useContext(dataContext);
  const [items, setItems] = useState(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
  useEffect(() => {
    stateControl.getTitleSetter()("Items");
    setItems(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
    const subscribable = control.getSubscribable(ESubscribables.STORE);
    const subscription = subscribable.subscribe(() => {
      setItems(control.getItems(true, EStorageCategory.BULK | EStorageCategory.MANUFACTURED | EStorageCategory.EXOTIC));
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, [control, stateControl]);
  return (
    <>
      {items.map((item, index) => (<Item key={index} {...item}/>))}
    </>
  );
};