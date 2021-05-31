import '../styles/mustard-ui.min.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi/'
import { memo } from 'react';

const MyApp = ({ Component, pageProps }) => {
  return (<>
    <Provider store={store}>
      <Navigasi />
      <Component {...pageProps} />
    </Provider>
  </>)
}

export default memo(MyApp)