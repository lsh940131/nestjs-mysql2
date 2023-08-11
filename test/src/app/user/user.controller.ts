import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/')
	create(@Body() body: CreateUserDto) {
		return this.userService.create(body);
	}

	@Get('/:id')
	get(@Param('id') id: number) {
		return this.userService.get(id);
	}
}
