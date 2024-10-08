import axios from "axios";
import Endpoints from "../../../contants/endpoints";

export const openFile = async (fileName,userId) => {
    try {
        const response =  await axios.get(`${Endpoints.FILE_GET}/${fileName}/${userId}`, {
            responseType: "blob",
        });
        const fileBlob = new Blob([response.data]);
        const fileURL = URL.createObjectURL(fileBlob);
        window.open(fileURL, "_blank");
    } catch (error) {
        console.error("Dosya açılırken hata oluştu:", error);
    }
};