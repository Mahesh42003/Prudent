import { Link,useLocation} from "react-router-dom"

const About=() => {
   const Location=useLocation()
   return(
   <div>
    <nav className="flexing-of-nav-items">
      <Link to="/" className="text-decoration-of-nav-items">Home</Link>
      <Link to="/contact" className="text-decoration-of-nav-items">Contact</Link>
      <Link to="/about" className={Location.pathname === "/about"?"current-location":"text-decoration-of-nav-items"}>About</Link>
      <Link to="/add-book" className="text-decoration-of-nav-items">Add Book</Link>
   </nav>
    <h1>This Website is all about Books.</h1>
  </div>
   )
}
export default About