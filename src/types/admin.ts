export interface Admin {
  adminId: number;
  username: string;
  name: string;
  birth: string;
  signupDate: string;
}

export interface PendingAdmin {
  username: string;
  name: string;
  birth: string;
  signupDate: string;
}

export interface AdminListResponse {
  admins: Admin[];
  pendingAdmins: PendingAdmin[];
  totalAdmins: number;
  totalPending: number;
} 