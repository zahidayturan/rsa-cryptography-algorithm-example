import React, {useEffect, useState} from 'react';
import axios from "axios";

const FileContainer = ({ owner, fileName, size, id }) => (
    <div className={"file-container custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
        <div>
            <p className={"font-bold"}>{owner === 1 ? "Alice" : owner === 2 ? "Bob" : "Charlie" }</p>
            <p>{fileName}</p>
            <p className={"x-small-text"}>{size}</p>
        </div>
        <div className={"custom-row"} style={{gap:8}}>
            <div className={"icon-box"} style={{backgroundColor:"var(--orange-color-1)"}}>
                <img src="/icon/bin.png" alt="Remove File" className={"mini-icon"}/>
            </div>
            <div className={"icon-box"} style={{backgroundColor:"var(--yellow-color-1)"}}>
                <img src="/icon/file.png" alt="Open File" className={"mini-icon"}/>
            </div>
        </div>
    </div>
);

const FileExplorer = () => {

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);

    const clean = () => {
        axios.get(`http://localhost:8080/user/clean`)
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
            const response = await axios.get('http://localhost:8080/file/all');
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
        /*
        const intervalId = setInterval(() => {
            fetchFiles();
        }, 10000);

        return () => clearInterval(intervalId);
         */
    }, []);


    return (
        <>
            {loading && <div className={"loading-overlay"}><div className={"main-spinner"}></div></div>}
            <div className="file-explorer">
                <div className={"custom-row"} style={{justifyContent:"space-between"}}>
                    <p className={"title-text"}><span>Dosya</span> Gezgini</p>
                    <p onClick={fetchFiles} style={{cursor:"pointer"}}>Yenile</p>
                </div>
                <div className={"custom-row"}>
                    <img src="/icon/public.png" alt="" className={"mid-icon"}/>
                    <div>
                        <p style={{color: "var(--orange-color-1)"}}>Geçerli <span>Açık Anahtar</span></p>
                        <p className={"small-text"}>Anahtar Bekleniyor</p>
                    </div>
                </div>

                <div className={"custom-row"}>
                    <img src="/icon/private.png" alt="" className={"mid-icon"}/>
                    <div>
                        <p style={{color: "var(--yellow-color-1)"}}>Geçerli <span>Kapalı Anahtar</span></p>
                        <p className={"small-text"}>Anahtar Bekleniyor</p>
                    </div>
                </div>
                {
                    (files != null && files.length !== 0) ?
                    files.map((file) => (
                    <FileContainer key={file.id} owner={file.ownerId} fileName={file.name} size={`${file.size} bayt`} id={file.id} />
                )) : <div style={{color:"white",textAlign:"center",padding:"12px 0",backgroundColor:"black",borderRadius:8,fontSize:14}}>Dosya eklenmemiş</div>

                }
                <div className={"remove-button"} onClick={clean}>
                    <img src="/icon/bin.png" alt="Clear System" className={"mini-icon"}/>
                    <p className={"small-text"}>Sistemi Temizle</p>
                </div>

            </div>
        </>
    );
};

export default FileExplorer;
