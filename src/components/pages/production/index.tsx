import { SimulationControl } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
  control: SimulationControl;
}

export const Production = ({control}: IProductionProps) => {
  return (
    <>
      <h1>production</h1>
      {control.getProductions().map((production) => (<Producer control={control} {...production}/>))}
    </>
  );
};