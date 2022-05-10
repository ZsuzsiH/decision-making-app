import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {useAppSelector} from "./store/store";

function App() {

    const step = useAppSelector(state => state.app.step);

    return (
        <div className="App">
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home stepNumber={step}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
