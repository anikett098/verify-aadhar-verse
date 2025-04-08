
export type VerificationTask = {
  id: string;
  name: string;
  instruction: string;
  validateFn?: (result: any) => boolean;
};

export type UserFormData = {
  name: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isNewApplication: boolean;
  existingAadhar?: string;
};

export type VerificationResult = {
  taskId: string;
  completed: boolean;
  timestamp: number;
};
