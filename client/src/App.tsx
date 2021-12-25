import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { EStorageCategory, IItem, IProduction } from 'shared';
import './App.scss';
import { Layout } from './components/layout';
import { Items } from './components/pages/items';
import { Production } from './components/pages/production';
import { Research } from './components/pages/research';
import { Detailed, Storage, Summary } from './components/pages/storage';
import { SimulationControl } from './data/control';
import { arrayToMap } from './util/arrayToMap';
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