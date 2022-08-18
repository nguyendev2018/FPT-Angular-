var email = document.getElementById('email');
var password = document.getElementById('password');
var inputs = document.querySelectorAll(".input");
var title = document.getElementById("title");
var brief = document.getElementById("brief");
var content = document.getElementById("content");
var table = document.getElementById("table");
var courseApi = "https://60dd3a73878c890017fa26fb.mockapi.io/api/v1/contents";
var btnEdit = document.querySelector(".btn-edit");
let btnNext = document.querySelector(".btn-next");
let btnPrev = document.querySelector(".btn-prev");
let box_cms = document.querySelector('.box-cms');
let perPage = 6;
let currentPage = 1;
let starts = 0;
let end = perPage;
var totalPages = 0;
var array = [];
let button_login = document.querySelector(".btn-login");
let click_login = document.querySelectorAll('.click-login');

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}
inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});
var form = document.getElementById('form');
button_login.addEventListener("click", function(e) {
    e.preventDefault();
    var check_login = checkInputs_login();

    let validForm = [];
    const isValidTitle = check_login.email;
    const isValidDes = check_login.password;
    if (validForm.every(ele => ele === true)) {
        document.querySelector(".box-cms").classList.toggle("active");
        document.querySelector('.login.click_login').classList.toggle('active');
    } else {
        alert('ngasa')
    }
})
//Click login and register

for (let i = 0; i < click_login.length; i++) {
    click_login[i].addEventListener("click", function() {
        document.querySelector('.login').classList.toggle("click_login");
        document.querySelector('.register').classList.toggle("click_login");
    })

}

function checkInputs_login() {
    // trim to remove the whitespaces
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var emailValue = email.value.trim();
    var passwordValue = password.value.trim();
    if (emailValue === '') {
        setErrorFor(email, 'Email không thể bỏ trống');
        return;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Không hợp lệ');
        return;
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password không thể bỏ trống');
        return;
    } else {
        setSuccessFor(password);
    }
    localStorage.setItem('emailValue', JSON.stringify(emailValue));
    // console.log(localStorage.getItem('formData'));
    dispData();
    return {
        email: emailValue,
        password: password
    }

}

function dispData() {
    // console.log(localStorage.getItem('formData'));
    let emailValue = JSON.parse(localStorage.getItem("emailValue"));
    var output = document.getElementById('output');
    output.innerHTML = `<p>${emailValue}</p>`;
}
// dispData();
function setErrorFor(input, message) {
    var formControl = input.parentElement;
    var small = formControl.querySelector('small');
    formControl.className = 'input-effect  error';
    small.innerText = message;
}

function setSuccessFor(input) {
    var formControl = input.parentElement;
    formControl.className = 'input-effect  success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
document.querySelector(".icon-dots").addEventListener("click", function() {
    document.querySelector(".box-cms--side").classList.toggle("active");
})
//localstorage
let emailValue = JSON.parse(localStorage.getItem("emailValue"));
document.getElementById("pr_email").innerHTML = emailValue;

function start() {
    getCourses(function(courses) {
        renderCourses(courses);
    });
}
start();
//gọi ra
function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

//delete
function deleteCourse(id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(courseApi + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var courseItem = document.querySelector(".course-item-" + id);
            if (courseItem) {
                courseItem.remove();
            }
            let _courses = getContentPagi(pagiConfig.currentActivePage, pagiConfig.itemPerPage);
            renderCoursesV2(_courses);

            let paginationNode = document.querySelector('#content__paging');
            renderPagination(pagiConfig, paginationNode);
        });
}

// */
// 1 lấy id edit
// view data lên form edit theo id
// get data from form 
// validation data
// khi submit => check valid data Form.

async function getContentV2(idItemEdit = undefined, urlAPI = courseApi) {
    if (idItemEdit) {
        urlAPI += `/${idItemEdit}`;
    }
    var options = {
        method: "get",
        headers: {
            "Data-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    const dataRes = await fetch(urlAPI, options)
        .then(function(res) {
            if (res.status === 200) {
                return res.json();
            }
            throw Error('Not found');
        })
        .then(function(res) {
            console.log(res, '---');
            return res;
        }).catch(exc => {
            console.log(exc, 'looix');
        });
    return dataRes;
}

async function editCourse(id) {
    // get detail by id
    const dataEdit = await getContentV2(id);
    // show len
    document.querySelector(".box-show.edit-content").classList.add('show_hidden');
    document.querySelector(".box-show.view").classList.remove('show_hidden');
    // add value for input
    const formData = document.querySelector('form#edit-form-v2');
    formData.querySelector('input').value = dataEdit.title;
    formData.querySelector('textarea').value = dataEdit.content;
    formData.querySelector('#submit-edit').setAttribute('id-item-submit', `${id}`);
    createCourses(formData, function() {
        getCourses(renderCourses);
    });
}
document.querySelector('#submit-edit').addEventListener('click', function(e) {
    e.preventDefault();
    const idUpdate = this.getAttribute('id-item-submit');
    const formData = document.querySelector('form#edit-form-v2');
    const titleEle = formData.querySelector('input').value;
    const contentEle = formData.querySelector('textarea').value;
    const dataToSubmit = {
        "title": titleEle,
        "content": contentEle
    }
    let validForm = [];
    const isValidTitle = showErr(validation(dataToSubmit.title, 3, 100), '#title_edit');
    const isValidDes = showErr(validation(dataToSubmit.content, 6, 100), '#content_edit');
    if (validForm.every(ele => ele === true)) {
        alert('gui api');
        console.log(`${courseApi}/${idUpdate}`, 'ertyuiop');
        fetch(`${courseApi}/${idUpdate}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSubmit)
        }).then(res => {
            if (res.ok) {
                alert('update thanh coong');
                return res.json();

            } else {
                alert('try again');
            }
        }).then(res => {
            console.log(res, '------');
        }).catch(err => {
            console.log(err, 'err request api');
        })
    } else {
        alert('sai định dạng');
    }
})

function validation(dataVal, min = 3, max = 20) {
    return (dataVal.length >= min && dataVal.length <= max);
}

function showErr(flag, selector) {
    if (flag) {
        document.querySelector(selector).style.border = '1px solid #c9c8c7';
    } else {
        document.querySelector(selector).style.border = '1px solid red';
    }
    return flag;
}
//view
function viewCourse(id) {
    var options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(courseApi + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {})
    var courseItem = document.querySelector(".course-item-" + id);
        courseItem.addEventListener('click', function() {
        var content_course = courseItem.querySelector('#course_content').textContent;
        var title_course = courseItem.querySelector('#course_title').textContent;
        console.log(content_course, title_course, '------');
        document.querySelector(".box-show.view-content").classList.add('show_hidden');
        document.querySelector(".box-show.view").classList.remove('show_hidden');
        document.getElementById('title_view').value = title_course;
        document.getElementById("content_view").value = content_course;
    });

}

//view ra
function renderCourses(courses) {
    var listCourse = document.getElementById("table");
    var htmls = courses.map(function(course) {
        return `
        <tr class="course-item-${course.id}">
            <td data-label="Id">${course.id}</td>
            <td data-label="Title"  id="course_title">${course.title}</td>
            <td data-label="Content" id="course_content"><p>${course.content}</p> </td>
            <td data-label="CreateDate">${course.createdDate}</td>
            <td data-label="Delete"><button class="btn-click btn-delete" onclick="deleteCourse(${course.id})">Del</button></td>
            <td data-label="Edit"><button class="btn-click btn-edit" id="edit-post" onclick="editCourse(${course.id})">Edit</button></td>
            <td data-label="View"><button class="btn-click btn-view" onclick="viewCourse(${course.id})">View </button></td>
        </tr>`;
    });

    listCourse.innerHTML = htmls.join("");
    currentTotalPage = Math.ceil(courses.length / perPage);
    console.log(currentTotalPage);
    arrays = courses;
}
//tạo
function createCourses(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(courseApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callback);
}

document.querySelector('.button-sm').addEventListener("click", function(e) {
    e.preventDefault();
    checkInputs();
});
// kiểm tra dữ liệu
function checkInputs() {
    // trim to remove the whitespaces
    var titleValue = title.value.trim();
    var descriptionValue = description.value.trim();
    var contentValue = content_el.value.trim();
    if (titleValue === "") {
        setErrorFor(title, "Tiêu đề không thể bỏ trống");
    } else if (titleValue.length <= 3) {
        setErrorFor(title, "Tiêu đề phải từ 3 ký tự trở lên");
    } else {
        setSuccessFor(title);
    }
    if (descriptionValue === "") {
        setErrorFor(description, "Tóm tắt không thể bỏ trống");
    } else if (descriptionValue.length <= 10) {
        setErrorFor(description, "Tóm tắt phải từ 10 ký tự trở lên");
    } else {
        setSuccessFor(description);
    }
    if (contentValue === "") {
        setErrorFor(content_el, "Tóm tắt không thể bỏ trống");
    } else if (contentValue.length <= 10) {
        setErrorFor(content_el, "Tóm tắt phải từ 10 ký tự trở lên");
    } else {
        setSuccessFor(content_el);
    }
    var formData = {
        title: titleValue,
        description: descriptionValue,
        content: contentValue,
    };
    createCourses(formData, function() {
        getCourses(renderCourses);
    });
}



//==========================================================

let pagiConfig = {
    // số trang
    itemPerPage: '5',
    // trang đang active
    currentActivePage: '2'
}
async function getContentPagi(page = '', _limit = '', url = courseApi) {
    let _url = (page !== '' && _limit !== '') ? `${url}?p=${page}&l=${_limit}` : url;
    const response = await fetch(_url, {
        method: 'GET'
    })
    return response.json();
}
function renderCoursesV2(courses) {
    var listCourse = document.getElementById("table");
    var htmls = courses.map(function(course) {
        return `
        <tr class="course-item-${course.id}">
            <td data-label="Id">${course.id}</td>
            <td data-label="Title"  id="course_title">${course.title}</td>
            <td data-label="Content" id="course_content"><p>${course.content}</p> </td>
            <td data-label="CreateDate">${course.createdDate}</td>
            <td data-label="Delete"><button class="btn-click btn-delete" onclick="deleteCourse(${course.id})">Del</button></td>
            <td data-label="Edit"><button class="btn-click btn-edit" id="edit-post" onclick="editCourse(${course.id})">Edit</button></td>
            <td data-label="View"><button class="btn-click btn-view" onclick="viewCourse(${course.id})">View </button></td>
        </tr>`;
    });
    listCourse.innerHTML = htmls.join("");
}
async function total(url = courseApi) {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json();
}
async function currentTotalPageV2(itemPerPage) {
    let totalPage = await total();
    totalPage = Array.from(totalPage).length ? Math.ceil(Array.from(totalPage).length / itemPerPage) : 0;
    return totalPage;
}
function createPagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;
    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }
    return rangeWithDots;
}
async function renderPagination(pagiConfig, paginationNode) {
    const _currentTotalPage = await currentTotalPageV2(Number(pagiConfig.itemPerPage));
    const arrayLink = createPagination(Number(pagiConfig.currentActivePage), Number(_currentTotalPage));
    const currentActive = Number(pagiConfig.currentActivePage);
    let pagination = `
                <ul class="pagination">
                    <li>
                        <a 
                          id="prev" class="item" mark="pre" 
                          onclick="adjoining('${currentActive}','pre')">
                            <i class="fas fa-backward"></i>
                        </a>
                    </li>`;
    arrayLink.forEach(ele => {
        pagination += `<li>
                      <a
                        id="${ele === currentActive ? 'active' : ''}"
                        class="item switch" 
                        mark="${ele === '...' ? 'dots' : ele}" 
                        ${ele === '...' ? '' : `onclick="switchP('${ele}')"`}
                        >
                          ${ele}
                      </a>
                      </li>`;
        });
    pagination += `<li>
                    <a 
                      id="next" mark="next" class="item"  
                      onclick="adjoining('${currentActive}','next')">
                      <i class="fas fa-forward"></i>
                    </a>
                  </li>
                </ul>`;
    paginationNode.innerHTML = pagination;
    return;
};
async function begin() {
    let paginationNode = document.querySelector('#content__paging');
    renderPagination(pagiConfig, paginationNode);
    let _courses = await getContentPagi(pagiConfig.currentActivePage, pagiConfig.itemPerPage);
    renderCoursesV2(_courses);
}
begin();
async function adjoining(currentPage, flag) {
    const totalPage = await currentTotalPageV2(pagiConfig.itemPerPage);
    currentPage = Number(currentPage);
    if (flag === 'next') {
        currentPage = currentPage === totalPage ? totalPage : ++currentPage;
    } else {
        currentPage = currentPage === 1 ? 1 : --currentPage;
    }
    pagiConfig = {
        ...pagiConfig,
        currentActivePage: String(currentPage)
    };
    // lấy về số sản phẩm trên một trnag tương ứng với trang đưuọc chọn
    let _courses = await getContentPagi(pagiConfig.currentActivePage, pagiConfig.itemPerPage);
    renderCoursesV2(_courses);
    // render lại pagination 
    let paginationNode = document.querySelector('#content__paging');
    renderPagination(pagiConfig, paginationNode);
}
async function switchP(pageSwitch) {
    pagiConfig = {
        ...pagiConfig,
        currentActivePage: String(pageSwitch)
    };
    let _courses = await getContentPagi(pagiConfig.currentActivePage, pagiConfig.itemPerPage);
    renderCoursesV2(_courses);

    let paginationNode = document.querySelector('#content__paging');
    renderPagination(pagiConfig, paginationNode);

}