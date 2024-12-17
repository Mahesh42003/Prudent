import { Link,useLocation} from "react-router-dom"

const Contact=() => {
   const Location=useLocation()
    return(
        <div>
          <nav className="flexing-of-nav-items">
            <Link to="/" className="text-decoration-of-nav-items">Home</Link>
            <Link to="/contact" className={Location.pathname === "/contact"?"current-location":"text-decoration-of-nav-items"}>Contact</Link>
            <Link to="/about" className="text-decoration-of-nav-items">About</Link>
            <Link to="/add-book" className="text-decoration-of-nav-items">Add Book</Link>
         </nav>
          <h1>Contact : +91 1234567890</h1>
          <h2>mail id : mapp@gmail.com</h2>
        </div>
    )
}
export default Contact