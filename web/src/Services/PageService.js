import BaseService from "./BaseService";

let base_service = new BaseService();

export default class PageService{

    getPageBySection = (section) => base_service.getElements(`/Page/GetPagesBySection/${section}`);

    getPageById = (id) => base_service.getElements(`/Page/GetPageById/${id}`);

    updatePage = (id,data) => base_service.setElements(`/Page/UpdatePage/${id}`,data);

    deletePage = (id) => base_service.deleteElements(`/Page/DeletePage/${id}`);

    createPage = (data) => base_service.setElements("/Page/CreatePage",data);

    getAllPages = async () => await base_service.getElements('/Page/GetAllPages');
}