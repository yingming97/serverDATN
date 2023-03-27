// show modal
async function openBillDetail(value) {
    const result = (await fetchData(`/api/invoice/${value}`, 'GET')).data;
    console.log(result)

    let d = new Date(`${result.updatedAt}`);
    let t = d.toLocaleDateString('en-ZA')

    let status = result.invoiceType;

    setTimeInfoBill(value, t, status, result.totalPrice);
    setInfoProductBill(result.invoiceDetails);
}

function setInfoProductBill(invoiceDetails) {
    console.log(invoiceDetails.length);
    for (let i = 0; i < invoiceDetails.length; i++) {
        let donGia = invoiceDetails[i].price / invoiceDetails[i].quantity;
        let m = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(donGia);
        let m2 = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(invoiceDetails[i].price);

        let html =
            `
                 <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${invoiceDetails[i].product}</td>
                    <td>${invoiceDetails[i].quantity}</td>
                    <td>${m}</td>
                    <td>${m2}</td>
                 </tr>
            `;
        $('#bodyTable').append(html);
    }
}

function setTimeInfoBill(id, timeCreate, status, totalPrice) {
    $('.idBill').text(id);
    $('#timeCreate').text(timeCreate);

    let m = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(totalPrice);

    $('#totalPrice').text(m);
    let st = $('#status');
    switch (status) {
        case 'IMPORT': {
            st.addClass('bg-success');
            st.text(status);
            break;
        }
        case 'EXPORT': {
            st.addClass('bg-info');
            st.text(status);
            break;
        }
        case 'REFUND': {
            st.addClass('bg-warning');
            st.text(status);
            break;
        }

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

async function fetchData(url = "", method) {
    const token = getCookie('accessToken');
    // Default options are marked with *
    const response = await fetch(url, {
        method: `${method}`, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            // "Content-Type": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `${token}`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}