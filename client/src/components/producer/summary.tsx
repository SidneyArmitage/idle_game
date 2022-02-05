import { Link } from "react-router-dom";
import { IProduction } from "shared";
import Card from "../card";
import Bar from "../svg/bar";

const Production = ({id, name, description, progress, time}: IProduction) => {
  return (
    <Card title={<Link to={`./${id}`}>{name}</Link>} icon={""}>
      <>
        <p>{description}</p>
        <p>
          <Bar dataPoints={[progress, time - progress]} colours={[0x0000FF, 0x000099]} gap={0.1} />
        </p>
      </>
    </Card>
  );
};

export default Production;