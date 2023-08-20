import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyUser: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');

        if(!user){
            localStorage.clear();
            navigate("/user/login");
        }
    })

    return ( 
        <></>
    );
}
 
export default VerifyUser;