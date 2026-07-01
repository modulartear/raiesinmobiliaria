export type PropertyImage = {
  url?: string;
  path?: string;
  label?: string;
};

export type PropertyRecord = {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: string;
  status: string;
  featured: boolean;
  neighborhood?: string;
  city?: string;
  description?: string;
  services?: string[];
  docs?: string[];
  features?: { icon: string; label: string; val: string }[];
  images?: PropertyImage[];
};

export type ConsultationRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  msg: string;
  canal: string;
  estado: string;
  propertyTitle: string;
  createdAt: Date;
};

export type RentalRequestRecord = {
  id: string;
  name: string;
  propertyTitle: string;
  fecha: string;
  ingreso: string;
  status: string;
};

export type TenantRecord = {
  id: string;
  name: string;
  dni: string;
  prop: string;
  desde: string;
  estado: string;
};

export type DocumentRecord = {
  id: string;
  inquilino: string;
  doc: string;
  fecha: string;
  estado: string;
  icon: string;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  rol: string;
  estado: string;
  notif?: boolean[];
};

export type RequirementRecord = {
  label: string;
  desc: string;
  on: boolean;
};

export type SettingsRecord = {
  name: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
};

export type VerificationOptionConfig = {
  key: "op1" | "op2";
  title: string;
  tenantPayslipRequired: boolean;
  guarantorPayslipsMin: number;
  guarantorSeniorityYearsMin: number;
  deedRequired: boolean;
  deedLocationLabel?: string;
};

export type VerificationConfig = {
  options: VerificationOptionConfig[];
  preApprovedMessage: string;
};
