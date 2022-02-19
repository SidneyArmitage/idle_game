import { ReactNode } from "react";
import "./index.scss";

interface IProps {
  title: ReactNode;
  icon: string;
  children: ReactNode;
}

const Card = ({ title, icon, children }: IProps) => {
  return (<div className="card layer">
    <h3>{title}</h3>
    <div>{children}</div>
    <img src={icon} alt={"icon"} />
  </div>);
};

export default Card;