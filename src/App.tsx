import CountersList from './components/CountersList/model/CountersList';

function App() {
  return (
    <div className="counters">
      <h1 className="counters__title">Список счётчиков</h1>
      <CountersList />
    </div>
  );
}

export default App;
