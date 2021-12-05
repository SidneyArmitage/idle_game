import { Outlet } from "react-router-dom";
export { Summary } from "./summary";
export { Detailed } from "./detailed";

export const Storage = () => {
  return (
    <>
      <h1>Storage</h1>
      <Outlet/>
    </>
  );
};