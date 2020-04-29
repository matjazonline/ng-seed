import {environment} from '../../environments/environment';

export interface Account {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  imageUrl: string;
  actorTypes: string[];
  ownerUid: string;
}

export interface Provider {
  medicalEducation: boolean;
  yearsExperience: number;
}

export enum FirebaseChangeType {
  ADDED = 'added', REMOVED = 'removed', MODIFIED = 'modified'
}

export enum ApiNames {
  DB_LIST_PROVIDERS = 'providers',
  DB_LIST_ACCOUNTS = 'accounts',
}

export class Endpoint {
  static FN_HOST_URL = !environment.production ? 'http://localhost:5001' : 'https://us-central1-san-d-or.cloudfunctions.net';
  static FN_BASE_URL = Endpoint.FN_HOST_URL + (!environment.production ? '/san-d-or/us-central1/' : '/');
}

export enum ActorType {
  CARE_TAKER = 'CARE_TAKER',
  CARE_GIVER = 'CARE_GIVER'
}

export interface CareTaker {
  _id: string;
  displayName: string;
  description: string;
}

export interface CareGiver {
  _id: string;
  displayName: string;
  description: string;
}
