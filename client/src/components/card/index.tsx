import "./index.scss";

interface IProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const Card = ({ title, icon, children }: IProps) => {
  return (<div className="card">
    <h3>{title}</h3>
    <div>{children}</div>
    <img src={icon} alt={`${title} icon`} />
  </div>);
};

export default Card;