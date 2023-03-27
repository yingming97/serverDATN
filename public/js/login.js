(function ($) {
    "use strict"; // Start of use strict

    let err = $('#error');
    let loading = $("#loading");

    // login
    $('#btnLogin').click(async function () {

        let phoneNumber = $("#phoneNumber").val();
        let password = $("#password").val();
        //

        if (!phoneNumber) {
            return $('#error').show().text(`Enter your phone number!`);
        }
        if (!password) {
            return $('#error').show().text(`Enter your password!`);
        }
        const body = {
            'phoneNumber': phoneNumber,
            'password': password
        }

        // show loading
        loading.show()
        let result = await postData("/api/login", body);
        if (!result) {
            return alert('Sever error!');
        }
        if (result.status === 1 && result.message === "Success") {
            saveDataToLocalStorage(result.data);
            setCookie("accessToken", result.data.accessToken, 1)
            setCookie("refreshToken", result.data.refreshToken, 1)
            window.location = '/';
        } else {
            loading.hide()
            err.show().text(`${result.message}`);
            // alert(`Error: ${result.message}`);
        }
    });
})(jQuery);

function saveDataToLocalStorage(user) {
    localStorage.setItem('id', user._id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('phoneNumber', user.phoneNumber);
    localStorage.setItem('email', user.email);
    localStorage.setItem('linkAvt', user.linkAvt);
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}





