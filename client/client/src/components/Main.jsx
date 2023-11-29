import { Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";

function Main() {
    return (
        <div>
            <div className='header-container'>
                <Nav />
            </div>
            <div className='Main'>
                <Routes>
                    <Route path='/' exact={true} element={<Home />} />

                </Routes>
            </div>
        </div>
    );
}

export default Main;