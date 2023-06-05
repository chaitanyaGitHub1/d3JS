import AgePieChart from './components/AgepieChart.js';
import BarChart from './components/BarChart.js';
import LineChart from './components/LineChart.js';
import USChart from './components/USChart.js';

import './App.css';

function ChartCard({ children }) {
  return (
    <div
      style={{
        maxWidth: '45vw',
        width: '100%',
        height: 'fit-content',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <section className='container'>
      <div className='grid-container'>
        <ChartCard>
          <LineChart />
        </ChartCard>
        <ChartCard>
          <BarChart />
        </ChartCard>
        <ChartCard>
          <USChart />
        </ChartCard>
        <ChartCard>
          <AgePieChart />
        </ChartCard>
      </div>
    </section>
  );
}

export default App;
