import React, { useState } from 'react';
import Switch from "./Switch";
import axios from 'axios';
import Endpoints from "../../contants/endpoints";

const initialUsers = [
    { id: 1, name: 'Alice', publicKey: false, privateKey: false, fileUpload: false, readFiles: false, fileSend: false,fileReceive: false, eKey: "...", dKey:"..." },
    { id: 2, name: 'Bob', publicKey: false, privateKey: false, fileUpload: false, readFiles: false,fileSend: false,fileReceive: false, eKey: "...", dKey:"..." },
    { id: 3, name: 'Charlie', publicKey: false, privateKey: false, fileUpload: false, readFiles: false,fileSend: false,fileReceive: false, eKey: "...", dKey:"..." },
];

const UserContainer = ({ user, handleUserToggle }) => {
    const handleToggle = (field,newValue) => {
        handleUserToggle(user.id, field,newValue);
    };

    return (
        <div className={"user-container"}>
            <p className={"font-bold"} style={{ color: "var(--orange-color-1)" }}>{user.name}</p>

            <div className={"custom-row"} style={{gap:0}}>
                <Switch
                    isOn={user.publicKey}
                    handleToggle={() => handleToggle('publicKey',!user.publicKey)}
                    id={user.id+"publicKey"}
                />
                <div>
                    <p>Açık Anahtar</p>
                    <p className={"small-text"}>{user.publicKey ? user.eKey : "Kapalı"}</p>
                    <p></p>
                </div>
            </div>

            <div className={"custom-row"} style={{gap:0}}>
                <Switch
                    isOn={user.privateKey}
                    handleToggle={() => handleToggle('privateKey',!user.privateKey)}
                    id={user.id+"privateKey"}
                />
                <div>
                    <p>Kapalı Anahtar</p>
                    <p className={"small-text"}>{user.privateKey ? user.dKey : "Kapalı"}</p>
                    <p></p>
                </div>
            </div>

            <div className={"custom-row"} style={{gap:36}}>
                <div className={"custom-row"} style={{gap:0}}>
                    <Switch
                        isOn={user.fileUpload}
                        handleToggle={() => handleToggle('fileUpload',!user.fileUpload)}
                        id={user.id+"fileUpload"}
                    />
                    <div>
                        <p>Dosya Yükleme</p>
                        <p className={"small-text"}>{user.fileUpload ? user.fileUpload : "Kapalı"}</p>
                        <p></p>
                    </div>
                </div>
                <div className={"custom-row"} style={{gap:0}}>
                    <Switch
                        isOn={user.readFiles}
                        handleToggle={() => handleToggle('readFiles',!user.readFiles)}
                        id={user.id+"readFiles"}
                    />
                    <div>
                        <p>Dosya Okuma</p>
                        <p className={"small-text"}>{user.readFiles ? user.readFiles : "Kapalı"}</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScenarioArea = () => {
    const [users, setUsers] = useState(initialUsers);
    const [activeUsers, setActiveUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleUserClick = (userId) => {
        if (activeUsers.includes(userId)) {
            setLoading(true);
            setActiveUsers(activeUsers.filter(id => id !== userId));
            axios.delete(`${Endpoints.USER}/${userId}`)
                .then(response => {
                    console.log("Kullanıcı başarıyla silindi:", response.data);
                })
                .catch(error => {
                    console.error("Kullanıcı silinirken hata oluştu:", error);
                });
            setLoading(false);
        } else {
            setLoading(true);
            const user = users.find(u => u.id === userId);
            setActiveUsers([...activeUsers, userId]);

            axios.post(Endpoints.USER, {
                id: user.id,
                name: user.name,
                publicKey: user.publicKey,
                privateKey: user.privateKey,
                fileUpload: user.fileUpload,
                fileRead: user.readFiles,
                fileSend: user.fileSend,
                fileReceive: user.readFiles,
                eKey: user.eKey,
                dKey: user.dKey
            })
                .then(response => {
                    console.log("Kullanıcı başarıyla eklendi:", response.data);
                })
                .catch(error => {
                    console.error("Kullanıcı eklenirken hata oluştu:", error);
                });
            setLoading(false);
        }
    };

    const handleUserToggle = (userId, field,newValue) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, [field]: !user[field] }
                : user
        ));

        axios.put(`http://localhost:8080/user/${userId}/${field}/${newValue}`)
            .then(response => {
                console.log("Kullanıcı başarıyla güncellendi:", response.data);
            })
            .catch(error => {
                console.error("Kullanıcı güncellenirken hata oluştu:", error);
            });
    };

    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
            <div className="scenario-area">
                <p className={"title-text"}><span>Senaryo</span> Alanı</p>
                <div className="custom-row">
                    <p className={"italic"} style={{ marginRight: 12 }}>Kullanıcı<br />Seçim</p>
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
                {
                    activeUsers
                        .sort((a, b) => a - b)
                        .map((id) => {
                            const user = users.find(user => user.id === id);
                            return (
                                <div key={id}>
                                    <UserContainer
                                        user={user}
                                        handleUserToggle={handleUserToggle}
                                    />
                                </div>
                            );
                        })
                }
            </div>
        </>
    );
};

export default ScenarioArea;
