import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { GetLocationDto, ScanQRDto } from './dto/location.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    @ApiOperation({ summary: 'Create a new user account' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 409, description: 'Username or email already exists' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get('location/random')
    @ApiOperation({ summary: 'Get random location by category' })
    @ApiResponse({ status: 200, description: 'Random location returned' })
    @ApiResponse({ status: 404, description: 'No available locations in category' })
    getRandomLocation(@Query('category') category: string, @Query('userId') userId: string) {
        const location = this.usersService.getRandomLocation(category as any, userId);
        if (!location) {
            throw new NotFoundException(`No available locations in category: ${category}`);
        }
        return location;
    }

    @Post('scan-qr/:userId')
    @ApiOperation({ summary: 'Scan QR code to complete location' })
    @ApiResponse({ status: 200, description: 'QR code scanned successfully' })
    @ApiResponse({ status: 400, description: 'Invalid QR code or already completed' })
    scanQR(@Param('userId') userId: string, @Body() scanQRDto: ScanQRDto) {
        return this.usersService.scanQRCode(scanQRDto.qrCode, userId);
    }

    @Get('progress/:userId')
    @ApiOperation({ summary: 'Get user progress and completed locations' })
    @ApiResponse({ status: 200, description: 'User progress returned' })
    getUserProgress(@Param('userId') userId: string) {
        return this.usersService.getUserProgress(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'Username or email already exists' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Get('friends/:userId')
    @ApiOperation({ summary: 'Get user friends' })
    @ApiResponse({ status: 200, description: 'Friends list returned' })
    getUserFriends(@Param('userId') userId: string) {
        return this.usersService.getUserFriends(userId);
    }

    @Post('friends/:userId')
    @ApiOperation({ summary: 'Add friend by username' })
    @ApiResponse({ status: 201, description: 'Friend added successfully' })
    @ApiResponse({ status: 400, description: 'User not found or already friends' })
    addFriend(@Param('userId') userId: string, @Body() body: { username: string }) {
        return this.usersService.addFriend(userId, body.username);
    }

    @Delete('friends/:userId/:friendId')
    @ApiOperation({ summary: 'Remove friend' })
    @ApiResponse({ status: 200, description: 'Friend removed successfully' })
    @ApiResponse({ status: 404, description: 'Friendship not found' })
    removeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.usersService.removeFriend(userId, friendId);
    }

    @Post('friends/challenge/:userId/:friendId')
    @ApiOperation({ summary: 'Challenge a friend' })
    @ApiResponse({ status: 200, description: 'Challenge sent successfully' })
    @ApiResponse({ status: 404, description: 'Friendship not found' })
    challengeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return this.usersService.challengeFriend(userId, friendId);
    }
}