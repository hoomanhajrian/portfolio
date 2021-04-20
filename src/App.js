import { makeStyles } from '@material-ui/core/styles';
import './normalizer.css';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'

const useStyles = makeStyles({
  app: {

  }
});

function App() {
  const styles = useStyles();
  return (
    <div className={styles.app}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
