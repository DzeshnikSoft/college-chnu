import BaseService from "./BaseService"

const base_service = new BaseService();

export default class AdministrationService{
    
    getAllPerson = () => base_service.getElements("/Administration/GetAllPersons");

    updatePerson = (id, data) => base_service.setElements(`/Administration/UpdatePerson/${id}`,data);

    insertPerson = (data) => base_service.setElements("/Administration/InsertPerson",data);

    deletePerson = (id) => base_service.deleteElements(`/Administration/DeletePerson/${id}`);

    getPersonById  = (id) => base_service.getElements(`/Administration/GetPersonById/${id}`);
}