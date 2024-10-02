import React from 'react';
import './css/index.css';
import './css/text.css';
import Scenarios from "./components/Scenarios";
import ScenarioArea from "./components/ScenarioArea";

const Home = () => {
    return (
        <div>
            <Scenarios />
            <ScenarioArea />
        </div>
    );
};

export default Home;