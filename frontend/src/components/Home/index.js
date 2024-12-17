import { useState,useEffect } from "react"
import {Link,useLocation} from "react-router-dom"
import axios from "axios"
import './index.css'

const Home=() => {
   const [data,setData]=useState("")
   const [searchQuery, setSearchQuery] = useState("");
   const [limit,settingLimit]=useState(2)
   const [offset,settingOffset]=useState(0)
   const [total,setTotal]=useState()
   const Location=useLocation()
   
   useEffect(() => {
   const gettingData=async() => {
      await axios.get(`http://localhost:3006/books?limit=${limit}&offset=${offset}`).then((res) => {
         setData(res.data.books)
         setTotal(res.data.total)
      })
      .catch(e => {
         console.log(e)
      })
   }
   gettingData()
   },[data,limit,offset])


  useEffect(() => {
   const fetchBooks = async () => {
     try {
       const response = await axios.get(`http://localhost:3006/search?q=${searchQuery}`);
       setData(response.data);
     } catch (error) {
       console.error("Error fetching books:", error);
     }
   };

   if (searchQuery) {
     fetchBooks();
   } else {
     setData([]); // Clear results if the search query is empty
   }
 }, [searchQuery]);


   
  const clickingOnButton=(Event) => {
    const offset=Math.ceil((Event.target.textContent * 2)-2)
    settingOffset(offset)
  }
   
  
   if(data.length !== 0){
      const values=[]
      const lengthofdata=Math.ceil(total/2)
      for (let i=1;i<=lengthofdata;i=i+1){
         values.push(i)
      } 
      
    return(
       <div>
         <nav className="flexing-of-nav-items">
            <Link to="/" className={Location.pathname === "/"?"current-location":"text-decoration-of-nav-items"}>Home</Link>
            <Link to="/contact" className="text-decoration-of-nav-items">Contact</Link>
            <Link to="/about" className="text-decoration-of-nav-items">About</Link>
            <Link to="/add-book" className="text-decoration-of-nav-items">Add Book</Link>
         </nav>
         <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

         <h1 className="alignment-of-list-of-books-heading">List Of Books</h1>
         <table className="width-of-table">

         <tr>
            <th>SI.NO</th>
            <th>Book ID</th>
            <th>Title</th>
            <th>Actions</th>
         </tr>
          {
            data.map((each,index) => 
            {
               const {BookID}=each
            
               const clickingDelete=async() => {
                  await axios.delete(`http://localhost:3006/delete/${BookID}`).then((res) => {
                     if(res.data === "Data Deleted Successfully"){
                        alert("Book Has Been Deleted Successfully")
                     }
                  })
               }

               return(
                  <tr key={each.BookID}> 
                  <td>{index+1}</td>
                  <td>{each.BookID}</td>
                  <td>{each.Title}</td>
                  
                  <td className="flexing-of-td-tag">
                  <Link to={`/edit-book/${each.BookID}`}><button className="edit-button-styling">Edit</button></Link>
                  <button onClick={clickingDelete} className="delete-button-styling">Delete</button>
                  <Link to={`details-page/${each.BookID}`}><button className="view-details-buttton">View Details</button></Link>
                  </td>
               </tr>
               )
            }
            )
          }
         </table>
         {
            values.map(each => <button onClick={clickingOnButton} className="margin-left-of-pagination">{each}</button>)
         }
       </div>
    )
   }
   return(
      <div>
      <nav className="flexing-of-nav-items">
         <Link to="/" className="text-decoration-of-nav-items">Home</Link>
         <Link to="/contact" className="text-decoration-of-nav-items">Contact</Link>
         <Link to="/about" className="text-decoration-of-nav-items">About</Link>
         <Link to="/add-book" className="text-decoration-of-nav-items">Add Book</Link>
      </nav>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h1 className="alignment-of-list-of-books-heading">List Of Books</h1>
      <h1 className="alignment-of-list-of-books-heading">No Books Present</h1>
    </div>
   )
} 
export default Home