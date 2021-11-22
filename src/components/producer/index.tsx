import { useState } from "react";
import { SimulationControl } from "../../data/control";
import { IProduction } from "../../data/production";
import { Item } from "../item";

interface IItemProps extends IProduction {
  control: SimulationControl;
}

export const Producer = ({name, description, progress, time, control, consumption, output}: IItemProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={expanded ? "expanded" : ""}>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>
        <span>{progress}</span> / <span>{time}</span>
      </p>

      {expanded ? (<>
        {consumption ? (
          <>
            Inputs:
            {consumption.map((cur) => <Item current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
          </>
        ) : ""}
        {output ? (
          <>
            Inputs:
            {output.map((cur) => <Item current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
          </>
        ) : ""}
      </>) : ""}
    </div>
  );
};