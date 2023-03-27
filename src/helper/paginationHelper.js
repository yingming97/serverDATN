exports.getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = (page - 1) * limit;
    return {limit, offset};
};

