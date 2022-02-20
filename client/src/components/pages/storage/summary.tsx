import { useContext, useEffect, useState } from "react";
import { EStorageCategory } from "shared";
import { dataContext } from "../../../context";
import { ESubscribables } from "../../../data/control";
import { IStoreProps, Store } from "../../store";


export const Summary = () => {
  const control = useContext(dataContext);
  const [stores, setStores] = useState([] as IStoreProps[]);
  useEffect(() => {
    const subscribable = control.getSubscribable(ESubscribables.STORE);
    const subscription = subscribable.subscribe(() => 
    setStores([
      control.getStore(EStorageCategory.BULK),
      control.getStore(EStorageCategory.MANUFACTURED),
      control.getStore(EStorageCategory.EXOTIC),
    ]));
    return () => {
      subscribable.unsubscribe(subscription);
    };
  }, [control]);
  return (
    <>
    {stores.map((store, index) => <Store key={index} {...store}/>)}
    </>
  );
};