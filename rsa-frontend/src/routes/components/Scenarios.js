import React, { useState } from 'react';

const scenarios = [
    { id: 1, text: 'Birinci Senaryo Yazısı' },
    { id: 2, text: 'İkinci Senaryo Yazısı' },
    { id: 3, text: 'Üçüncü Senaryo Yazısı' },
];

const Scenarios = () => {
    const [activeScenario, setActiveScenario] = useState(null);

    return (
        <div className="scenarios">
            <div className="custom-row">
                {scenarios.map((scenario) => (
                    <div
                        key={scenario.id}
                        className={`scenario-button ${activeScenario === scenario.id ? 'active' : ''}`}
                        onClick={() => setActiveScenario(scenario.id)}
                    >
                        <p>Senaryo <span>{scenario.id}</span></p>
                    </div>
                ))}
            </div>
            {activeScenario ? (
                <p>{scenarios.find(scenario => scenario.id === activeScenario)?.text}</p>
            ) : (
                <p>Lütfen bir senaryo seçin</p>
            )}
        </div>
    );
};

export default Scenarios;
