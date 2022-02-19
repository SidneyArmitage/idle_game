import { useContext } from "react";
import { Item } from "../item";
import { dataContext,  } from "../../context";
import { IProduction } from "shared";
import Bar from "../svg/bar";


const Expanded = ({description, name, progress, time, consumption, output, icon}: IProduction) => {
  const control = useContext(dataContext);
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
        {consumption.map((cur, index) => <Item key={index} current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
      </div>
    ) : ""}
    {output.length > 0 ? (
      <div className="grid">
        Outputs:
        {output.map((cur, index) => <Item key={index} current={cur[1]} {...{...control.getItem(cur[0])}}/>)}
      </div>
    ) : ""}
    </>
  );
};

export default Expanded;