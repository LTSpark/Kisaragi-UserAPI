const UserService = require("../../../services/user.services");

const { errorResponse } = require("../../../utils/responses");
const { parseSort } = require("../../../utils/utils");

const GetUsersFlow = async (req, res) => {

    let { 
        from = 0, 
        limit = 5,
        name,
        sort = "id",
        order = 'asc'
    } = req.query;

    from = Number(from);
    limit = Number(limit);
    sort = parseSort(sort, order);

    const query = { name: new RegExp(name, 'i') };

    try {
        const { total: totalUsers, users } = await UserService.getUsers(query, from, limit, sort);
        return res.status(200).json({ totalUsers, users });
    } 
    catch(error) {
        console.error(error);
        return errorResponse(res, "Getting users failed", error.message);
    }
}

module.exports = GetUsersFlow;
