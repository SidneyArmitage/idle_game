import { useState } from "react";
import { SimulationControl } from "../../data/control";
import { IProduction } from "shared";
import { Item } from "../item";
import { Link } from "react-router-dom";

interface IItemProps extends IProduction {
  control: SimulationControl;
  isExpanded: boolean;
}

export const Producer = ({isExpanded: isFocused, name, id, progress, time, control, consumption, output}: IItemProps) => {
  return (
    <div>
      <Link to={isFocused ? '..' : `./${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>
        <span>{progress}</span> / <span>{time}</span>
      </p>
      { isFocused ?
      <>
        {consumption.length > 0 ? (
          <div>
            Inputs:
            {consumption.map((cur) => <Item current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
          </div>
        ) : ""}
        {output.length > 0 ? (
          <div>
            Outputs:
            {output.map((cur) => <Item current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
          </div>
        ) : ""}
      </> : ""}
    </div>
  );
};