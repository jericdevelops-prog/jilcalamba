export enum Screen {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  BIBLE = 'BIBLE',
  EVENTS = 'EVENTS',
  NOTES = 'NOTES',
  LIFEGROUP = 'LIFEGROUP',
  MINISTRY = 'MINISTRY',
  CONNECT = 'CONNECT'
}

export enum UserRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
  ADMIN = 'ADMIN'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface LifeGroup {
  id: string;
  name: string;
  leaderName: string;
  schedule: string;
  location: string;
  category: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  isLocked: boolean;
  updatedAt: number;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  hideRegister: boolean;
}

export type Verse = {
  reference: string;
  text: string;
  version: string;
};
