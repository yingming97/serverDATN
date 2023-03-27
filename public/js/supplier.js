$(document).ready(function () {
    $("#modalDetailSupplier").on("hidden.bs.modal", function () {
        $("#loadDetailSupplier").show();
    });
});

async function fetchAddNewSupplier(body) {
    return await fetchData('/api/supplier', 'POST', body);
}

async function fetchGetASupplier(id) {
    return await fetchData(`/api/supplier/${id}`, 'GET');
}

async function fetchUpdateASupplier(id, body) {
    return await fetchData(`/api/supplier/${id}`, 'PUT', body);
}

async function openDetailSupplierModal(id) {
    let contentDetailSupplier = $('.modal-body').hide();
    $('#modalDetailSupplier').modal('show');
    const res = await fetchGetASupplier(id);
    $('.spinner-border').hide();
    contentDetailSupplier.show();

    if (res.status === 1) {
        $('#idSupplier').text(res.data._id);
        $('#nameSupplierA').text(res.data.supplierName);
        $('#phoneNumberSupplierA').text(res.data.phoneNumber);
        console.log(res.data.supplierName, res.data.phoneNumber);

    } else {
        alert(res.message);
    }
    // onclick

    $('#btnShowModalUpdateSupplier').click(async function () {
        await openSupplierModalAddAndUpdate(id);
    })

    $('#btnShowModalDeleteSupplier').click(async function () {
        await openDeleteSupplierModal(id);
    })

}

async function openDeleteSupplierModal(id) {
    $('#modalDetailSupplier').hide();
    $("#modalConfirmDelete").modal("show");
    $(".titleConfirmDelete").text("Bạn muốn xóa nhà cung cấp này?");
    $("#btnConfirmDelete").click(async function () {
        $("#loading").show();
        const result = await fetchData(`/api/supplier/${id}`, "DELETE");
        if (result) {
            if (result.status === 1) {
                alert(result.message);
                location.reload();
            } else {
                alert(result.message);
            }
        } else {
            alert("Server error!");
        }
    });
}

function addNewSupplier(title) {
    // ADD NEW SUPPLIER
    $('#loadingSupplier').hide();
    let btnAddSupplier = $('#btnAddSupplier');
    let loading = $('#loadingAddSupplier').hide();
    title.text('Thêm mới nhà cung cấp');
    $('#modalSupplier').modal('show');
    $('#btnUpdateSupplier').hide();
    btnAddSupplier.show();
    btnAddSupplier.click(async function () {
        loading.show();
        let nameSupplier = $('#nameSupplier').val();
        let phoneSupplier = $('#phoneNumberSupplier').val();
        const body = {
            supplierName: nameSupplier,
            phoneNumber: phoneSupplier
        }
        const resultAdd = await fetchAddNewSupplier(body);
        loading.hide();
        if (!resultAdd) {
            alert('Server error ' + resultAdd.message);
        } else {
            if (resultAdd.status === 1) {
                alert('Thêm mới nhà cung cấp thành công!');
                location.reload();
            } else {
                alert(resultAdd.message);
            }
        }
    });
}

async function updateSupplier(title, value) {
    // update supplier
    $('#modalDetailSupplier').modal('hide');
    $('#modalSupplier').modal('show');
    //
    $('#btnAddSupplier').hide();
    let btnUpdate = $('#btnUpdateSupplier').show();
    let loading = $('#loadingSupplier').show();
    let body = $('.modal-body').hide();
    $('#titleModalSupplier').text('Cập nhật nhà cung cấp');
    //
    const detailSupplier = await fetchGetASupplier(value);
    loading.hide();
    if (detailSupplier.status === 1) {
        body.show();
        $('#nameSupplier').val(detailSupplier.data.supplierName)
        $('#phoneNumberSupplier').val(detailSupplier.data.phoneNumber);
    } else {
        alert('Load supplier detail err ' + detailSupplier.message);
    }
    //onclick
    btnUpdate.click(async function () {
        let loadingUpdate = $('#loadingUpdate');
        loadingUpdate.show();
        let nameSupplier = $('#nameSupplier').val();
        let phoneSupplier = $('#phoneNumberSupplier').val();
        const body = {
            supplierName: nameSupplier,
            phoneNumber: phoneSupplier
        }
        const resultUpdate = await fetchUpdateASupplier(value, body);
        loadingUpdate.hide();
        if (!resultUpdate) {
            alert('Server error ' + resultUpdate.message);
        } else {
            if (resultUpdate.status === 1) {
                alert('Cập nhật nhà cung cấp thành công!');
                location.reload();
            } else {
                alert(resultUpdate.message);
            }
        }
    })
}

async function openSupplierModalAddAndUpdate(value) {
    let title = $('#titleModalSupplier');
    if (!value) {
        addNewSupplier(title);
    } else {
        await updateSupplier(title, value)
    }

}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function fetchData(url = "", method, data) {
    const token = getCookie('accessToken');
    // Default options are marked with *
    const response = await fetch(url, {
        method: `${method}`, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `${token}`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
