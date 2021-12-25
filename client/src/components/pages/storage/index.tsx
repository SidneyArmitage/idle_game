import { Outlet } from "react-router-dom";
export { Detailed } from "./detailed";
export { Summary } from "./summary";

export const Storage = () => {
  return (
    <>
      <h1>Storage</h1>
      <Outlet/>
    </>
  );
};