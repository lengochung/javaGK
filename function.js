// Đinh nghĩa lớp student
function Student(...rest){
    this.id = rest[0],
    this.name = rest[1],
    this.age = rest[2],
    this.phone = rest[3],
    this.class = rest[4],
    this.branch = rest[5]
}
var tv_array = ['MSSV','Tên Sinh Viên','Tuổi','Số điện thoại','Lớp','Khoa'];
var attr_array = ['id','name_student','age','phone','class','branch'];

// Thêm SV vào mảng localStorage
var i = 0;
function add_SVintoLocalStorage(){
    let id = check_empty(document.getElementById('id'));
    let name_student = check_empty(document.getElementById('name_student'));
    let age = check_empty(document.getElementById('age'));
    let phone = check_empty(document.getElementById('phone'));
    let classs = check_empty(document.getElementById('class'));
    let branch = check_empty(document.getElementById('branch'));
    if(i==0){
        check_insert(new Student(id.value,name_student.value,age.value,phone.value,classs.value,branch.value));
    } else { alert('Thất bại \nKhông trường nào được bỏ trống'); }
    i = 0;
}

// Kiểm tra dữ liệu rỗng
function check_empty(input){
    if(input.value==''){
        input.setAttribute('placeholder','... không được để trống');
        i++;
    } return input;
}





// CHỉnh sửa tại mảng localStorage
function edit(td){
    let id = td.parentElement.getElementsByTagName('td')[1].innerText;
    for (const key in localStorage) {
        if(key.startsWith('student')&&id==JSON.parse(localStorage[key]).id){
            let js = JSON.parse(localStorage[key]), i = 0;
            for (const attr in js) {
                js[attr] = prompt(tv_array[i],js[attr]); i++;
            }
            localStorage[key] = JSON.stringify(js);
            break;
        }
    }
    loadStudent();
}

function edit_search(td){
    let id = td.parentElement.getElementsByTagName('td')[1].innerText;
    let search = "";
    for (const key in localStorage) {
        if(key.startsWith('student')&&id==JSON.parse(localStorage[key]).id){
            let js = JSON.parse(localStorage[key]), i = 0;
            for (const attr in js) {
                js[attr] = prompt(tv_array[i],js[attr]);
                if(i==0){ search = js[attr];}   
                i++;
            }
            localStorage[key] = JSON.stringify(js);
            break;
        }
    }
    re_search_nameID(search);
}


// Lấy dữ liêu từ localStorage trả về mảng
function re_arraySVfromLocalStorage(value){
    var arr = new Array();
    for (const key in localStorage) {
        if(key.startsWith(value)){
            arr.push(JSON.parse(localStorage[key]));
        }
    }
    return arr;
}



// Xóa sinh viên
function remove_restore(td, value1, value2){
    let id = td.parentElement.getElementsByTagName('td')[1].innerText;
    for (const key in localStorage) {
        if(key.startsWith(value1)&&id==JSON.parse(localStorage[key]).id){
            if (value1=='student') {
                localStorage[value2 + localStorage.k] = localStorage[key];
                localStorage.k++;
            } else {
                localStorage[value2 + localStorage.i] = localStorage[key];
                localStorage.i++;
            }
            localStorage.removeItem(key);
        }
    }
    loadStudent();
}

// Hàm kiểm tra nhập trùng
function check_insert(object){
    var isval = true;
    for (let i=0; i<re_arraySVfromLocalStorage('student').length; i++) {
        if(object.id==re_arraySVfromLocalStorage('student')[i].id){
            isval = false;
            break;
        }
    }
    for (let i=0; i<re_arraySVfromLocalStorage('del_student').length; i++) {
        if(object.id==re_arraySVfromLocalStorage('del_student')[i].id){
            isval = false;
            break;
        }
    }
    if(isval){
        localStorage['student' + localStorage.i] = JSON.stringify(object);
        localStorage.i++;
        setValueforFormInput("");
        alert('Thêm thành công');
    } else { alert('MSSV đã tồn tại trong hệ thống'); }
}
 // Trả về rỗng cho các Form nhập
function setValueforFormInput(valueSet){
    for (const iterator of document.getElementsByClassName('null_value')) { iterator.value = valueSet}
}







// Xóa khỏi LocalStorage
function deleteOut(td) {
   let id = td.parentElement.getElementsByTagName('td')[1].innerText;
   for (const key in localStorage) {
       if (key.startsWith('del_student')&&id==JSON.parse(localStorage[key]).id) {
           localStorage.removeItem(key);
       }
   }
   loadStudent();
}
// Xóa tất cả khỏi thùng rác sinh viên
function delete_all(){
    for (const key in localStorage) {
        if (key.startsWith('del_student')) {  localStorage.removeItem(key); }
    }
    loadStudent();
}
// Đưa tất cả sinh viên hoàn tác
function restore_all(){
    for (const key in localStorage) {
        if (key.startsWith('del_student')) {
            localStorage['student' + localStorage.i] = localStorage[key];
            localStorage.i++;
            localStorage.removeItem(key);
        }
    }
    loadStudent();
}



// Lấy thông tin Khoa và Lớp
function re_ArrayGetValueAttr(attr){
    let arr = new Array('Chọn');
        re_arraySVfromLocalStorage('student').forEach(element => {
            for (const key in element) {
               if(key==attr){
                   let isval = true;;
                   for (const iterator of arr) {
                       if(element[key]==iterator){ isval = false; break; }
                   }
                   if(isval){
                        arr.push(element[key]);
                   }
               }
            }
        });
    return arr;
}



// getValueOptionOfSelect
function re_ValueOptionOfSelect(select, attr){
    select.innerHTML = "";
    for (const iterator of re_ArrayGetValueAttr(attr)) {
        select.innerHTML += `<option value="${iterator}">${iterator}</option>`;
    }
}



// Đếm số sinh viên
function  countStudent(array){
    let count = 0;
    array.forEach(element => {
        count++;
    });
    return count;
}


// Hiển thị số sinh viên
function displayTotalStudent(params1, params2){
    params1.innerHTML = "";
    params1.innerHTML += `(<font color="red"><b>${countStudent(re_arraySVfromLocalStorage(params2))}</b></font>)` 
}


































