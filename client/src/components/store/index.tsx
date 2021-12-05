import { Link } from "react-router-dom";

interface IStoreProps {
  id: number;
  name: string;
  description: string;
  used: number;
  available: number;
}

export const Store = ({id, name, description, used, available}: IStoreProps) => {
  return (
    <div>
      <Link to={`./${id}`}><h2>{name}</h2></Link>
      <p>{description}</p>
      <p>
        <span>{used}</span> / <span>{available}</span>
      </p>
    </div>
  );
};