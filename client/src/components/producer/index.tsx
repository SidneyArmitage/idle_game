import { useContext, useState } from "react";
import { IProduction } from "shared";
import { Item } from "../item";
import { Link } from "react-router-dom";
import Bar from "../svg/bar";
import { dataContext } from "../../context";

interface IItemProps extends IProduction {
  isExpanded: boolean;
}

export const Producer = ({isExpanded, description, name, id, progress, time, consumption, output}: IItemProps) => {
  const control = useContext(dataContext);
  return (
    <div>
      <Link to={isExpanded ? '..' : `./${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>{description}</p>
      <p>
        <Bar dataPoints={[progress, time - progress]} colours={[0x0000FF, 0x000099]} gap={0.1}/>
      </p>
      { isExpanded ?
      <>
        {consumption.length > 0 ? (
          <div>
            Inputs:
            {consumption.map((cur, index) => <Item key={index} current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
          </div>
        ) : ""}
        {output.length > 0 ? (
          <div>
            Outputs:
            {output.map((cur, index) => <Item key={index} current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
          </div>
        ) : ""}
      </> : ""}
    </div>
  );
};