import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "../../../context";
import { ESubscribables } from "../../../data/control";
import { Expanded } from "../../producer";

interface IProductionProps {
}

export const Detailed = ({}: IProductionProps) => {
  const control = useContext(dataContext);
  const { id } = useParams();
  const numberId = Number.parseInt(id || "");
  const [producer, setProducer] = useState(control.getProducer(numberId));
  useEffect(() => {
    setProducer(control.getProducer(numberId));
    const subscribable = control.getSubscribable(ESubscribables.PRODUCER);
    const subscription = subscribable.subscribe(() => {
      console.log("producer changed");
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
      <Expanded {...producer}/>
    </>
  );
};