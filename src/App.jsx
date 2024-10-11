import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
// import Form from './components/form'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './Components/bookList';


function App() {


  return (
    <>
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/bookList" element={<BookList/>}/>
          {/* <Route path="/add" element={<Form />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
