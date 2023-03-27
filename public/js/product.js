$(document).ready(function () {
    $("#modalUpdateProduct").on("hidden.bs.modal", function () {
        $("#industryOption").children("option").remove();
        $("#supplierOption").children("option").remove();
    });

    $("#btnAdd").click(async function () {
        await addProduct();
    });
    $("#btnUpdate").click(async function () {
        await updateProduct();
    });
});
Date.prototype.toDateInputValue = function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

async function addProduct() {
    let loading = $("#loadingAddPro").show();
    let barCode = $("#addBarCode").val();
    let nameProduct = $("#nameProduct").val();
    let industry = $("#industryOption option:selected").val();
    let supplier = $("#supplierOption option:selected").val();

    // console.log(nameProduct, industry, supplier, quality, importPrice, sellPrice, importDate, expDate)

    const body = {
        productName: nameProduct,
        barcode: barCode,
        industry: industry,
        supplier: supplier,
    };

    const result = await fetchData("api/product", "POST", body);
    if (!result) {
        alert("Server error!");
    } else {
        loading.hide();
        if (result.status === 1) {
            alert("Them san pham thanh cong!");
            //   openSuccessModal("Them san pham thanh cong!");
            location.reload();
        } else {
            alert("Them san pham that bai " + result.message);
            // openSuccessModal("Them san pham that bai " + result.message);
        }
    }

    console.log(result);
}

function openConfirmDeleteModal(id) {
    $("#modalConfirmDelete").modal("show");
    $(".titleConfirmDelete").text("Bạn muốn xóa sản phẩm này?");
    $("#btnConfirmDelete").click(async function () {
        $("#loading").show();
        const result = await fetchData(`/api/product/${id}`, "DELETE");
        if (result) {
            if (result.status === 1) {
                alert(result.message);
                window.location = "/product";
            } else {
                alert(result.message);
            }
        } else {
            alert("Server error!");
        }
    });
}

async function setIndustryOption(industryId) {
    const industries = await fetchData("/api/industry", "GET");
    if (industries.status === 1) {
        const dataIndustry = industries.data;
        let industryHtml = ``;
        if (dataIndustry.length > 0) {
            for (let i = 0; i < dataIndustry.length; i++) {
                if (industryId && dataIndustry[i]._id === industryId) {
                    industryHtml += `<option value="${dataIndustry[i]._id}" selected>${dataIndustry[i].industryName}</option>`;
                } else {
                    industryHtml += `<option value="${dataIndustry[i]._id}">${dataIndustry[i].industryName}</option>`;

                }
            }
        } else {
            industryHtml += `<option value="">Không có ngành hàng</option>`;
        }
        $("#industryOption").append(industryHtml);
        console.log(dataIndustry);
    }
}

async function setSupplierOption(supplierId) {
    const suppliers = await fetchData("/api/supplier", "GET");
    if (suppliers.status === 1) {
        const dataSupplier = suppliers.data;
        let supplierHtml = ``;
        if (dataSupplier.length > 0) {
            for (let i = 0; i < dataSupplier.length; i++) {
                if (supplierId && dataSupplier[i]._id === supplierId) {
                    supplierHtml += `<option value="${dataSupplier[i]._id}" selected>${dataSupplier[i].supplierName}</option>`;
                } else {
                    supplierHtml += `<option value="${dataSupplier[i]._id}">${dataSupplier[i].supplierName}</option>`;
                }
            }
        } else {
            supplierHtml += `<option value="">Hãy thêm mới nhà cung cấp</option>`;
        }
        $("#supplierOption").append(supplierHtml);
        console.log(dataSupplier);
    }
}

async function openAddProductModal(value) {
    let loading = $('.spinner-border');
    let bodyCard = $('.modal-body');
    if (!value) {
        bodyCard.hide();
        $("#modalUpdateProduct").modal("show");
        // hide btn update
        $("#btnUpdate").hide();
        // set id product
        // let idProduct = $("#barcode").text();
        // $("#barcodeUpdate").text(`${idProduct}`);
        //
        $("#titleModal").text("Thêm mới sản phẩm");
        // set industry
        await setIndustryOption();
        // set supplier
        await setSupplierOption();
        // set date import today
        $("#importDate,#expDate").val(new Date().toDateInputValue());
        loading.hide();
        bodyCard.show();
    } else {
        bodyCard.hide();
        $("#modalUpdateProduct").modal("show");
        // hide btn update
        $("#btnAdd").hide();
        //
        const result = (await fetchData(`/api/product/${value}`, 'GET')).data;
        console.log(result)
        // set id
        $("#barcodeUpdate").text(`${result._id}`);
        //set name product
        $("#nameProduct").val(result.productName);
        //set barcode product
        $("#addBarCode").val(result.barcode);
        // set industry
        await setIndustryOption(result.industry._id);
        // set supplier
        await setSupplierOption(result.supplier._id);
        loading.hide();
        bodyCard.show();
    }
}

function showElementWhenLoadData() {

}

async function updateProduct() {
    let id = $("#barcodeUpdate").text();
    let loading = $("#loadingUpdatePro").show();
    let barCode = $("#addBarCode").val();
    let nameProduct = $("#nameProduct").val();
    let industry = $("#industryOption option:selected").val();
    let supplier = $("#supplierOption option:selected").val();

    const body = {
        productName: nameProduct,
        barcode: barCode,
        industry: industry,
        supplier: supplier,
    };

    const resultUpdate = await fetchData(`/api/product/${id}`, 'PUT', body);
    if (!resultUpdate) {
        alert('Server error!');
    } else {
        loading.hide();
        if (resultUpdate.status === 1) {
            alert('Cập nhật thành công!')
            location.reload();
        } else {
            alert('Cập nhật thất bại!' + resultUpdate.message);
        }
    }

    $("#modalUpdateProduct").modal("hide");
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
