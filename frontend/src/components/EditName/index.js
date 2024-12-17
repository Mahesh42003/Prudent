import { useState } from "react"
import { useParams,useNavigate} from "react-router-dom"
import axios from "axios"
import './index.css'

const EditName=() => {
    const {id}=useParams()
    const [title,setTitle]=useState("")
    const [pages,setPages]=useState("")
    const [publishedDate,setpublishedDate]=useState("")
    const History=useNavigate()

    
    
    const settingTitle=(Event) => {
        setTitle(Event.target.value)
    }

  

    const settingPages=(Event) => {
        setPages(Event.target.value)
    }

   
    const settingpublishedDate=(Event) => {
        setpublishedDate(Event.target.value)
    }

  

    const submittingBook=async(Event) => {
        Event.preventDefault()
        axios.put(`http://localhost:3006/edit/${id}`,{
           title,pages,publishedDate
        }).then((res) => {
            if(res.data !== undefined){
                alert("Book Updated Successfully")
            }
        })
        History("/")
        setpublishedDate("")
        setPages("")
        
        setTitle("")
        
    }

    return(
        <div className="width-of-form-element">
            <h1>Edit Book</h1>
            <form className="flexing-of-form-items" onSubmit={submittingBook}>
            <label htmlFor="title">Title</label>
            <input type="text" onChange={settingTitle} value={title} id="title"/>
            <label htmlFor="pages">Pages</label>
            <input type="text" onChange={settingPages} value={pages} id="pages"/>
            <label htmlFor="publishedDate">Published Date</label>
            <input type="date" onChange={settingpublishedDate} value={publishedDate} id="publishedDate"/>
            <button type="submit" className="add-button-styling">Save Changes</button>
            </form>
        </div>
    )
}
export default EditName