import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
