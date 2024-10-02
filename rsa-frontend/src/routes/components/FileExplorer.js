import React from 'react';

const FileExplorer = () => {


    return (
        <div className="file-explorer">
            <p className={"title-text"}><span>Dosya</span> Gezgini</p>
            <div className={"custom-row"}>
                <img src="/icon/public.png" alt="" className={"mid-icon"}/>
                <div>
                    <p style={{color:"var(--orange-color-1)"}}>Geçerli <span>Açık Anahtar</span></p>
                    <p className={"small-text"}>Anahtar Bekleniyor</p>
                </div>
            </div>
            <div className={"custom-row"}>
                <img src="/icon/private.png" alt="" className={"mid-icon"}/>
                <div>
                    <p style={{color:"var(--yellow-color-1)"}}>Geçerli <span>Kapalı Anahtar</span></p>
                    <p className={"small-text"}>Anahtar Bekleniyor</p>
                </div>
            </div>

        </div>
    );
};

export default FileExplorer;
