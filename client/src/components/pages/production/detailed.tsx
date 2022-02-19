import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { dataContext, stateContext } from "../../../context";
import { ESubscribables } from "../../../data/control";
import { Expanded } from "../../producer";


export const Detailed = () => {
  const stateControl = useContext(stateContext);
  const control = useContext(dataContext);
  const { id } = useParams();
  const numberId = Number.parseInt(id || "");
  const [producer, setProducer] = useState(control.getProducer(numberId));
  useEffect(() => {
    setProducer(control.getProducer(numberId));
    const subscribable = control.getSubscribable(ESubscribables.PRODUCER);
    const subscription = subscribable.subscribe(() => {
      console.log("producer changed");
      const p = control.getProducer(numberId)
      stateControl.getTitleSetter()(p.name);
      setProducer(p);
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, [control, stateControl, numberId]);
  if (producer === undefined) {
    return <>loading...</>;
  }
  return (
    <>
      <Expanded {...producer}/>
    </>
  );
};