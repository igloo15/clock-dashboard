
import styles from './App.module.css';
import ClockArea from './components/ClockArea';
import ButtonArea from './components/ButtonArea';
import { AppProvider } from './AppContext';




function App() {


  // Empty dependency array means this effect runs only once on mount

  return (
    <AppProvider>
      <div className={styles.contentWrapper}>
        <ClockArea />
        <ButtonArea /> {/* ButtonArea component */}
      </div>
    </AppProvider>

  );
}

export default App;