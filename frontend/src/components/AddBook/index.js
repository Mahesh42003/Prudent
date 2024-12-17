import { useState } from "react"
import axios from "axios"
import { useNavigate,Link,useLocation} from "react-router-dom"
import './index.css'

const AddBook=() => {
    
    const [title,setTitle]=useState("")
    const [authorId,setauthorId]=useState("")
    const [generId,setgenreId]=useState("")
    const [pages,setPages]=useState("")
    const [publishedDate,setpublishedDate]=useState("")
    const [genreName,setgenreName]=useState("")
    const [genreDescription,setgenreDescription]=useState("")
    const [authorName,setAuthorName]=useState("")
    const Location=useLocation()
    const History=useNavigate()

    const settingAuthorId=(Event) =>{
        setauthorId(Event.target.value)
    }
    
    const settingTitle=(Event) => {
        setTitle(Event.target.value)
    }

    const settinggenreId=(Event) => {
        setgenreId(Event.target.value)
    } 

    const settingPages=(Event) => {
        setPages(Event.target.value)
    }

    const settinggenreName=(Event) => {
        setgenreName(Event.target.value)
    }

    const settingpublishedDate=(Event) => {
        setpublishedDate(Event.target.value)
    }

    const settingAuthorName=(Event) => {
        setAuthorName(Event.target.value)
    }

    const settingDescription=(Event) => {
        setgenreDescription(Event.target.value)
    } 

    const submittingBook=async(Event) => {
       
        Event.preventDefault()
        axios.post("http://localhost:3006/register",{
            authorId,title,generId,pages,publishedDate,genreName,genreDescription,authorName
        }).then((res) => {
            if(res.data === "Book Created Successfuly"){
              console.log("Data Sent Successfully")
            }
        })
        History("/")
        setpublishedDate("")
        setAuthorName("")
        setgenreDescription("")
        setgenreName("")
        setPages("")
        setgenreId("")
        setTitle("")
        setauthorId("")
    }
    
    return(
       
        <div className="width-of-form-element">
              <nav className="flexing-of-nav-items">
            <Link to="/" className="text-decoration-of-nav-items">Home</Link>
            <Link to="/contact" className="text-decoration-of-nav-items">Contact</Link>
            <Link to="/about" className="text-decoration-of-nav-items">About</Link>
            <Link to="/add-book" className={Location.pathname === "/add-book"?"current-location":"text-decoration-of-nav-items"}>Add Book</Link>
        </nav>
            <h1>Add Book</h1>
            <form className="flexing-of-form-items" onSubmit={submittingBook}>
            <label htmlFor="authorid">Author ID</label>
            <input type="text" onChange={settingAuthorId} value={authorId} id="authorid"/>
            <label htmlFor="title">Title</label>
            <input type="text" onChange={settingTitle} value={title} id="title"/>
            <label htmlFor="genreid">Genre ID</label>
            <input type="text" onChange={settinggenreId} value={generId} id="genreid"/>
            <label htmlFor="pages">Pages</label>
            <input type="text" onChange={settingPages} value={pages} id="pages"/>
            <label htmlFor="publishedDate">Published Date</label>
            <input type="date" onChange={settingpublishedDate} value={publishedDate} id="publishedDate"/>
            <label htmlFor="genrename">Genre Name</label>
            <input type="text" onChange={settinggenreName} value={genreName} id="genrename"/>
            <label htmlFor="authorname">Author Name</label>
            <input type="text" onChange={settingAuthorName} value={authorName} id="authorname"/>
            <label htmlFor="description">Description</label>
            <textarea rows="16" cols="16" id="description" onChange={settingDescription} value={genreDescription}>
                {genreDescription}
            </textarea>
            <button type="submit" className="add-button-styling">Add</button>
            </form>
        </div>
    )
}
export default AddBook