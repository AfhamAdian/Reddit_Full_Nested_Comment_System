import axios from 'axios';



const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

const makeRequest = async (endPoint, options) => {
    try{
        const response = await apiClient(endPoint, options);
        return response;
    }
    catch(error){
        console.error(error);
    }
}

export default makeRequest;