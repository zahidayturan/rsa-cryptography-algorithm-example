const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Endpoints = {
    USER : `${API_BASE_URL}/user`,
    FILE : `${API_BASE_URL}/file`,
    FILE_GET : `${API_BASE_URL}/file/get`,
    KEY : `${API_BASE_URL}/key`,
};

export default Endpoints;