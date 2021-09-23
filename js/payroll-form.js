let isUpdate = false;
let employeePayrollObj = {};


//name validation
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });


    //salary bar
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = output.value;
    salary.addEventListener('input',function(){
    output.textContent = salary.value;
    });

    checkForUpdate();
});

//submit
const save = () =>{
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return e;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = document.querySelector('#name').value;
    } catch (e) {
        setTextValue('.textError',e);
        throw e;
    }

employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
employeePayrollData.department = getSelectedValues('[name = department]');
employeePayrollData.salary = document.querySelector('#salary').value;
employeePayrollData.note = document.querySelector('#notes').value;
let date = document.querySelector('#day').value + " " + document.querySelector('#month').value + " " + document.querySelector('#year').value;
employeePayrollData.startDate = new Date(date);
alert(employeePayrollData.toString());
return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//local storage
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    employeePayrollData.id = new Date().getTime();
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
        
    }else{
       
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
  
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));   
}
//alert(localStorage.key(0));
//clear local storage:
//window.localStorage.clear();
const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name = profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name = gender]',employeePayrollObj._gender);
    setSelectedValues('[name = department]',employeePayrollObj._department);
    setValue('#salary_op',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    //let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    let date = moment(employeePayrollObj._startDate).format('DD MMM YYYY').split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}


//reset form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedValues('#day','1');
    setSelectedValues('#month','January');
    setValue('#year','2021');
}

const setValue = (id,value) => {
    //alert(value)
    const element = document.querySelector(id);
    //element.setAttribute('value',value);
    element.value = value;
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value == value){
            item.checked = true;
        }
    });
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const checkForUpdate = () => {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    //console.log(employeePayrollJSON);
    isUpdate = employeePayrollJSON ? true :false;
    //if(!isUpdate) return;
    //console.log(isUpdate);
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

// line 82

