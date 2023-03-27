$(document).ready(function () {
    $("#modalTask").on("hidden.bs.modal", function () {
        $('#btnAddTask').show();
        $('#btnUpdateTask').show();
        $('#loadingTask').show();
        $("#taskTo").children("option").remove();
    });
});
Date.prototype.toDateInputValue = function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

async function getAllUser() {
    return await fetchData('/api/getAllNameUser', 'GET');
}

async function updateTask(id) {
    $('#modalTask').modal('show')
    let contentBody = $('.modal-body').hide();
    $('#titleModalTask').text('Update công việc')
    let loading = $('#loadingTask').show();
    $('#btnAddTask').hide();
    //set nguoi giao task
    let idPersonBy = localStorage.getItem('id');
    let namePersonBy = localStorage.getItem('name');
    $('#taskBy').val(namePersonBy);
    // set nguoi nhan task
    await setUserToTask(id);

    loading.hide();
    contentBody.show();

}

async function deleteTask(id) {
    $('#modalConfirmDelete').modal('show');
    $('.titleConfirmDelete').text('Bạn muốn xóa task này?')
}

async function setUserToTask(idUser) {
    const users = await getAllUser();
    if (users.status === 1) {
        const dataUser = users.data;
        let userHtml = ``;
        if (dataUser.length > 0) {
            for (let i = 0; i < dataUser.length; i++) {
                if (idUser && dataUser[i]._id === idUser) {
                    userHtml += `<option value="${dataUser[i]._id}" selected>${dataUser[i].name}</option>`;
                } else {
                    userHtml += `<option value="${dataUser[i]._id}">${dataUser[i].name}</option>`;

                }
            }
        } else {
            userHtml += `<option value="">Không có ngành hàng</option>`;
        }
        $("#taskTo").append(userHtml);
    }
}

async function addNewTask() {
    $('#modalTask').modal('show')
    let contentBody = $('.modal-body').hide();
    $('#titleModalTask').text('Thêm mới công việc')
    let loading = $('#loadingTask');
    $('#btnUpdateTask').hide();
    //set nguoi giao task
    let idPersonBy = localStorage.getItem('id');
    let namePersonBy = localStorage.getItem('name');
    $('#taskBy').val(namePersonBy);
    // set nguoi nhan task
    await setUserToTask();
    //
    loading.hide();
    contentBody.show();
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function fetchData(url = "", method, data) {
    const token = getCookie("accessToken");
    // Default options are marked with *
    const response = await fetch(url, {
        method: `${method}`, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
