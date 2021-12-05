import { SimulationControl } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
  control: SimulationControl;
}

export const Production = ({control}: IProductionProps) => {
  return (
    <>
      <h1>Production</h1>
      {control.getProductions().map((production) => (<Producer key={production.id} control={control} {...production}/>))}
    </>
  );
};