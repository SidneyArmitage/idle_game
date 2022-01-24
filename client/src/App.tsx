import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { IItem, IProduction } from 'shared';
import './App.scss';
import { Layout } from './components/layout';
import { Items } from './components/pages/items';
import { Research } from './components/pages/research';
import { arrayToMap } from './util/arrayToMap';
import storage from './route/storage';
import production from './route/production';
import {
  useQuery
} from "@apollo/client";
import { useContext, useEffect, useState } from 'react';
import { query } from './query/resources';
import { Bindings } from './dev/bindings';
import { dataContext, stateContext } from './context';

interface IQuery {
  resources: {
    items: IItem[];
    production: IProduction[];
  };
};

declare global {
  interface Window { bindings: Bindings; }
}


const transformTuple = (element: any): [number, number] => {
  return [element.key as number, element.value as number];
}


export const App = () => {
  const control = useContext(dataContext);
  const stateControl = useContext(stateContext);
  window.bindings = new Bindings(control);
  const { loading, data } = useQuery<IQuery>(query);
  const [ ready, setReady ] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (!data) {
        return;
      }
      control.init(arrayToMap(data?.resources.items), arrayToMap(data?.resources.production.map(({consumption, output, ...rest}) => ({
        ...rest,
        consumption: consumption.map(transformTuple),
        output: output.map(transformTuple),
      }))));
      setReady(true);
      control.start();
    }
  }, [loading, ready]);
  if (!ready) {
    return (<>Loading...</>);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Layout defaultTitle={() => stateControl.getTitle()} titleSetter={(title) => stateControl.setTitleSetter(title)}/>}>
            <Route path="items" element={<Items control={control} setTitle={(title) => stateControl.getTitleSetter()(title)}/>}/>
            {storage(control, (title) => stateControl.getTitleSetter()(title))}
            {production(control, (title) => stateControl.getTitleSetter()(title))}
            <Route path="research" element={<Research setTitle={(title) => stateControl.getTitleSetter()(title)}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};