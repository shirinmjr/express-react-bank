import { Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./Home";
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import Footer from "./common/Footer";


function Main({ user }) {
    return (
        <div>
            <div className='navbar'>
                <Nav />
            </div>
            {user ? (
                <div className='routes-container'>
                    <Routes>
                        <Route path='/' exact={true} element={<Home user={user} />} />
                        <Route path='/about' exact={true} element={<AboutPage />} />
                        <Route path='/accounts/:acc' exact={true} element={<AccountPage />} />
                    </Routes>
                </div>
            ) : (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            )}
            <div className='footer'><Footer /></div>
        </div>
    );
}

export default Main;