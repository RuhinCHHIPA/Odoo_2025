export enum Role {
    ADMIN = 'Admin',
    MANAGER = 'Manager',
    EMPLOYEE = 'Employee',
}

export enum ApprovalStatus {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    password?: string; // Added for authentication
    managerId?: string | null;
    companyId: string;
    departmentId?: string;
}

export interface Department {
    id: string;
    name: string;
    budget: number;
    period: 'monthly' | 'quarterly';
}

export interface ApprovalStep {
    approverId: string;
    status: ApprovalStatus;
    comment?: string;
    date?: string;
    order: number;
}

export interface Expense {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    category: string;
    description: string;
    date: string; // ISO string
    status: ApprovalStatus; // Overall status, derived from approvalWorkflow
    receiptUrl?: string;
    merchant?: string;
    approvalWorkflow: ApprovalStep[];
    auditLog?: { actorId: string; action: string; date: string; comments?: string }[];
}

export interface Company {
    id: string;
    name: string;
    defaultCurrency: string;
    country: string;
}