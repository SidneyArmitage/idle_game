interface IItemProps {
  name: string;
  description: string;
  current: number;
  max?: number;
}

export const Item = ({name, description, current, max}: IItemProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>
        <span>{current}</span>&nbsp;{max ? (<span>{max}</span>) : ""}
      </p>
    </div>
  );
};