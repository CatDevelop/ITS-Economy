import {HOST} from './host';

const SIGN_UP = `${HOST}/Registration.php`;
const SIGN_IN = `${HOST}/Authorization.php`;

const MAKE_TRANSACTION = `${HOST}/MakeTransaction.php`;
const GET_USER = `${HOST}/GetUser.php`;
const GET_USERS = `${HOST}/GetUsers.php`;
const GET_USERS_WITH_BALANCE = `${HOST}/GetUsersWithBalance.php`;

const API = {
    SIGN_UP,
    SIGN_IN,
    MAKE_TRANSACTION,
    GET_USER,
    GET_USERS,
    GET_USERS_WITH_BALANCE
};

export default API;
