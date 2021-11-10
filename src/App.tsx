import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components/layout';
import { Items } from './components/pages/items';
import { Production } from './components/pages/production';
import { Research } from './components/pages/research';
import { Detailed, Storage, Summary } from './components/pages/storage';
import items from './config/items';
import { SimulationControl } from './data/control';
import { EStorageCategory } from './data/storage';

export const App = () => {
  const control = new SimulationControl(items.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {}));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Layout/>}>
            <Route path="items" element={<Items control={control}/>}/>
            <Route path="production" element={<Production/>}/>
            <Route path="research" element={<Research/>}/>
            <Route path="storage" element={<Storage/>}>
              <Route path="" element={<Summary/>}/>
              {[EStorageCategory.BULK, EStorageCategory.MANUFACTURED, EStorageCategory.EXOTIC].map((value) => <Route key={value} path={`${value}`} element={<Detailed/>}/>)}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};