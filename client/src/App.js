import './App.css';
import MacronutrientCalculator from './components/Calculator';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <MacronutrientCalculator />
      </Layout>
    </div>
  );
}

export default App;
