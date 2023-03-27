(function ($) {
    "use strict"; // Start of use strict

    let err = $('#error');
    let loading = $("#loading");

    $('#btnRegister').click(async function () {
        loading.show();
        let name = $('#name').val();
        let email = $('#email').val();
        let phoneNumber = $('#phoneNumber').val();
        let password = $('#password').val();
        let rePassword = $('#rePassword').val();

        let validate = validateForm(err, name, email, phoneNumber, password, rePassword);
        if (validate) {
            loading.hide();
            err.show().text(validate);
        } else {
            const body = {
                'name': name,
                'password': password,
                'email': email,
                'phoneNumber': phoneNumber,
                'status': 'true',
                'role': 'staff',
                'deviceId': '12345',
            };
            const result = await postData('/api/register', body);
            console.log(result)
            if (!result) {
                return alert("Server error!");
            }
            if (result.status === 1) {
                alert('Register success!')
                window.location = './login';
            } else {
                loading.hide()
                err.show().text(`${result.message}`);
            }
        }


    })

})(jQuery);

function validateForm(err, name, email, phoneNumber, password, rePassword) {
    if (!name) {
        return "Enter your name!";
    }
    if (!email) {
        return "Enter your email!";
    }
    if (!validateEmail(email)) {
        return "Invalid email!";
    }
    if (!phoneNumber) {
        return "Enter your phone number!";
    }
    if (!validatePhone(phoneNumber)) {
        return "Invalid phone number!";
    }
    if (!password) {
        return " Enter your password!";
    }
    if (!rePassword) {
        return "Enter your re password!";
    }
    if (password !== rePassword) {
        return "Password not equal re password!";
    }
    return null;
}

function validatePhone(phone) {
    let regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})/;
    return !!phone.match(regPhone);
}

function validateEmail(email) {
    const regexEmail = /([-!#-'*+/-9=?A-Z^-~]+(\\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\\.[-!#-'*+/-9=?A-Z^-~]+)*|\\[[\\t -Z^-~]*])/;
    return !!email.match(regexEmail);
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