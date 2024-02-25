import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { getCartDatabyUseridAsync } from "../../Redux-rtk/Slice/CartSlice/CartSlice";
const Navbar = ({ checkadmin, checkAdminuser, checkuser, checkuserlog }) => {
  const dispatch = useDispatch()
  const cart=useSelector((state) => state.cart.usercardlist)
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    homeLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    menuClass: "",
  });
  const logoutuser = () => {
    localStorage.removeItem("user")
    
    const userdata = localStorage.getItem("user")
    const user = JSON.parse(userdata)
    dispatch(getCartDatabyUseridAsync(user?.id))
    checkuserlog()

  }
  useEffect(() => {
    const userdata = localStorage.getItem("user")
    const user = JSON.parse(userdata)
    if (user) {
      dispatch(getCartDatabyUseridAsync(user.id))
    }
  }, [dispatch])

  const adminLogout = () => {
    localStorage.removeItem("adminuser")
    checkAdminuser()
  }
 


  const toggleMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menu: !prevState.menu,
    }));
  };

  const show = state.menu ? "show" : "";
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <button
        className="navbar-toggler menu-btn"
        type="button"
        onClick={toggleMenu}
        style={{ marginRight: "10px" }}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <Link className="navbar-brand n-name" to="/">
      Shopify
      </Link>

      <div className={`collapse navbar-collapse navbarLink ${show}`} id="n-links">
        <div className="navbar-nav link-holder">
        <Link
            className="nav-item nav-link N-link"
            to="/"
          >
            Home
          </Link>
          {
            checkadmin ? <span className="nav-item nav-link N-link" onClick={adminLogout}>Logout</span> :
              <Link
                className="nav-item nav-link N-link"
                to="/adminlogin"
              >
                Admin Login
              </Link>
          }
          {
            checkadmin ? <Link
              className="nav-item nav-link N-link"
              to="/Addproduct"
            >
              Add Product
            </Link> : null
          }
          {
            checkadmin ? <Link
              className="nav-item nav-link N-link"
              to="/admin"
            >
              Admin
            </Link> : null
          }


          {
            checkadmin ? null : <Link
              className="nav-item nav-link N-link"
              to="/cart"
            >
              Cart({cart.length})
            </Link>
          }
          {
            checkuser ?  <Link
              className="nav-item nav-link N-link"
              to="/myorders"
            >
              My Orders
            </Link>  :null
          }



          {
            checkadmin ? null : checkuser ?
              <span className="nav-item nav-link N-link me-4 cursor-pointer" onClick={logoutuser}>Logout</span>
              :
              <Link
                className="nav-item nav-link N-link me-4"
                to="/login"
              >
                Login
              </Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar