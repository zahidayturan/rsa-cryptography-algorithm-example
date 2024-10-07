import React, {useEffect, useState} from 'react';
import Switch from "./Switch";
import axios from 'axios';
import Modal from "react-modal";
import { openFile } from './api/OpenFile';
import Endpoints from "../../contants/endpoints";

const UserContainer = ({ user, handleUserToggle }) => {
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);


    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.FILE}/info/${user.id}`);
            setFileList(response.data);
        } catch (error) {
            console.error("Dosyalar alınırken hata oluştu:", error);
        }
        setLoading(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
        fetchFiles();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleToggle = (field,newValue) => {
        handleUserToggle(user.id, field,newValue);
    };

    const handleFileChange = (event, userId, recipientId) => {
        setLoading(true);
        const file = event.target.files[0];

        if (file) {
            if (file.size > 256) {
                alert("Dosya boyutu 256 byte'ı geçemez. Lütfen daha küçük bir dosya yükleyin.");
                return;
            }

            console.log("Seçilen dosya:", file);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);
            formData.append('recipientId', recipientId);

            axios.post(Endpoints.FILE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("Dosya başarıyla yüklendi:", response.data);
            })
                .catch(error => {
                    console.error("Dosya yüklenirken hata oluştu:", error);
                });
        } else {
            alert("Lütfen bir dosya seçin.");
        }
        setLoading(false);
    };





    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
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
                    <p className={"x-small-text font-bold"}>{user.publicKey ? user.eKey : "Kapalı"}</p>
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
                    <p className={"x-small-text font-bold"}>{user.privateKey ? user.dKey : "Kapalı"}</p>
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
                        <p className={"x-small-text font-bold"}>
                            {user.fileUpload ? "Açık" : "Kapalı"}
                        </p>
                        <div className={"user-operation-button"}
                             style={{ backgroundColor: user.fileUpload && "rgb(0,176,176)", cursor: user.fileUpload && "pointer" }}
                             onClick={() => document.getElementById(`fileInput-${user.id}`).click()}
                        >
                            Dosya Yükle
                        </div>
                        {user.fileUpload && (
                            <input
                                type="file"
                                id={`fileInput-${user.id}`}
                                accept=".txt,.pdf,.doc,.docx"
                                onChange={(event) => handleFileChange(event, user.id, user.id)}
                                style={{ display: 'none' }}
                            />
                        )}
                    </div>

                </div>
                <div className={"custom-row"} style={{ gap: 0 }}>
                    <Switch
                        isOn={user.readFiles}
                        handleToggle={() => handleToggle("readFiles", !user.readFiles)}
                        id={user.id + "readFiles"}
                    />
                    <div>
                        <p>Dosya Okuma</p>
                        <p className={"x-small-text font-bold"}>{user.readFiles ? "Açık" : "Kapalı"}</p>
                        <div className={"user-operation-button"} style={{backgroundColor: user.readFiles && "rgb(16,64,59)", cursor: user.readFiles && "pointer",}} onClick={user.readFiles ? openModal : null}>
                            Dosya Görüntüle
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Dosyalar">
                        <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                            <h2>{`Kullanıcı Dosyaları : ${user.name}`}</h2>
                            <p onClick={closeModal} style={{cursor:"pointer"}}>Kapat</p>
                        </div>
                        <p style={{marginTop:8,marginBottom:16}}>{fileList.length} adet dosya listelendi</p>
                        {loading ? (<p>Yükleniyor...</p>) : (
                                fileList.map((file) => (
                                    <div key={file.id} style={{backgroundColor:"var(--secondary-color-1)",padding:8,borderRadius:8}}>
                                        <div className={"custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
                                            <div>
                                                <p>{file.originalName}</p>
                                                <p className={"x-small-text"}>{file.size} bayt</p>
                                            </div>
                                            <div
                                                className={"icon-box"}
                                                style={{ backgroundColor: "var(--green-color-1)", cursor: "pointer" }}
                                                onClick={() => openFile(file.name,true)}
                                            >
                                                <img src="/icon/file.png" alt="Open File" className={"mini-icon"} />
                                            </div>
                                        </div>

                                    </div>
                                ))
                        )}

                    </Modal>
                </div>
            </div>
        </div>
        </>
    );
};

const ScenarioArea = () => {
    const [users, setUsers] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${Endpoints.USER}/all`);
                const users = response.data;
                setUsers(users);
            } catch (error) {
                console.log('Kullanıcılar yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };
        if (users === null || users.length === 0) {
            fetchUser();
            console.log(users);
        }
    }, []);


    const handleUserClick = (userId) => {
        if (activeUsers.includes(userId)) {
            setLoading(true);
            setActiveUsers(activeUsers.filter(id => id !== userId));
            setLoading(false);
        } else {
            setLoading(true);
            setActiveUsers([...activeUsers, userId]);
            setLoading(false);
        }
    };

    const updateEKeys = (id, newKey) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id ? { ...user, eKey: newKey} : user
            )
        );
    };

    const updateDKeys = (id, newKey) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id ? { ...user, dKey: newKey} : user
            )
        );
    };

    const handleUserToggle = (userId, field, newValue) => {
        setUsers(users.map(user =>
            user.id === userId
                ? {...user, [field]: !user[field]}
                : user
        ));

        axios.put(`${Endpoints.USER}/${userId}/${field}/${newValue}`)
            .then(response => {
                console.log("Kullanıcı başarıyla güncellendi:", response.data);
            })
            .catch(error => {
                console.error("Kullanıcı güncellenirken hata oluştu:", error);
            });

        if (field === "publicKey") {
            axios.get(`${Endpoints.USER_KEY}/eKey/${userId}`)
                .then(response => {
                    updateEKeys(userId, response.data);
                    console.log("Kullanıcı public key alındı:", response);
                })
                .catch(error => {
                    console.error("Kullanıcı public key alınamadı:", error);
                });
        }
        if (field === "privateKey") {
            axios.get(`${Endpoints.USER_KEY}/dKey/${userId}`)
                .then(response => {
                    updateDKeys(userId, response.data);
                    console.log("Kullanıcı private key alındı:", response);
                })
                .catch(error => {
                    console.error("Kullanıcı private key alınamadı:", error);
                });
        }

    };

    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
            <div className="scenario-area">
                <p className={"title-text"}><span>Senaryo</span> Alanı</p>
                <div className="custom-row">
                    <p className={"italic"} style={{ marginRight: 12 }}>Kullanıcı<br />Seçim</p>
                    {
                        (users !== null && users.length !== 0) ?
                            users.map((user) => (
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
                                )) : (<div>Boş</div>)
                    }

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
