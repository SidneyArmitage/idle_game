import { useContext } from "react";
import { Item } from "../item";
import { dataContext } from "../../context";
import { IProduction } from "shared";
import Card from "../card";
import Bar from "../svg/bar";
import { Link } from "react-router-dom";


const Expanded = ({description, name, progress, time, consumption, output}: IProduction) => {
  const control = useContext(dataContext);
  return (
    <Card title={<Link to="..">{name}</Link>} icon={""}>
      <>
        <p>{description}</p>
        <p>
          <Bar dataPoints={[progress, time - progress]} colours={[0x0000FF, 0x000099]} gap={0.1} />
        </p>
      </>
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
      </Card>
  );
};

export default Expanded;