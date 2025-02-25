import axios from 'axios';

const BOX_API_BASE_URL = "http://localhost/api/academy/box/list";

class BoxService {

    getBox(){
        return axios.get(BOX_API_BASE_URL);
    }

    /*
    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
        */
}

export default new BoxService()