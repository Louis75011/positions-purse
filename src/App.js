import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Purse.tsx";
// import Home from "./components/Bank.tsx";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;