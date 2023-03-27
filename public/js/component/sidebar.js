(function ($) {
    "use strict"
    $(function () {
        let path = location.pathname.slice(1);
        let position = path.search("/");

        if (position > 0) {
            let path2 = path.slice(0, position);
            setActive(path2)
        } else {
            setActive(path)
        }
    })

    function setActive(idElement) {
        if (idElement !== "") {
            $(`#${idElement}`).addClass('active');
        } else {
            $(`#homePage`).addClass('active');
        }
    }
})(jQuery)
