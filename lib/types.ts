export interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
}

export interface AddressData {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface DocumentData {
  file: File | null;
  fileName: string;
  fileSize: string;
  fileType: string;
}

export interface FormData {
  personalInfo: PersonalInfoData;
  address: AddressData;
  document: DocumentData;
}

export type StepId = 1 | 2 | 3 | 4;

export interface Step {
  id: StepId;
  title: string;
  subtitle: string;
  icon: string;
}
