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
  company_id: string;
}