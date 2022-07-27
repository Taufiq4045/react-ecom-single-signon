import "./Screen.css";
import { useAuth } from "../../context";
import { Navigate, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../Loader";
import { useScreenContext } from "../../context/screen-context";

export const Screen = () => {
  const navigate = useNavigate();
  const { seller, buyer } = useScreenContext();  
  const { authState } = useAuth();
  

  const merchant = () => {
     seller('Merchant Account');
     navigate("/");
  }

  const customer = () => {
    buyer('Customer Account');  
    navigate("/");
 }


  
  return (
    <div>
       {authState.isLoggedIn ? (
           <>
                {authState.loading && <Loader />}
                <div className="screen-container">
                  <h3 className="screen-title">User Screen Selection</h3>
                  <div className="screen-buttons">
                      <button className="auth-btn" onClick={merchant}>Merchant Account</button>
                      <button className="auth-btn" onClick={() => customer()}>Customer Account</button>
                  </div>
                </div>
            </>
        ) : (
        <Navigate to="/Login" /> 
        )}
    </div>
  );
};