
import { headerLink } from './LandingPageUtils'
import { Link } from "react-router-dom";
function Navitems() {


  return (
      <ul className='flex md:flex-between w-full md:flex-row flex-col gap-8 md:gap-12 items-start'>
      {
        headerLink.map((link,header)=>{
          return(
            <li key={header} className="text-white flex-center  p-medium-16 whitespace-nowrap">
              <Link to={link.href || ""}  className={`${link.className ? link.className : ""}`}>
              {link.title}
              </Link>
            </li>
          )
        })
      }
      </ul>
  )
}

export default Navitems