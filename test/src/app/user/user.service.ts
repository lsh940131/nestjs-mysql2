import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private readonly) {}

	async create(CreateUserDto): Promise<any> {}

	async get(id): Promise<any> {}
}
