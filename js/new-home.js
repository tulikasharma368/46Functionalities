let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>
                <img class="profile" src="${empPayrollData._profilePic}" alt="">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id="${empPayrollData._id}" onclick="remove(this)"
                    src="/assets/images/delete-black-18dp.svg"
                    alt="delete">
                <img id="${empPayrollData._id}" onclick="update(this)"
                    src="/assets/images/create-black-18dp.svg" alt="edit">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    if (typeof deptList == 'string') {
        deptHtml = `${deptHtml} <div class="dept-label">${deptList}</div>`
        return deptHtml;
    }
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    console.log(empPayrollData);
    //if(!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    // empPayrollList.splice(parseInt(node.id),1);//alternate for line 54,56
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    location.reload();
   
   
    createInnerHtml();
}

const update = (node) => {
    console.log(node);
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
    // if(!employeePayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    console.log(empPayrollData);
    window.location.replace(site_properties.add_employee_payroll_page);
}