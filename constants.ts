import { User, Role, Expense, ApprovalStatus, Company, Department } from './types';

export const MOCK_COMPANY: Company = {
    id: 'comp-1',
    name: 'Innovate Inc.',
    defaultCurrency: 'USD',
    country: 'United States',
};

export const MOCK_DEPARTMENTS: Department[] = [
    { id: 'dept-1', name: 'Engineering', budget: 50000, period: 'monthly' },
    { id: 'dept-2', name: 'Sales', budget: 75000, period: 'monthly' },
    { id: 'dept-3', name: 'Marketing', budget: 40000, period: 'monthly' },
];

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Alice Admin', email: 'admin@example.com', role: Role.ADMIN, companyId: 'comp-1', managerId: null, departmentId: 'dept-1' },
    { id: 'user-2', name: 'Bob Manager', email: 'manager@example.com', role: Role.MANAGER, companyId: 'comp-1', managerId: 'user-1', departmentId: 'dept-1' },
    { id: 'user-3', name: 'Charlie Employee', email: 'employee@example.com', role: Role.EMPLOYEE, companyId: 'comp-1', managerId: 'user-2', departmentId: 'dept-1' },
    { id: 'user-4', name: 'Diana Developer', email: 'dev@example.com', role: Role.EMPLOYEE, companyId: 'comp-1', managerId: 'user-2', departmentId: 'dept-1' },
    { id: 'user-5', name: 'Ethan Sales', email: 'sales@example.com', role: Role.MANAGER, companyId: 'comp-1', managerId: 'user-1', departmentId: 'dept-2' },
];

export const MOCK_EXPENSES: Expense[] = [
    {
        id: 'exp-1',
        userId: 'user-3',
        amount: 150.75,
        currency: 'USD',
        category: 'Travel',
        description: 'Flight to NYC for conference',
        date: '2023-10-15T10:00:00Z',
        status: ApprovalStatus.APPROVED,
        merchant: 'United Airlines',
        approvalWorkflow: [
            { approverId: 'user-2', status: ApprovalStatus.APPROVED, order: 1, comment: 'Looks good.', date: '2023-10-16T11:30:00Z' },
        ],
        auditLog: [
            { actorId: 'user-3', action: 'Submitted', date: '2023-10-15T10:01:00Z' },
            { actorId: 'user-2', action: 'Approved', date: '2023-10-16T11:30:00Z', comments: 'Looks good.' },
        ]
    },
    {
        id: 'exp-2',
        userId: 'user-3',
        amount: 45.50,
        currency: 'USD',
        category: 'Meals',
        description: 'Team Lunch',
        date: '2023-10-16T12:30:00Z',
        status: ApprovalStatus.PENDING,
        merchant: 'The Corner Bistro',
        approvalWorkflow: [
            { approverId: 'user-2', status: ApprovalStatus.PENDING, order: 1 },
        ],
        auditLog: [
            { actorId: 'user-3', action: 'Submitted', date: '2023-10-16T13:00:00Z' },
        ]
    },
    {
        id: 'exp-3',
        userId: 'user-4',
        amount: 899.99,
        currency: 'CAD',
        category: 'Software',
        description: 'IDE License Renewal',
        date: '2023-10-20T15:00:00Z',
        status: ApprovalStatus.PENDING,
        merchant: 'JetBrains',
        approvalWorkflow: [
            { approverId: 'user-2', status: ApprovalStatus.PENDING, order: 1 },
            { approverId: 'user-1', status: ApprovalStatus.PENDING, order: 2 }, // Admin approval needed
        ],
        auditLog: [
            { actorId: 'user-4', action: 'Submitted', date: '2023-10-20T15:05:00Z' },
        ]
    },
    {
        id: 'exp-4',
        userId: 'user-4',
        amount: 1200.00,
        currency: 'EUR',
        category: 'Hardware',
        description: 'New Monitor for Home Office',
        date: '2023-10-22T09:00:00Z',
        status: ApprovalStatus.REJECTED,
        merchant: 'Dell',
        approvalWorkflow: [
            { approverId: 'user-2', status: ApprovalStatus.REJECTED, order: 1, comment: 'Exceeds home office equipment budget.', date: '2023-10-23T14:00:00Z' },
        ],
        auditLog: [
            { actorId: 'user-4', action: 'Submitted', date: '2023-10-22T09:05:00Z' },
            { actorId: 'user-2', action: 'Rejected', date: '2023-10-23T14:00:00Z', comments: 'Exceeds home office equipment budget. Please seek pre-approval for items over 500 EUR.' },
        ]
    },
     {
        id: 'exp-5',
        userId: 'user-3',
        amount: 25.00,
        currency: 'USD',
        category: 'Office Supplies',
        description: 'Notebooks and Pens',
        date: '2023-11-01T11:00:00Z',
        status: ApprovalStatus.PENDING,
        merchant: 'Staples',
        approvalWorkflow: [
            { approverId: 'user-2', status: ApprovalStatus.PENDING, order: 1 },
        ],
        auditLog: [
            { actorId: 'user-3', action: 'Submitted', date: '2023-11-01T11:05:00Z' },
        ]
    },
];

export const EXPENSE_CATEGORIES = ['Travel', 'Meals', 'Software', 'Hardware', 'Office Supplies', 'Utilities', 'Other'];