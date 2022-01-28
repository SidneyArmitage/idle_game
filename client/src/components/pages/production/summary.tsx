import { useState, useEffect, useContext } from "react";
import { dataContext } from "../../../context";
import { ESubscribables } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
}

export const Summary = ({}: IProductionProps) => {
  const control = useContext(dataContext);
  const [producers, setProducers] = useState(control.getProducers());
  useEffect(()=> {
    setProducers(control.getProducers());
    const subscribable = control.getSubscribable(ESubscribables.PRODUCER);
    const subscription = subscribable.subscribe(() => {
      setProducers(control.getProducers());
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, []);
  return (
    <>
      {producers.map((production) => (<Producer isExpanded={false} key={production.id} {...production}/>))}
    </>
  );
};