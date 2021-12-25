import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { IItem, IProduction } from 'shared';
import './App.scss';
import { Layout } from './components/layout';
import { Items } from './components/pages/items';
import { Research } from './components/pages/research';
import { SimulationControl } from './data/control';
import { arrayToMap } from './util/arrayToMap';
import storage from './route/storage';
import production from './route/production';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect, useState } from 'react';

const query = gql`
  query resources {
    resources {
      items {
        storageCategory
        description
        name
        id
        icon
      }
      production {
        consumption {
          key
          value
        }
        output {
          key
          value
        }
        description
        name
        time
        progress
        id
        icon
      }
    }
  }
`;

interface IQuery {
  resources: {
    items: IItem[];
    production: IProduction[];
  };
};

export const App = () => {
  const control = new SimulationControl();
  const { loading, data } = useQuery<IQuery>(query);
  const [ ready, setReady ] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (!data) {
        return;
      }
      control.init(arrayToMap(data?.resources.items), arrayToMap(data?.resources.production.map(({consumption, output, ...rest}) => ({
        ...rest,
        consumption: consumption.map((element: any) => [element.key as number, element.value as number]),
        output: output.map((element: any) => [element.key as number, element.value as number]),
      }))));
      setReady(true);
    }
  }, [loading, ready]);
  if (!ready) {
    return (<>Loading...</>);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Layout/>}>
            <Route path="items" element={<Items control={control}/>}/>
            {storage(control)}
            {production(control)}
            <Route path="research" element={<Research/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};