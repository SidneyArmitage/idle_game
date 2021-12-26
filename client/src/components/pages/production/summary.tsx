import { useState, useEffect } from "react";
import { ESubscribables, SimulationControl } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
  control: SimulationControl;
}

export const Summary = ({control}: IProductionProps) => {
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
      {producers.map((production) => (<Producer isExpanded={false} key={production.id} control={control} {...production}/>))}
    </>
  );
};