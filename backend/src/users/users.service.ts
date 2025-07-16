import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
}

export interface Location {
    id: string;
    name: string;
    category: 'sports' | 'nightlife' | 'culture';
    latitude: number;
    longitude: number;
    description: string;
    qrCode: string;
    imageUrl: string;
}

export interface UserLocation {
    userId: string;
    locationId: string;
    completedAt: string;
}

export interface Friend {
    userId: string;
    friendId: string;
    friendUsername: string;
    addedAt: string;
}

const LOCATIONS: Location[] = [
    // Sports locations
    {
        id: 'sports_001',
        name: 'Mittweida Sports Center',
        category: 'sports',
        latitude: 50.9866,
        longitude: 12.9714,
        description: 'Modern sports facility at the university campus with basketball courts and gym',
        qrCode: 'SPORTS_001_QR',
        imageUrl: 'https://www.mittweida.de/fileadmin/_processed_/e/9/csm_dreifeldhalle_dfda6cfc82.jpg'
    },
    {
        id: 'sports_002',
        name: 'Zschopauer Mulde Riverside Trail',
        category: 'sports',
        latitude: 50.9812,
        longitude: 12.9743,
        description: 'Scenic jogging and cycling path along the Zschopauer Mulde river',
        qrCode: 'SPORTS_002_QR',
        imageUrl: 'https://cloudfront-eu-central-1.images.arcpublishing.com/madsack/TZVTUFJET5PSCBQXPE4NYXFASM.jpg'
    },
    {
        id: 'sports_003',
        name: 'Mittweida Football Stadium',
        category: 'sports',
        latitude: 50.9902,
        longitude: 12.9681,
        description: 'Local football stadium where FSV Mittweida plays their home games',
        qrCode: 'SPORTS_003_QR',
        imageUrl: 'https://lh6.googleusercontent.com/proxy/M7UdIGVF5WCKpDyecV4mz5EbVd9k_okwCv_clBfhb32r_IeybRCAVzUwjCsJyZkmisV92ieCAFv2bO6WuZegNGFVb1J38RlIz3Hf3_mA9JQdKgOeFK9w3fvLj3U'
    },
    // Nightlife locations
    {
        id: 'nightlife_001',
        name: 'Studentenclub Red',
        category: 'nightlife',
        latitude: 50.9855,
        longitude: 12.9701,
        description: 'Popular student club near the university with live music and parties',
        qrCode: 'NIGHTLIFE_001_QR',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Mittweida-Studentenclub.jpg/1200px-Mittweida-Studentenclub.jpg'
    },
    {
        id: 'nightlife_002',
        name: 'Café Bar Central',
        category: 'nightlife',
        latitude: 50.9841,
        longitude: 12.9732,
        description: 'Cozy bar in the town center, perfect for evening drinks and conversations',
        qrCode: 'NIGHTLIFE_002_QR',
        imageUrl: 'https://img.restaurantguru.com/c47f-Irish-Pub-Mittweida-bar-counter.jpg'
    },
    {
        id: 'nightlife_003',
        name: 'Ratskeller Mittweida',
        category: 'nightlife',
        latitude: 50.9849,
        longitude: 12.9728,
        description: 'Traditional German pub in the historic town hall basement',
        qrCode: 'NIGHTLIFE_003_QR',
        imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/ba/d5/4e/ratskeller-waldheim.jpg?w=900&h=500&s=1'
    },
    // Culture locations
    {
        id: 'culture_001',
        name: 'Mittweida Castle Museum',
        category: 'culture',
        latitude: 50.9847,
        longitude: 12.9739,
        description: 'Historic castle showcasing local history and medieval artifacts',
        qrCode: 'CULTURE_001_QR',
        imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/52/b8/aa/schloss-neusorge.jpg?w=500&h=500&s=1'
    },
    {
        id: 'culture_002',
        name: 'St. Laurentius Church',
        category: 'culture',
        latitude: 50.9836,
        longitude: 12.9721,
        description: 'Beautiful medieval church in the heart of Mittweida\'s old town',
        qrCode: 'CULTURE_002_QR',
        imageUrl: 'https://www.pfarrei-edithstein.de/wp-content/uploads/2020/05/kirche-mittweida-aussen.jpg'
    },
    {
        id: 'culture_003',
        name: 'University of Applied Sciences Gallery',
        category: 'culture',
        latitude: 50.9871,
        longitude: 12.9708,
        description: 'Contemporary art gallery featuring student and local artist exhibitions',
        qrCode: 'CULTURE_003_QR',
        imageUrl: 'https://www.ausland.hs-mittweida.de/fileadmin/_processed_/6/8/csm__KUR3925-Bearbeitet_fadac53a69.jpg'
    }
];

@Injectable()
export class UsersService {
    private readonly dataPath = path.join(process.cwd(), 'src', 'data', 'users.json');
    private readonly userLocationsPath = path.join(process.cwd(), 'src', 'data', 'user-locations.json');
    private readonly friendsPath = path.join(process.cwd(), 'src', 'data', 'friends.json');

    constructor() {
        this.ensureDataFileExists();
        this.ensureUserLocationsFileExists();
        this.ensureFriendsFileExists();
    }

    private ensureDataFileExists(): void {
        const dataDir = path.dirname(this.dataPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(this.dataPath)) {
            fs.writeFileSync(this.dataPath, '[]');
        }
    }

    private ensureUserLocationsFileExists(): void {
        if (!fs.existsSync(this.userLocationsPath)) {
            fs.writeFileSync(this.userLocationsPath, '[]');
        }
    }

    private ensureFriendsFileExists(): void {
        if (!fs.existsSync(this.friendsPath)) {
            fs.writeFileSync(this.friendsPath, '[]');
        }
    }

    private readUsers(): User[] {
        try {
            const data = fs.readFileSync(this.dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    private writeUsers(users: User[]): void {
        fs.writeFileSync(this.dataPath, JSON.stringify(users, null, 2));
    }

    private readUserLocations(): UserLocation[] {
        try {
            const data = fs.readFileSync(this.userLocationsPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    private writeUserLocations(userLocations: UserLocation[]): void {
        fs.writeFileSync(this.userLocationsPath, JSON.stringify(userLocations, null, 2));
    }

    private readFriends(): Friend[] {
        try {
            const data = fs.readFileSync(this.friendsPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    private writeFriends(friends: Friend[]): void {
        fs.writeFileSync(this.friendsPath, JSON.stringify(friends, null, 2));
    }

    async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const users = this.readUsers();

        // Check if username or email already exists
        const existingUser = users.find(user =>
            user.username === createUserDto.username ||
            user.email === createUserDto.email
        );

        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Create new user
        const newUser: User = {
            id: Date.now().toString(),
            username: createUserDto.username,
            email: createUserDto.email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        this.writeUsers(users);

        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async login(loginDto: LoginDto): Promise<Omit<User, 'password'>> {
        const users = this.readUsers();
        const user = users.find(u => u.username === loginDto.username);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    findAll(): Omit<User, 'password'>[] {
        const users = this.readUsers();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }

    findOne(id: string): Omit<User, 'password'> {
        const users = this.readUsers();
        const user = users.find(u => u.id === id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
        const users = this.readUsers();
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }

        // Check if username or email already exists (excluding current user)
        if (updateUserDto.username || updateUserDto.email) {
            const existingUser = users.find(user =>
                    user.id !== id && (
                        user.username === updateUserDto.username ||
                        user.email === updateUserDto.email
                    )
            );

            if (existingUser) {
                throw new ConflictException('Username or email already exists');
            }
        }

        const updatedUser = { ...users[userIndex] };

        if (updateUserDto.username) updatedUser.username = updateUserDto.username;
        if (updateUserDto.email) updatedUser.email = updateUserDto.email;
        if (updateUserDto.password) {
            updatedUser.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        users[userIndex] = updatedUser;
        this.writeUsers(users);

        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    remove(id: string): void {
        const users = this.readUsers();
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }

        users.splice(userIndex, 1);
        this.writeUsers(users);
    }

    // NEW LOCATION METHODS
    getRandomLocation(category: 'sports' | 'nightlife' | 'culture', userId: string): Location | null {
        // Get locations for the category
        const categoryLocations = LOCATIONS.filter(loc => loc.category === category);

        // Get user's completed locations
        const userLocations = this.readUserLocations();
        const completedLocationIds = userLocations
            .filter(ul => ul.userId === userId)
            .map(ul => ul.locationId);

        // Filter out completed locations
        const availableLocations = categoryLocations.filter(loc =>
            !completedLocationIds.includes(loc.id)
        );

        // If no available locations, return null
        if (availableLocations.length === 0) {
            return null;
        }

        // Return random available location
        const randomIndex = Math.floor(Math.random() * availableLocations.length);
        return availableLocations[randomIndex];
    }

    scanQRCode(qrCode: string, userId: string): { success: boolean; message: string; progress?: number } {
        // Find location by QR code
        const location = LOCATIONS.find(loc => loc.qrCode === qrCode);

        if (!location) {
            return { success: false, message: 'Invalid QR code' };
        }

        // Check if user already completed this location
        const userLocations = this.readUserLocations();
        const alreadyCompleted = userLocations.some(ul =>
            ul.userId === userId && ul.locationId === location.id
        );

        if (alreadyCompleted) {
            return { success: false, message: 'Location already completed' };
        }

        // Add completed location
        const newUserLocation: UserLocation = {
            userId,
            locationId: location.id,
            completedAt: new Date().toISOString()
        };

        userLocations.push(newUserLocation);
        this.writeUserLocations(userLocations);

        // Calculate progress (completed locations / total locations * 100)
        const userCompletedCount = userLocations.filter(ul => ul.userId === userId).length;
        const progress = Math.round((userCompletedCount / LOCATIONS.length) * 100);

        return {
            success: true,
            message: `Congratulations! You completed ${location.name}!`,
            progress
        };
    }

    getUserProgress(userId: string): { completed: number; total: number; percentage: number; completedLocations: Location[] } {
        const userLocations = this.readUserLocations();
        const userCompletedLocationIds = userLocations
            .filter(ul => ul.userId === userId)
            .map(ul => ul.locationId);

        const completedLocations = LOCATIONS.filter(loc =>
            userCompletedLocationIds.includes(loc.id)
        );

        return {
            completed: userCompletedLocationIds.length,
            total: LOCATIONS.length,
            percentage: Math.round((userCompletedLocationIds.length / LOCATIONS.length) * 100),
            completedLocations
        };
    }

    // FRIENDS METHODS
    getUserFriends(userId: string): Friend[] {
        const friends = this.readFriends();
        return friends.filter(friend => friend.userId === userId);
    }

    addFriend(userId: string, friendUsername: string): { success: boolean; message: string; friend?: Friend } {
        // Find the friend by username
        const users = this.readUsers();
        const friendUser = users.find(user => user.username === friendUsername);

        if (!friendUser) {
            return { success: false, message: 'User not found' };
        }

        if (friendUser.id === userId) {
            return { success: false, message: 'Cannot add yourself as friend' };
        }

        // Check if already friends
        const friends = this.readFriends();
        const existingFriendship = friends.find(f =>
            f.userId === userId && f.friendId === friendUser.id
        );

        if (existingFriendship) {
            return { success: false, message: 'Already friends with this user' };
        }

        // Add friendship
        const newFriend: Friend = {
            userId,
            friendId: friendUser.id,
            friendUsername: friendUser.username,
            addedAt: new Date().toISOString()
        };

        friends.push(newFriend);
        this.writeFriends(friends);

        return { success: true, message: 'Friend added successfully', friend: newFriend };
    }

    removeFriend(userId: string, friendId: string): { success: boolean; message: string } {
        const friends = this.readFriends();
        const friendIndex = friends.findIndex(f =>
            f.userId === userId && f.friendId === friendId
        );

        if (friendIndex === -1) {
            return { success: false, message: 'Friendship not found' };
        }

        friends.splice(friendIndex, 1);
        this.writeFriends(friends);

        return { success: true, message: 'Friend removed successfully' };
    }

    challengeFriend(userId: string, friendId: string): { success: boolean; message: string } {
        // Check if friendship exists
        const friends = this.readFriends();
        const friendship = friends.find(f =>
            f.userId === userId && f.friendId === friendId
        );

        if (!friendship) {
            return { success: false, message: 'Not friends with this user' };
        }

        // In a real app, you might store challenges in a database
        // For now, we'll just return success
        return {
            success: true,
            message: `Challenge sent to ${friendship.friendUsername}!`
        };
    }
}