

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

export interface Project {
  _id: string;
  title: string;
  info: string;
  link: string;
  platform: Platform;
  employee: Employee;
  client: Client;
  status: Status;
  company: {_id: string, name: string};
  notification: {
    type: { _id: string, name: string },
    comment: string,
    date: Date
  };
}

export interface CoverLetter {
  _id: string;
  title: string;
  company: {_id: string, name: string};
  letters: [
    {
      _id: string,
      text: string
    }
  ];
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

export interface Time {
  value: string;
  viewValue: string;
}
