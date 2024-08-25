import { LaravelModelType } from "@clarion-app/types";

export interface GroupType extends LaravelModelType {
    name: string;
    group_type: 'friend' | 'business';
}

export interface ContactType extends LaravelModelType {
    user_id: string;
    name: string;
    type: 'personal' | 'business';
}

export interface PhoneType extends LaravelModelType {
    contact_id: string;
    phone_number: string;
    label: string;
}

export interface EmailType extends LaravelModelType {
    contact_id: string;
    email_address: string;
    label: string;
}