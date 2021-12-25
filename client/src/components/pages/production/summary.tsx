import { SimulationControl } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
  control: SimulationControl;
}

export const Summary = ({control}: IProductionProps) => {
  return (
    <>
      {control.getProductions().map((production) => (<Producer isExpanded={false} key={production.id} control={control} {...production}/>))}
    </>
  );
};