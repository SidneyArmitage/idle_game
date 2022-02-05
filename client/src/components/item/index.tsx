import Card from "../card";

interface IItemProps {
  name: string;
  description: string;
  current: number;
  max?: number;
}

export const Item = ({name, description, current, max}: IItemProps) => {
  return (
    <Card title={name} icon={""}>
      <>
        <p>{description}</p>
        <p>
          <span>{current}</span>&nbsp;{max ? (<span>{max}</span>) : ""}
        </p>
      </>
    </Card>
  );
};