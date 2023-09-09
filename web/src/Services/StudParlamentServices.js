import BaseService from "./BaseService";

const base_service = new BaseService();

export default class StudParlamentService{

  getAllStudParlament = () => base_service.getElements("/StudParlament/GetAllStudParlament");

  deleteStudParlament = (id) => base_service.deleteElements(`/StudParlament/DeleteStudParlament/${id}`);

  insertStudParlament = (data) => base_service.setElements('/StudParlament/InsertStudParlament', data);

  updateStudParlament = (id, data)=> base_service.setElements(`/StudParlament/UpdateStudParlament/${id}`,data);

  getStudentById = (id) => base_service.getElements(`/StudParlament/GetStudParlament/${id}`);

}