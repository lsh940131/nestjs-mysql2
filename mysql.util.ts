import { MYSQL_DEFAULT_TOKEN_NAME } from "./mysql.constants";

export const getToken = (tokenName: string = MYSQL_DEFAULT_TOKEN_NAME) => tokenName;
