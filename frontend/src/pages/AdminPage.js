import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

function AdminPage() {

    const auth = useContext(AuthContext)

    return (
        <div>
            <button className="button" onClick={auth.logout}> Log out</button>
        </div>
    );
}

export default AdminPage;
