import axios from 'axios'
const base_uri = "https://collegeback.herokuapp.com/api";


export default class BaseService{
    

    getElements = (uri) => {
        return axios.get(base_uri + uri);
    }

    setElements = (uri, data) =>{
        return axios.post(base_uri + uri, data);
    }

    deleteElements = (uri) =>{
        return axios.delete(base_uri + uri);
    }
}