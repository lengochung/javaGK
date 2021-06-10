



// Tạo biến i, k tăng để đặt tên cho thuộc tính student, del_student trong LocalStorage
var dem1 = dem2 = 0;
for (const key in localStorage) {
    if(key.startsWith('student')){ dem1++;}
    if(key.startsWith('del_student')){ dem2++;}
}
localStorage.i = dem1;
localStorage.k = dem2;
//Tạo trước 3 sinh viên
// check_insert(new Student(501200001,'Phan Thành Công',20,0902525425,'CD20CT1','CN-TT'));
// check_insert(new Student(501200018,'Lê Ngọc Hưng',40,0902525425,'CD20CT2','CN-TT'));
// check_insert(new Student(501200031,'Lâm Dương An',18,0902525425,'CD20CK4','CƠ KHÍ'));
// check_insert(new Student(501200042,'Lê Thị Phương Lan',18,0902525425,'CD20CT1','CN-TT'));
// check_insert(new Student(501200111,'Nguyễn Hữu Tài',18,0902525425,'CD20KT3','KINH TẾ'));
// check_insert(new Student(501200000,'Phạm Quốc Tú',18,0902525425,'CD20CK5','CƠ KHÍ'));

// Khai báo trỏ đến bảng sinh viên và bảng xóa nhân viên
var student_pane = document.getElementById('student_pane');
var student_del = document.getElementById('student_del');

// Load Student
function loadStudent(){
    student_pane.innerHTML = `<tr><td colspan='6'><h3>Thông tin sinh viên</h3></td></tr>
                                <tr>
                                    <td>STT</td>
                                    <td>MSSV</td>
                                    <td>Họ tên</td>
                                    <td>Tuổi</td>
                                    <td>Số điện thoại</td>
                                    <td>Lớp</td>
                                    <td>Khoa</td>
                                    <td></td>
                                    <td></td>
                                </tr>`;
    student_del.innerHTML = ` <tr><td colspan='6'><h3>Chờ duyệt</h3></td></tr>
                            <tr>
                                <td>STT</td>
                                <td>MSSV</td>
                                <td>Họ tên</td>
                                <td>Tuổi</td>
                                <td>Số điện thoại</td>
                                <td>Lớp</td>
                                <td>Khoa</td>
                                <td onclick='restore_all()'><a style="color: grey;" href="#">Hoàn tác tất cả</a></td>
                                <td onclick='delete_all()'><a style="color: red;" href="#">Xóa tất cả</a></td>
                            </tr>`;
    re_arraySVfromLocalStorage('student').forEach((element, i) => {
        student_pane.innerHTML += `<tr>
                                        <td>${i+1}</td>
                                        <td>${element.id}</td>
                                        <td>${element.name}</td>
                                        <td>${element.age}</td>
                                        <td>${element.phone}</td>
                                        <td>${element.class}</td>
                                        <td>${element.branch}</td>
                                        <td onclick="edit(this)"><a href="#">Chỉnh sửa</a></td>
                                        <td onclick="remove_restore(this,'student','del_student')"><a href="#" style="color: red;">Loại bỏ</a></td>
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
                                        <td onclick="remove_restore(this,'del_student','student')"><a href="#" style="color: grey;">Hoàn tác</a></td>
                                        <td onclick='deleteOut(this)'><a href="#" style="color: red;">Xóa</a></td>
                                    </tr>`;
    });
    re_ValueOptionOfSelect(document.getElementsByClassName('select')[0],'branch');
    re_ValueOptionOfSelect(document.getElementsByClassName('select')[1],'class');
    displayTotalStudent(document.getElementsByClassName('display')[0],'student');
    displayTotalStudent(document.getElementsByClassName('display')[1],'del_student');
   

    
}









// Tìm kiếm tên, ID
function re_search_nameID(search){
    student_pane.innerHTML = "<tr><td colspan='6'><h3>Kết quả tìm kiếm</h3></td></tr>";
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
                                        <td onclick="edit_search(this)"><a href="#">Chỉnh sửa</a></td>
                                        <td onclick="remove_restore(this,'student','del_student')"><a href="#" style="color: red;">Loại bỏ</a></td>
                                    </tr>`;
        }
    });
}


// Lọc
function re_filter(filter){
    document.getElementById('search').value = "";
    student_pane.innerHTML = "<tr><td colspan='6'><h3>Đã lọc</h3></td></tr>";
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
                                                    <td onclick="edit_search(this)"><a href="#">Chỉnh sửa</a></td>
                                                    <td onclick="remove_restore(this,'student','del_student')"><a href="#" style="color: red;">Loại bỏ</a></td>
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
                                                    <td onclick="edit_search(this)"><a href="#">Chỉnh sửa</a></td>
                                                    <td onclick="remove_restore(this,'student','del_student')"><a href="#" style="color: red;">Loại bỏ</a></td>
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
                                                    <td onclick="edit_search(this)"><a href="#">Chỉnh sửa</a></td>
                                                    <td onclick="remove_restore(this,'student','del_student')"><a href="#" style="color: red;">Loại bỏ</a></td>
                                                </tr>`;
                } 
            });
        }
    }
}