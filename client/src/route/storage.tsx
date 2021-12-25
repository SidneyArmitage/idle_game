import { SimulationControl } from "../data/control";
import { Storage, Summary, Detailed } from '../components/pages/storage';
import { EStorageCategory } from "shared";
import { Route } from "react-router-dom";

export default (control: SimulationControl) => (
  <Route path="storage" element={<Storage/>}>
    <Route path="" element={<Summary control={control}/>}/>
    {[EStorageCategory.BULK, EStorageCategory.MANUFACTURED, EStorageCategory.EXOTIC].map((value) => <Route key={value} path={`${value}`} element={<Detailed control={control} id={value}/>}/>)}
  </Route>
);