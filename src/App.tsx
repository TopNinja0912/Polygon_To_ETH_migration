import React,{lazy,Suspense} from 'react';
import Layout from './layout/index';
import { useSelector } from 'react-redux';
import ChatProvider from './context/ChatProvider';
import SocketProvider from './context/SocketProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { RootState } from './app/store';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';

const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Account = lazy(() => import('./pages/Account'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Refund = lazy(() => import('./pages/Refund'));
const Cart = lazy(() => import('./pages/Cart'));
const CheckOut = lazy(() => import('./pages/CheckOut'));
interface IRootState {
  auth: {
    isLogged: boolean;
    id: string | null;
    username: string | null;
    image: string | null;
    token: string | null;
  };
}

const App : React.FC = () => {
  const isAuth = useSelector((state: IRootState) => state.auth.isLogged);
  const appData = useSelector((state: RootState) => state.auth);
  console.log(isAuth);
  console.log(appData);
  return isAuth ? 
  (
      <Layout>
      <Suspense fallback={<div>Loading... </div>}>
        <Switch>
          {/* <SocketProvider>
            <ChatProvider> */}
              <Route exact path="/shop" component={Shop}/>
              <Route exact path="/" component={Shop}/>
              <Route exact path="/product/:id" component={Product}/>
              <Route exact path="/my-account" component={Account}/>
              <Route exact path="/refund" component={Refund}/>
              <Route exact path="/faqs" component={Faqs}/>
              <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkOut/:id" component={CheckOut}/>
            {/* </ChatProvider>
          </SocketProvider> */}
        </Switch>
      </Suspense>
    </Layout>
    // )}
  ):(
    <Layout>
    <Suspense fallback={<div>Loading... </div>}>
      <Switch>
        {/* <SocketProvider>
          <ChatProvider> */}
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/" component={Shop}/>
            <Route exact path="/product/:id" component={Product}/>
            <Route exact path="/my-account" component={Account}/>
            <Route exact path="/refund" component={Refund}/>
            <Route exact path="/faqs" component={Faqs}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkOut/:id" component={CheckOut}/>
          {/* </ChatProvider>
        </SocketProvider> */}
      </Switch>
    </Suspense>
  </Layout>
  // )}
);
};

export default App;
