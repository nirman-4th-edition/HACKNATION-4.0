import { useContext } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import { AuthContext } from "./Context/AuthContext.jsx"
import { intermediate } from "./utils.jsx"
import { useEffect } from "react"
const RefreshHandler = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {isAuthenticated} = useContext(AuthContext)
    useEffect(() => {
       if(isAuthenticated){
        if(location.pathname === '/login' || location.pathname=== '/signup'){
            intermediate("Pls Logout first")
            navigate('/')
        }
       }
    }, [location.pathname,isAuthenticated,navigate])
    
  return (
    null
  )
}

export default RefreshHandler