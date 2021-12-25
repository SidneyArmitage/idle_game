import { useParams } from "react-router-dom";
import { SimulationControl } from "../../../data/control";
import { Producer } from "../../producer";

interface IProductionProps {
  control: SimulationControl;
}

export const Detailed = ({control}: IProductionProps) => {
  const { id } = useParams();
  const production = control.getProduction(Number.parseInt(id || "0"));
  return (
    <>
      <Producer isExpanded={true} key={production.id} control={control} {...production}/>
    </>
  );
};