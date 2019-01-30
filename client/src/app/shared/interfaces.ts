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

export interface AuthorizedUser {
  _id: string;
  name: string;
  email: string;
  company_id: string;
  company_name: string;
}
