import { SimulationControl } from "../data/control";
import { Production, Summary, Detailed } from '../components/pages/production';
import { Route } from "react-router-dom";
import { Fragment } from "react";

export default (control: SimulationControl) => (
  <Fragment>
    <Route path="production" element={<Production/>}>
      <Route path="" element={<Summary control={control}/>}/>
      <Route path=":id" element={<Detailed control={control}/>}/>
    </Route>
  </Fragment>
);