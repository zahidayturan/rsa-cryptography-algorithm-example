import React, {useEffect, useState} from 'react';
import Switch from "./Switch";
import axios from 'axios';
import Modal from "react-modal";
import { openFile } from './api/OpenFile';
import Endpoints from "../../contants/endpoints";
import { toast } from "react-toastify";

const UserContainer = ({ userId }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [isSpyModalOpen, setIsSpyModalOpen] = useState(false);
    const [readFileList, setReadFileList] = useState([]);
    const [receiveFileList, setReceiveFileList] = useState([]);
    const [spyFileList, setSpyFileList] = useState([]);
    const [recipientId, setRecipientId] = useState(null);
    const [isUserSelectModalOpen, setIsUserSelectModalOpen] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.USER}/${userId}`);
            const user = response.data;
            setUser(user);
        } catch (error) {
            console.log('Kullanıcılar yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user === null){
            fetchUser();
        }
    }, );

    const handleToggle = (field, newValue) => {
        axios.put(`${Endpoints.USER}/${user.id}/${field}/${newValue}`)
            .then(response => {
                fetchUser();
                console.log("Kullanıcı başarıyla güncellendi:", response.data);
            })
            .catch(error => {
                console.error("Kullanıcı güncellenirken hata oluştu:", error);
            });
    };


    const fetchReadFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.FILE}/owner/${user.id}`);
            setReadFileList(response.data);
        } catch (error) {
            console.error("Dosyalar alınırken hata oluştu:", error);
        }
        setLoading(false);
    };

    const fetchReceiveFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.FILE}/recipient/${user.id}`);
            setReceiveFileList(response.data);
        } catch (error) {
            console.error("Dosyalar alınırken hata oluştu:", error);
        }
        setLoading(false);
    };

    const fetchSpyFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.FILE}/all`);
            setSpyFileList(response.data);
        } catch (error) {
            console.error("Dosyalar alınırken hata oluştu:", error);
        }
        setLoading(false);
    };

    const openReadModal = () => {
        setIsReadModalOpen(true);
        fetchReadFiles();
    };

    const closeReadModal = () => {
        setIsReadModalOpen(false);
    };

    const openReceiveModal = () => {
        setIsReceiveModalOpen(true);
        fetchReceiveFiles();
    };

    const closeReceiveModal = () => {
        setIsReceiveModalOpen(false);
    };

    const openUserSelectModal = () => setIsUserSelectModalOpen(true);

    const closeUserSelectModal = () => {
        setIsUserSelectModalOpen(false);
        setRecipientId(null);
    };

    const openSpyModal = () => {
        setIsSpyModalOpen(true);
        fetchSpyFiles();
    };

    const closeSpyModal = () => {
        setIsSpyModalOpen(false);
    };


    const handleFileChange = (event, userId, recipientId) => {
        setLoading(true);
        const file = event.target.files[0];
        if (file) {
            if (file.size > 512) {
                toast.error("Dosya boyutu 512 byte'ı geçemez. Lütfen daha küçük bir dosya yükleyin.");
                setLoading(false);
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
                toast.success("Dosya başarıyla yüklendi");
                console.log("Dosya başarıyla yüklendi:", response.data);
            })
                .catch(error => {
                    toast.error("Dosya yüklenemedi");
                    console.error("Dosya yüklenirken hata oluştu:", error);
                });
        } else {
            toast.error("Dosya seçmediniz");
        }
        setLoading(false);
    };

    const handleUserSelectForRecipient = (event, userId) => {
        setLoading(true);
        const file = event.target.files[0];
        if (file) {
            if (file.size > 512) {
                toast.error("Dosya boyutu 512 byte'ı geçemez. Lütfen daha küçük bir dosya yükleyin.");
                setLoading(false);
                return;
            }

            if (!recipientId) {
                toast.error("Göndereceğiniz kişiyi seçmediniz.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);
            formData.append('recipientId', recipientId);

            axios.post(Endpoints.FILE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                toast.success("Dosya başarıyla yüklendi");
                console.log("Dosya başarıyla yüklendi:", response.data);
                closeUserSelectModal();
            }).catch(error => {
                toast.error("Dosya yüklenemedi");
                console.error("Dosya yüklenirken hata oluştu:", error);
            });
        } else {
            toast.error("Dosya seçmediniz");
        }
        setLoading(false);
    };

    const handleRecipientSelect = (id) => {
        setRecipientId(id);
    };


    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
            {(user != null && (
                <div className={"user-container"}>
                    <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                        <p className={"font-bold"} style={{ color: "var(--orange-color-1)" }}>{user.name}</p>
                        {(userId === 3 && user.fileRead && user.fileReceive) && <p><div
                            className={"icon-box"}
                            style={{ backgroundColor: "var(--red-color-1)", cursor: "pointer" }}
                            onClick={openSpyModal}
                        >
                            <img src="/icon/hacker.png" alt="Open Spy Menu" className={"mini-icon"} />
                        </div></p>}
                        {isSpyModalOpen && (
                            <Modal isOpen={isSpyModalOpen} onRequestClose={closeSpyModal} contentLabel="Casus Menüsü" ariaHideApp={false}>
                                <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                                    <h2>{`Bütün Dosyalar`}</h2>
                                    <p onClick={closeSpyModal} style={{cursor:"pointer"}}>Kapat</p>
                                </div>
                                <p style={{marginTop:8,marginBottom:16}}>{spyFileList.length} adet dosya listelendi</p>
                                {loading ? (<p>Yükleniyor...</p>) : (
                                    spyFileList.map((file) => (
                                        <div key={file.id} style={{backgroundColor:"var(--secondary-color-1)",padding:8,borderRadius:8,marginBottom:8}}>
                                            <div className={"custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
                                                <div>
                                                    <p>{file.originalName}</p>
                                                    <p className={"x-small-text"}>{file.size} bayt</p>
                                                    <p className={"x-small-text"}>{file.ownerId === 1 ? "Bu dosyayı Alice yükledi" : file.ownerId === 2 ? "Bu dosyayı Bob yükledi" : "Bu dosyayı Charlie yükledi"}</p>
                                                    <p className={"x-small-text"}>{file.recipientId === 1 ? "Bu dosya Alice için yüklendi" : file.recipientId === 2 ? "Bu dosya Bob için yüklendi" : "Bu dosya Charlie için yüklendi"}</p>
                                                </div>
                                                <div
                                                    className={"icon-box"}
                                                    style={{ backgroundColor: "var(--green-color-1)", cursor: "pointer" }}
                                                    onClick={() => openFile(file.name,userId)}
                                                >
                                                    <img src="/icon/file.png" alt="Open File" className={"mini-icon"} />
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            </Modal>
                        )}
                    </div>
                    <div className={"custom-row"} style={{gap:0}}>
                        <Switch
                            isOn={user.publicKey}
                            handleToggle={() => handleToggle('publicKey',!user.publicKey)}
                            id={user.id+"publicKey"}
                        />
                        <div>
                            <p>Açık Anahtar</p>
                            <p className={"x-small-text font-bold"}>{user.publicKey ? user.EKey === null ? "Bekleniyor" : "Hazır" : "Kapalı"}</p>
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
                            <p className={"x-small-text font-bold"}>{user.privateKey ? user.Dkey === null ? "Bekleniyor" : "Hazır" : "Kapalı"}</p>
                        </div>
                    </div>

                    <div className={"custom-row wrap-row wrap-gap"}>
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
                                isOn={user.fileRead}
                                handleToggle={() => handleToggle("fileRead", !user.fileRead)}
                                id={user.id + "fileRead"}
                            />
                            <div>
                                <p>Dosya Okuma</p>
                                <p className={"x-small-text font-bold"}>{user.fileRead ? "Açık" : "Kapalı"}</p>
                                <div className={"user-operation-button"} style={{backgroundColor: user.fileRead && "rgb(16,64,59)", cursor: user.fileRead && "pointer",}} onClick={user.fileRead ? openReadModal : null}>
                                    Dosya Görüntüle
                                </div>
                            </div>
                            <Modal isOpen={isReadModalOpen} onRequestClose={closeReadModal} contentLabel="Dosyalar" ariaHideApp={false}>
                                <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                                    <h2>{`Kullanıcı Dosyaları : ${user.name}`}</h2>
                                    <p onClick={closeReadModal} style={{cursor:"pointer"}}>Kapat</p>
                                </div>
                                <p style={{marginTop:8,marginBottom:16}}>{readFileList.length} adet dosya listelendi</p>
                                {loading ? (<p>Yükleniyor...</p>) : (
                                    readFileList.map((file) => (
                                        <div key={file.id} style={{backgroundColor:"var(--secondary-color-1)",padding:8,borderRadius:8,marginBottom:8}}>
                                            <div className={"custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
                                                <div>
                                                    <p>{file.originalName}</p>
                                                    <p className={"x-small-text"}>{file.size} bayt</p>
                                                    <p className={"x-small-text"}>{file.recipientId === userId ? "Bu dosyayı kendiniz için yüklediniz" :
                                                         <p className={"x-small-text"} style={{fontStyle:"italic"}}>{file.recipientId === 1 ? "Bu dosyayı Alice için yüklediniz" : file.recipientId === 2 ? "Bu dosyayı Bob için yüklediniz" : "Bu dosyayı Charlie için yüklediniz" }</p>}</p>
                                                </div>
                                                <div
                                                    className={"icon-box"}
                                                    style={{ backgroundColor: "var(--green-color-1)", cursor: "pointer" }}
                                                    onClick={() => openFile(file.name,file.ownerId)}
                                                >
                                                    <img src="/icon/file.png" alt="Open File" className={"mini-icon"} />
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            </Modal>
                        </div>
                        <div className={"custom-row"} style={{gap:0}}>
                            <Switch
                                isOn={user.fileSend}
                                handleToggle={() => handleToggle('fileSend',!user.fileSend)}
                                id={user.id+"fileSend"}
                            />
                            <div>
                                <p>Dosya Gönderme</p>
                                <p className={"x-small-text font-bold"}>
                                    {user.fileSend ? "Açık" : "Kapalı"}
                                </p>
                                <div className={"user-operation-button"}
                                     style={{ backgroundColor: user.fileSend && "rgb(175,191,54)", cursor: user.fileSend && "pointer" }}
                                     onClick={openUserSelectModal}
                                >
                                    Dosya Gönder
                                </div>

                                {isUserSelectModalOpen && (
                                    <Modal isOpen={isUserSelectModalOpen} onRequestClose={closeUserSelectModal} contentLabel="Users" ariaHideApp={false}>
                                        <div className={"custom-row"} style={{ justifyContent: "space-between" }}>
                                            <h3>Gönderilecek dosyayı ve kime gönderileceğini seçiniz</h3>
                                            <p onClick={closeUserSelectModal} style={{ cursor: "pointer" }}>Kapat</p>
                                        </div>
                                        <div className={"custom-row"} style={{marginTop:8,marginBottom:8}}>
                                            {user.name !== "Alice" && (
                                                <p className={"user-button"} onClick={() => handleRecipientSelect(1)} style={{ backgroundColor: recipientId === 1 ? "green" : null,width:"max-content"}}>Alice</p>
                                            )}
                                            {user.name !== "Bob" && (
                                                <p className={"user-button"} onClick={() => handleRecipientSelect(2)} style={{ backgroundColor: recipientId === 2 ? "green" : null,width:"max-content"}}>Bob</p>
                                            )}
                                            {user.name !== "Charlie" && (
                                                <p className={"user-button"} onClick={() => handleRecipientSelect(3)} style={{ backgroundColor: recipientId === 3 ? "var(--green-color-1)" : null,width:"max-content"}}>Charlie</p>
                                            )}
                                        </div>
                                        {recipientId && (
                                            <input
                                                type="file"
                                                id={`fileSend-${user.id}`}
                                                accept=".txt,.pdf,.doc,.docx"
                                                onChange={(event) => handleUserSelectForRecipient(event, user.id)}
                                            />
                                        )}
                                    </Modal>
                                )}

                            </div>

                        </div>
                        <div className={"custom-row"} style={{ gap: 0 }}>
                            <Switch
                                isOn={user.fileReceive}
                                handleToggle={() => handleToggle("fileReceive", !user.fileReceive)}
                                id={user.id + "fileReceive"}
                            />
                            <div>
                                <p>Dosya Alma</p>
                                <p className={"x-small-text font-bold"}>{user.fileReceive ? "Açık" : "Kapalı"}</p>
                                <div className={"user-operation-button"} style={{backgroundColor: user.fileReceive && "rgb(134,149,11)", cursor: user.fileReceive && "pointer",}} onClick={user.fileReceive ? openReceiveModal : null}>
                                    Dosya Al
                                </div>
                            </div>
                            <Modal isOpen={isReceiveModalOpen} onRequestClose={closeReceiveModal} contentLabel="Dosyalar" ariaHideApp={false}>
                                <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                                    <h2>{`${user.name} Kullanıcısına Gelen Dosyalar`}</h2>
                                    <p onClick={closeReceiveModal} style={{cursor:"pointer"}}>Kapat</p>
                                </div>
                                <p style={{marginTop:8,marginBottom:16}}>{receiveFileList.length} adet dosya listelendi</p>
                                {loading ? (<p>Yükleniyor...</p>) : (
                                    receiveFileList.map((file) => (
                                        <div key={file.id} style={{backgroundColor:"var(--secondary-color-1)",padding:8,borderRadius:8,marginBottom:8}}>
                                            <div className={"custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
                                                <div>
                                                    <p>{file.originalName}</p>
                                                    <p className={"x-small-text"}>{file.size} bayt</p>
                                                    <p className={"x-small-text"} style={{fontStyle:"italic"}}>{file.ownerId === 1 ? "Bu dosyayı Alice gönderdi" : file.ownerId === 2 ? "Bu dosyayı Bob gönderdi" : "Bu dosyayı Charlie gönderdi" }</p>
                                                </div>
                                                <div
                                                    className={"icon-box"}
                                                    style={{ backgroundColor: "var(--green-color-1)", cursor: "pointer" }}
                                                    onClick={() => openFile(file.name,file.recipientId)}
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
            ))}
        </>
    );
};

const ScenarioArea = () => {
    const [users, setUsers] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        if (users === null || users.length === 0) {
            fetchUser();
            console.log(users);
        }
    }, );


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
    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
            <div className="scenario-area">
                <p className={"title-text"}><span>Senaryo</span> Alanı</p>
                <div className="custom-row wrap-row">
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
                                        userId={user.id}
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