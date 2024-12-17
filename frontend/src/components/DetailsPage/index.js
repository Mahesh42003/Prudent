import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import './index.css'

const DetailsPage=() => {
    const [data,setdata]=useState("")
    const {id}=useParams() 
    useEffect(() => {
        const gettingParticularData = async () => {
            await axios.get(`http://localhost:3006/books/${id}`).then((res) => {
                setdata(res.data);
            });
        };
        gettingParticularData();
    }, [id]);
   if(data.length !== 0){
    return(
        <div>
        <h1 className="margin-left-of-book">Details of Book</h1>
        <div className="form-of-particular-id">
            
            <h2 >Title : {data[0].Title}</h2>
            <h2>Author : {data[0].AuthorName}</h2>
            <h2>Genre : {data[0].GenreName}</h2>
            <h2>Pages : {data[0].Pages}</h2>
            <h2>Published Date : {data[0].publishedDate}</h2>
        </div>
        </div>
    )
}
    return(
        <h1>Loading...</h1>
    )
}
export default DetailsPage