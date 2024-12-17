import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './components/About'
import AddBook from './components/AddBook'
import Contact from './components/Contact'
import Home from './components/Home'
import EditName from './components/EditName'
import DetailsPage from './components/DetailsPage'

const App=() =>{
  return(
    <BrowserRouter>
    <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/about" element={<About/>}/>
       <Route exact path='/contact' element={<Contact/>}/>
       <Route exact path="/add-book" element={<AddBook/>}/>
       <Route exact path="/edit-book/:id" element={<EditName/>}/>
       <Route exact path="/details-page/:id" element={<DetailsPage/>}/>
       </Routes>
    </BrowserRouter>
  )
} 
export default App 