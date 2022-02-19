import { useState, useEffect, useContext } from "react";
import { dataContext, stateContext } from "../../../context";
import { ESubscribables } from "../../../data/control";
import { Summary as Producer } from "../../producer";

export const Summary = () => {
  const control = useContext(dataContext);
  const stateControl = useContext(stateContext);
  const [producers, setProducers] = useState(control.getProducers());
  useEffect(()=> {
    stateControl.getTitleSetter()("Production");
    setProducers(control.getProducers());
    const subscribable = control.getSubscribable(ESubscribables.PRODUCER);
    const subscription = subscribable.subscribe(() => {
      setProducers(control.getProducers());
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, [control, stateControl]);
  return (
    <>
      {producers.map((production) => (<Producer key={production.id} {...production}/>))}
    </>
  );
};