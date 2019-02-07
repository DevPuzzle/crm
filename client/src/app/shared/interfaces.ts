export interface ResponseToken {
  token: string;
  userId: string;
}

export interface HeaderLink {
  link: string;
  label: string;
  icon?: string;
}

export interface Employee {
  _id: string;
  email: string;
  name: string;
  last_name: string;
  skills: string;
  company: {_id: string, name: string};
}

export interface Client {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  sype: string;
  comment: string;
  company: {_id: string, name: string};
}

export interface AuthorizedUser {
  _id: string;
  name: string;
  email: string;
  company_id: string;
  company_name: string;
}

export interface Platform {
  _id: string;
  name: string;
}

export interface Status {
  _id: string;
  name: string;
}

export interface NotificationType {
  _id: string;
  name: string;
}

export interface StaticData {
  clients: Client[];
  employees: Employee[];
  platforms: Platform[];
  statuses: Status[];
  not_types: NotificationType[];
}

export interface Hour {
  value: string;
  viewValue: string;
}

export interface Minute {
  value: string;
  viewValue: string;
}
