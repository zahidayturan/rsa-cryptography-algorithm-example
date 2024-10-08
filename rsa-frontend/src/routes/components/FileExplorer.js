import React, {useEffect, useState} from 'react';
import axios from "axios";
import {openFile} from "./api/OpenFile";
import Endpoints from "../../contants/endpoints";

const FileContainer = ({ owner, fileName, size, id }) => (
    <div key={id} className={"file-container custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
        <div>
            <p className={"font-bold"}>{owner === 1 ? "Alice" : owner === 2 ? "Bob" : "Charlie" }</p>
            <p>{fileName}</p>
            <p className={"x-small-text"}>{size}</p>
        </div>
        <div className={"custom-row"} style={{gap:8}}>
            <div className={"custom-column"}>
                <div className={"icon-box"} style={{backgroundColor:"var(--orange-color-1)"}} onClick={() => openFile(fileName,false)}>
                    <img src="/icon/file.png" alt="Open File" className={"mini-icon"}/>
                </div>
                <p className={"x-small-text"}>Şifreli</p>
            </div>
            <div className={"custom-column"}>
                <div className={"icon-box"} style={{backgroundColor:"var(--green-color-1)"}} onClick={() => openFile(fileName,true)}>
                    <img src="/icon/file.png" alt="Open File" className={"mini-icon"}/>
                </div>
                <p className={"x-small-text"}>Şifresiz</p>
            </div>
            <div className={"custom-column"}>
                <div className={"icon-box"} style={{backgroundColor:"var(--red-color-1)"}}>
                    <img src="/icon/bin.png" alt="Remove File" className={"mini-icon"}/>
                </div>
                <p className={"x-small-text"}>Sil</p>
            </div>

        </div>
    </div>
);

const FileExplorer = () => {

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);

    const clean = () => {
        axios.get(`${Endpoints.USER}/clean`)
            .then(response => {
                console.log("Hey şey başarıyla silindi:", response.data);
            })
            .catch(error => {
                console.error("Her şey silinirken hata oluştu:", error);
            });
        window.location.reload();
    };

    const fetchFiles = async () => {
        console.log("Dosyalar alınıyor...");
        setLoading(true);
        try {
            const response = await axios.get(`${Endpoints.FILE}/all`);
            setFiles(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            console.log("Dosya alınma bitti...");
        }
    };

    useEffect(() => {
        fetchFiles();
        getKey()
        /*
        const intervalId = setInterval(() => {
            fetchFiles();
        }, 10000);

        return () => clearInterval(intervalId);
         */
    }, []);


    const getKey = async () => {
        setLoading(true);
        try {
            const publicResponse =  await axios.get(`${Endpoints.KEY}/public`, {
                responseType: "text",
            });
            setPublicKey(publicResponse.data);
            const privateResponse =  await axios.get(`${Endpoints.KEY}/private`, {
                responseType: "text",
            });
            setPrivateKey(privateResponse.data);
        } catch (error) {
            console.error("Abahtar alınırken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
            <div className="file-explorer">
                <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                    <p className={"title-text"}><span>Dosya</span> Gezgini</p>
                    <p onClick={fetchFiles} style={{cursor:"pointer"}}>Yenile</p>
                </div>
                {
                    (files != null && files.length !== 0) ?
                        files.map((file) => (
                            <FileContainer key={file.id} owner={file.ownerId} fileName={file.name} size={`${file.size} bayt`} id={file.id} />
                        )) : <div style={{color:"white",textAlign:"center",padding:"12px 0",backgroundColor:"black",borderRadius:8,fontSize:14}}>Dosya yüklenmemiş</div>

                }
                <div className={"custom-row"}>
                    <img src="/icon/public.png" alt="" className={"mid-icon"} />
                    <div>
                        <p style={{ color: "var(--orange-color-1)" }}>Geçerli <span>Açık Anahtar</span></p>
                        <p className={"small-text"} style={{ wordBreak: "break-all" }}>
                            {publicKey == null ? "Anahtar Bekleniyor" : publicKey}
                        </p>
                    </div>
                </div>
                <div className={"custom-row"}>
                    <img src="/icon/private.png" alt="" className={"mid-icon"}/>
                    <div>
                        <p style={{color: "var(--yellow-color-1)"}}>Geçerli <span>Kapalı Anahtar</span></p>
                        <p className={"small-text"} style={{ wordBreak: "break-all" }}>
                            {privateKey == null ? "Anahtar Bekleniyor" : privateKey}
                        </p>
                    </div>
                </div>
                <div className={"remove-button"} onClick={clean}>
                    <img src="/icon/bin.png" alt="Clear System" className={"mini-icon"}/>
                    <p className={"small-text"}>Sistemi Temizle</p>
                </div>

            </div>
        </>
    );
};

export default FileExplorer;
