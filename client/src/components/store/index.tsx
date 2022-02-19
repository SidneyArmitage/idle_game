import { Link } from "react-router-dom";
import Card from "../card";

interface IStoreProps {
  id: number;
  name: string;
  description: string;
  used: number;
  available: number;
}

export const Store = ({id, name, description, used, available}: IStoreProps) => {
  return (
    <Card title={<Link to={`./${id}`}>{name}</Link>} icon={""}>
      <p>{description}</p>
      <p>
        <span>{used}</span> / <span>{available}</span>
      </p>
    </Card>
  );
};