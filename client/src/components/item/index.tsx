import Card from "../card";

interface IItemProps {
  name: string;
  description: string;
  current: number;
  max?: number;
  icon: string;
}

export const Item = ({name, description, current, max, icon}: IItemProps) => {
  return (
    <Card title={name} icon={icon}>
      <>
        <p>{description}</p>
        <p>
          <span>{current}</span>&nbsp;{max ? (<span>{max}</span>) : ""}
        </p>
      </>
    </Card>
  );
};