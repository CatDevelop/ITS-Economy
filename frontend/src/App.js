import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import {WelcomePage} from "./pages/WelcomePage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import RequireUnauth from "./hoc/RequireUnauth";
import {NotFoundPage} from "./pages/NotFoundPage";
import PortfolioLayout from "./components/ProtfolioLayout";
import {ProfilePage} from "./pages/ProfilePage";
import RequireAuth from "./hoc/RequireAuth";
import {TransferPage} from "./pages/TransferPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>


            <Router>
                <Routes>
                    <Route path='/' element={<HomeLayout/>}>
                        <Route index element={
                            <RequireUnauth>
                                <WelcomePage/>
                            </RequireUnauth>}/>
                        <Route path='/registration' element={
                            <RequireUnauth>
                                <RegistrationPage/>
                            </RequireUnauth>}/>
                        <Route path='/authorization' element={
                            <RequireUnauth>
                                <AuthorizationPage/>
                            </RequireUnauth>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                    </Route>

                    <Route path='/profile' element={<PortfolioLayout/>}>
                        <Route index element={
                            <RequireAuth>
                                <ProfilePage/>
                            </RequireAuth>}/>
                    </Route>

                    <Route path='/transfer' element={<PortfolioLayout/>}>
                        <Route index element={
                            <RequireAuth>
                                <TransferPage/>
                            </RequireAuth>}/>
                    </Route>
                </Routes>
            </Router>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />

        </>);
}

export default App;
