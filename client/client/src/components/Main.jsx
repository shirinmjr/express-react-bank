import { Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";

function Main({user}) {
    return (
        <div>
            <div className='header-container'>
                <Nav />
            </div>
            <div className='Main'>
                <Routes>
                    <Route path='/' exact={true} element={<Home user={user} />} />

                </Routes>
            </div>
        </div>
    );
}

export default Main;