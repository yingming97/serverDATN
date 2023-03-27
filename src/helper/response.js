exports.successResponse = function (res, msg) {
    const data = {
        status: 1,
        message: msg
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
    const resData = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(resData);
};

exports.successResponsePaginationWithData = function (res, msg, page, totalPage, data) {
    const resData = {
        status: 1,
        message: msg,
        currentPage: page,
        totalPage: totalPage,
        data: data
    };
    return res.status(200).json(resData);
};

exports.errorResponse = function (res, msg) {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationError = function (res, msg) {
    const resData = {
        status: 0,
        message: msg,
    };
    return res.status(400).json(resData);
};

exports.validationErrorWithData = function (res, msg, data) {
    const resData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(data);
};

exports.errVerifyToken = function (res,msg) {
    const resData = {
        status: 0,
        message: msg,
    };
    return res.status(403).json(resData);
}