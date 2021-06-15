



// Tạo biến i, k tăng để đặt tên cho thuộc tính student, del_student trong LocalStorage
var dem1 = dem2 = 0;
for (const key in localStorage) {
    if(key.startsWith('student')){ dem1++;}
    if(key.startsWith('del_student')){ dem2++;}
}
localStorage.i = dem1;
localStorage.k = dem2;
//Tạo trước 3 sinh viên


// Nạp trước 6 sinh viên
function insert(){
    check_insert(new Student(501200001,'Phan Thành Công',20,0902525425,'CD20CT1','CN-TT'));
    check_insert(new Student(501200018,'Lê Ngọc Hưng',40,090272347,'CD20CT2','CN-TT'));
    check_insert(new Student(501200031,'Lâm Dương An',21,0940394793,'CD20CK4','CƠ KHÍ'));
    check_insert(new Student(501200042,'Lê Thị Phương Lan',18,021232323,'CD20CT1','CN-TT'));
    check_insert(new Student(501200111,'Nguyễn Hữu Tài',18,091298323,'CD20KT3','KINH TẾ'));
    check_insert(new Student(501200026,'Nguyễn Hoàng Chí Bảo',20,099312324,'CD20CK4','CƠ KHÍ'));
    check_insert(new Student(501200036,'Phạm Quốc Tú',23,0993243993,'CD20CK5','CƠ KHÍ'));
    check_insert(new Student(501200013,'Phan Văn Trường',24,938459384,'CD20KT3','KINH TẾ'));
    check_insert(new Student(501200035,'Lê Hữu Hoàng',23,287343993,'CD20KT3','KINH TẾ'));
    check_insert(new Student(501200040,'Trần Quốc Thịnh',20,099313093,'CD20CT1','CN-TT'));

    loadStudent();
}

// Khai báo trỏ đến bảng sinh viên và bảng xóa nhân viên
var student_pane = document.getElementById('student_pane');
var student_del = document.getElementById('student_del');

// Load Student
function loadStudent(){
    student_pane.innerHTML = `<tr><td colspan='9'><h3>Thông tin sinh viên</h3></td></tr>
                                <tr id="danhmuc">
                                    <td class="cell">STT</td>
                                    <td class="cell">MSSV</td>
                                    <td class="cell">Họ tên</td>
                                    <td class="cell">Tuổi</td>
                                    <td class="cell">Số điện thoại</td>
                                    <td class="cell">Lớp</td>
                                    <td class="cell">Khoa</td>
                                    <td class="cell"></td>
                                    <td class="cell"></td>
                                </tr>`;
    student_del.innerHTML = ` <tr><td colspan='9'><h3>Chờ duyệt</h3></td></tr>
                            <tr>
                                <td class="cell">STT</td>
                                <td class="cell">MSSV</td>
                                <td class="cell">Họ tên</td>
                                <td class="cell">Tuổi</td>
                                <td class="cell">Số điện thoại</td>
                                <td class="cell">Lớp</td>
                                <td class="cell">Khoa</td>
                                <td class="cell" onclick='restore_all()'><a class="btnRes" href="#">Hoàn tác tất cả</a></td>
                                <td class="cell" onclick='delete_all()'><a class="btnDel" href="#">Xóa tất cả</a></td>
                            </tr>`;
    re_arraySVfromLocalStorage('student').forEach((element, i) => {
        student_pane.innerHTML += `<tr>
                                        <td>${i+1}</td>
                                        <td>${element.id}</td>
                                        <td style="text-align: left;">${element.name}</td>
                                        <td>${element.age}</td>
                                        <td>${element.phone}</td>
                                        <td>${element.class}</td>
                                        <td>${element.branch}</td>
                                        <td onclick="edit(this)"><a href="#" class="btnEdit">Sửa</a></td>
                                        <td onclick="remove_restore(this,'student','del_student')"><a href="#" class="btnDel">Loại</a></td>
                                    </tr>`;
    });
    re_arraySVfromLocalStorage('del_student').forEach((element, i) => {
        student_del.innerHTML += `<tr>
                                        <td>${i+1}</td>
                                        <td>${element.id}</td>
                                        <td>${element.name}</td>
                                        <td>${element.age}</td>
                                        <td>${element.phone}</td>
                                        <td>${element.class}</td>
                                        <td>${element.branch}</td>
                                        <td onclick="remove_restore(this,'del_student','student')"><a href="#" class="btnRes">Hoàn tác</a></td>
                                        <td onclick='deleteOut(this)'><a href="#" class="btnDel">Xóa</a></td>
                                    </tr>`;
    });
    re_ValueOptionOfSelect(document.getElementsByClassName('select')[0],'branch');
    re_ValueOptionOfSelect(document.getElementsByClassName('select')[1],'class');
    re_AllAttrofStudent(document.getElementsByClassName('select')[2]);
    displayTotalStudent(document.getElementsByClassName('display')[0],'student');
    displayTotalStudent(document.getElementsByClassName('display')[1],'del_student');
   

    
}









// Tìm kiếm tên, ID
function re_search_nameID(search){
    student_pane.innerHTML = "<tr><td colspan='9'><h3>Kết quả tìm kiếm</h3></td></tr><tr></tr>";
    re_arraySVfromLocalStorage('student').forEach((element, i) => {
        if(search==element.id||element.name.search(search)>=0){
            student_pane.innerHTML += `<tr>
                                        <td></td>
                                        <td>${element.id}</td>
                                        <td>${element.name}</td>
                                        <td>${element.age}</td>
                                        <td>${element.phone}</td>
                                        <td>${element.class}</td>
                                        <td>${element.branch}</td>
                                        <td onclick="edit_search(this)"><a href="#" class="btnEdit">Sửa</a></td>
                                        <td onclick="remove_restore(this,'student','del_student')"><a href="#"class="btnDel">Loại</a></td>
                                    </tr>`;
        }
    });
}


// Lọc
function re_filter(filter){
    document.getElementById('search').value = "";
    student_pane.innerHTML = "<tr><td colspan='9'><h3>Đã lọc</h3></td></tr><tr></tr>";
    if(filter[0].value=="Chọn"){
        if(filter[1].value=="Chọn"){ loadStudent(); }
        else {
            re_arraySVfromLocalStorage('student').forEach(element => {
                if(filter[1].value==element.class){
                    student_pane.innerHTML += `<tr>
                                                    <td></td>
                                                    <td>${element.id}</td>
                                                    <td>${element.name}</td>
                                                    <td>${element.age}</td>
                                                    <td>${element.phone}</td>
                                                    <td>${element.class}</td>
                                                    <td>${element.branch}</td>
                                                    <td onclick="edit_search(this)"><a href="#" class="btnEdit">Sửa</a></td>
                                                    <td onclick="remove_restore(this,'student','del_student')"><a href="#" class="btnDel">Loại</a></td>
                                                </tr>`;
                } 
            });
        } 
    } else {
        if(filter[1].value=="Chọn"){
            re_arraySVfromLocalStorage('student').forEach(element => {
                if(filter[0].value==element.branch){
                    student_pane.innerHTML += `<tr>
                                                    <td></td>
                                                    <td>${element.id}</td>
                                                    <td>${element.name}</td>
                                                    <td>${element.age}</td>
                                                    <td>${element.phone}</td>
                                                    <td>${element.class}</td>
                                                    <td>${element.branch}</td>
                                                    <td onclick="edit_search(this)"><a href="#" class="btnEdit">Sửa</a></td>
                                                    <td onclick="remove_restore(this,'student','del_student')"><a href="#" class="btnDel">Loại</a></td>
                                                </tr>`;
                } 
            });
        } else {
            re_arraySVfromLocalStorage('student').forEach(element => {
                if(filter[0].value==element.branch&&filter[1].value==element.class){
                    student_pane.innerHTML += `<tr>
                                                    <td></td>
                                                    <td>${element.id}</td>
                                                    <td>${element.name}</td>
                                                    <td>${element.age}</td>
                                                    <td>${element.phone}</td>
                                                    <td>${element.class}</td>
                                                    <td>${element.branch}</td>
                                                    <td onclick="edit_search(this)"><a href="#" class="btnEdit">Sửa</a></td>
                                                    <td onclick="remove_restore(this,'student','del_student')"><a href="#" class="btnDel">Loại</a></td>
                                                </tr>`;
                } 
            });
        }
    }
}