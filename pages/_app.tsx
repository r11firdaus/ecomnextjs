import '../styles/skeleton.css';
import '../styles/mustard-ui.min.css';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi';
import Sidebar from '../components/sidebar';

const MyApp = ({ Component, pageProps }) => {
  return (<>
    <Provider store={store}>
      <Navigasi />
      <div className="row row-reverse" style={{ marginTop: '4.2rem' }}>
        <div className="col col-lg-9">
          <Component {...pageProps} />
        </div>
        <div className="col col-lg-3 display-lg-up">
          <Sidebar />
        </div>
      </div>
    </Provider>
  </>)
}

export default MyApp