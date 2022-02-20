import { useContext, useEffect, useState } from "react";
import { Item } from "../item";
import { dataContext,  } from "../../context";
import { IGetItem, IProduction } from "shared";
import Bar from "../svg/bar";
import { ESubscribables } from "../../data/control";

interface IItems {
  consumptionItems: IGetItem[]
  outputItems: IGetItem[]
}

const Expanded = ({description, name, progress, time, consumption, output, icon}: IProduction) => {
  const control = useContext(dataContext);
  const [{consumptionItems, outputItems}, setItems] = useState({
    consumptionItems: [],
    outputItems: [],
  } as IItems);
  useEffect(() => {
    const subscribable = control.getSubscribable(ESubscribables.STORE);
    const subscription = subscribable.subscribe(() => {
      setItems({
        consumptionItems: consumption.map((cur) => control.getItem(cur[0], true)),
        outputItems: output.map((cur) => control.getItem(cur[0], true)),
      });
    });
    return () => {
      subscribable.unsubscribe(subscription);
    }
  }, [control, consumption, output]);
  return (
    <>
      <p>{description}</p>
      <img src={icon} alt={`${name} icon`} />
      <p>
        <Bar dataPoints={[progress, time - progress]} colours={[0x0000FF, 0x000099]} gap={0.1} />
      </p>
    {consumption.length > 0 ? (
      <div className="grid">
        Inputs:
        {consumptionItems.map((cur, index) => <Item key={index} {...cur}/>)}
      </div>
    ) : ""}
    {output.length > 0 ? (
      <div className="grid">
        Outputs:
        {outputItems.map((cur, index) => <Item key={index} {...cur}/>)}
      </div>
    ) : ""}
    </>
  );
};

export default Expanded;