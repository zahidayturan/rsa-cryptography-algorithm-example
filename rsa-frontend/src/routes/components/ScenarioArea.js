import React, { useState } from 'react';

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

const ScenarioArea = () => {
    const [activeUsers, setActiveUsers] = useState([]);

    const handleUserClick = (userId) => {
        if (activeUsers.includes(userId)) {
            setActiveUsers(activeUsers.filter(id => id !== userId));
        } else {
            setActiveUsers([...activeUsers, userId]);
        }
    };

    return (
        <div className="scenario-area">
            <p className={"title-text"}><span>Senaryo</span> Alanı</p>
            <div className="custom-row">
                <p className={"italic"} style={{marginRight:12}}>Kullanıcı<br/>Seçim</p>
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`user-button ${activeUsers.includes(user.id) ? 'active' : ''}`}
                        onClick={() => handleUserClick(user.id)}
                    >
                        <img src="/icon/user.png" alt="User Icon" className="mini-icon"
                             style={{
                                 filter: activeUsers.includes(user.id) ? 'brightness(0) invert(1)' : 'none'
                             }}
                        /> {user.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScenarioArea;
