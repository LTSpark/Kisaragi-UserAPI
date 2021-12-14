const { Router } = require('express');

//PostUser Flow and Validators
const PostUserFlow = require('../apis/users/postUser/flow');
const PostUserValidators = require('../apis/users/postUser/validators');

//Login Flow and Validators
const LoginUserFlow = require('../apis/users/loginUser/flow');
const LoginUserValidators = require('../apis/users/loginUser/validators');

//GetUser Flow and Validators
const GetUserFlow = require('../apis/users/getUser/flow');
const GetUserValidators = require('../apis/users/getUser/validators');

//GetUsers Flow and Validators
const GetUsersFlow = require('../apis/users/getUsers/flow');
const GetUsersValidators = require('../apis/users/getUsers/validators');

const DeleteUserFlow = require('../apis/users/deleteUser/flow');
const DeleteUserValidators = require('../apis/users/deleteUser/validators');

//putUser Flow and Validators
const PutUserFlow = require('../apis/users/putUser/flow');
const PutUserValidators = require('../apis/users/putUser/validators');


const router = Router();

router.post('/', PostUserValidators, PostUserFlow);
router.post('/login', LoginUserValidators, LoginUserFlow);

router.get('/:id', GetUserValidators, GetUserFlow);
router.get('/', GetUsersValidators, GetUsersFlow);

router.delete('/', DeleteUserValidators, DeleteUserFlow);
router.put('/', PutUserValidators, PutUserFlow);

module.exports = router;
