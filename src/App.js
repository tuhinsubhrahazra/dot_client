import './App.css';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboading';
import Onboarding2 from './components/Onboarding2';
import Setup from './components/Setup';
import EditItem from './components/EditItem';
import Profile from './components/Profile';
import ColorChangingCard from './components/ColorChangingCard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<SplashScreen/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/signup" element={<Signup/>} />
                    <Route exact path="/onboarding1" element={<Onboarding/>} />
                    <Route exact path="/onboarding2" element={<Onboarding2/>} />
                    <Route exact path="/Setup" element={<Setup/>} />
                    <Route exact path="/Setup/:type" element={<EditItem/>} />
                    <Route exact path="/:profileName" element={<Profile/>} />
                    <Route exact path='/vkc' element = {<ColorChangingCard/>}/>
                </Routes>
            </div>
        </Router>

    );
}

export default App;
