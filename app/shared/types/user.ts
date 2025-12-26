export type UserRole = 'USER' | 'TEACHER';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    profile: Profile;
}

export interface Profile {
    id: string;
    about: string;
    avatarUrl: string;
}
