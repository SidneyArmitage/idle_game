import { useEffect } from "react";

interface IProps {
  setTitle: (title: string) => void;
}


export const Research = ({setTitle}: IProps) => {
  useEffect(() => {
    setTitle("Research");
  }, []);
  return (
    <>
      nothing to show...
    </>
  );
};