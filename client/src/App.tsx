import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { EStorageCategory } from 'shared';
import './App.scss';
import { Layout } from './components/layout';
import { Items } from './components/pages/items';
import { Production } from './components/pages/production';
import { Research } from './components/pages/research';
import { Detailed, Storage, Summary } from './components/pages/storage';
import items from './config/items';
import producers from './config/producers';
import { SimulationControl } from './data/control';
import { arrayToMap } from './util/arrayToMap';

export const App = () => {
  const control = new SimulationControl(arrayToMap(items), arrayToMap(producers));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Layout/>}>
            <Route path="items" element={<Items control={control}/>}/>
            <Route path="production" element={<Production control={control}/>}/>
            <Route path="research" element={<Research/>}/>
            <Route path="storage" element={<Storage/>}>
              <Route path="" element={<Summary control={control}/>}/>
              {[EStorageCategory.BULK, EStorageCategory.MANUFACTURED, EStorageCategory.EXOTIC].map((value) => <Route key={value} path={`${value}`} element={<Detailed control={control} id={value}/>}/>)}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};