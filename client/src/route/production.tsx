import { SimulationControl } from "../data/control";
import { Production, Summary, Detailed } from '../components/pages/production';
import { Route } from "react-router-dom";
import { Fragment } from "react";

export default () => (
  <Fragment>
    <Route path="production" element={<Production />}>
      <Route path="" element={<Summary />}/>
      <Route path=":id" element={<Detailed />}/>
    </Route>
  </Fragment>
);