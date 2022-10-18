import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home';
import { LoanPrediction } from './pages/LoanPrediction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <LoanPrediction/>
      <Footer></Footer>
    </div>
    
  );
}

export default App;
