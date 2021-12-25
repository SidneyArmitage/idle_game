import { Outlet } from "react-router-dom";
export { Detailed } from "./detailed";
export { Summary } from "./summary";

export const Production = () => {
  return (
    <>
      <h1>Production</h1>
      <Outlet/>
    </>
  );
};