import React from 'react';
import './css/index.css';
import './css/text.css';
import Scenarios from "./components/Scenarios";
import ScenarioArea from "./components/ScenarioArea";
import FileExplorer from "./components/FileExplorer";

const Home = () => {
    return (
        <div className={"home"}>
            <div style={{width:"100%"}}>
                <Scenarios />
                <ScenarioArea />
            </div>
            <FileExplorer />
        </div>
    );
};

export default Home;