import axios from "axios";
import Endpoints from "../../../contants/endpoints";

export const openFile = async (fileName,isDecrypt) => {
    try {
        const response = isDecrypt ? await axios.get(`${Endpoints.FILE_GET}/${fileName}`, {
            responseType: "blob",
        }) : await axios.get(`${Endpoints.FILE_GET}/normal/${fileName}`, {
            responseType: "blob",
        });
        const fileBlob = new Blob([response.data]);
        const fileURL = URL.createObjectURL(fileBlob);
        window.open(fileURL, "_blank");
    } catch (error) {
        console.error("Dosya açılırken hata oluştu:", error);
    }
};