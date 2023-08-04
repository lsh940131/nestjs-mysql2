import { Inject } from "@nestjs/common";
import { getToken } from "./mysql.util";

export const InjectMysql = (tokenName?: string) => Inject(getToken(tokenName));
