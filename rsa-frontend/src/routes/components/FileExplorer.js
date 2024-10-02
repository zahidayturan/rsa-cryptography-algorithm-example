import React from 'react';

const FileContainer = ({ owner, fileName, size, id }) => (
    <div className={"file-container custom-row"} style={{justifyContent:"space-between",alignItems:"center"}}>
        <div>
            <p className={"font-bold"}>{owner}</p>
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

    return (
        <div className="file-explorer">
            <p className={"title-text"}><span>Dosya</span> Gezgini</p>

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

            <FileContainer owner="Alice" fileName="abc.txt" size="148 kb" id="1" />

            <div className={"remove-button"}>
                <img src="/icon/bin.png" alt="Clear System" className={"mini-icon"}/>
                <p className={"small-text"}>Sistemi Temizle</p>
            </div>

        </div>
    );
};

export default FileExplorer;
