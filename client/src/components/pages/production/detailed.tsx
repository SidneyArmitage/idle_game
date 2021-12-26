import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ESubscribables, SimulationControl } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
  control: SimulationControl;
}

export const Detailed = ({control}: IProductionProps) => {
  const { id } = useParams();
  const numberId = Number.parseInt(id || "");
  const [producer, setProducer] = useState(control.getProducer(numberId));
  useEffect(() => {
    setProducer(control.getProducer(numberId));
    const subscribable = control.getSubscribable(ESubscribables.PRODUCER);
    const subscription = subscribable.subscribe(() => {
      setProducer(control.getProducer(numberId));
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, []);
  if (producer === undefined) {
    return <>loading...</>;
  }
  return (
    <>
      <Producer isExpanded={true} control={control} {...producer}/>
    </>
  );
};