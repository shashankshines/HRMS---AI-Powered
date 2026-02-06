export interface Policy {
    id: string;
    category: string;
    title: string;
    documentName: string;
    section: string;
    content: string;
    conditions?: string[];
    effectiveDate: string;
    version: string;
}

export const policies: Policy[] = [
    // Leave & Attendance
    {
        id: 'leave-1',
        category: 'Leave & Attendance',
        title: 'Casual Leave Entitlement',
        documentName: 'Employee Handbook v3.2',
        section: '5.1 – Leave Policy',
        content: 'Employees are entitled to 12 days of casual leave per calendar year.',
        conditions: [
            'Cannot be carried forward',
            'Must be approved by the reporting manager',
            'Applicable after successful completion of 3 months'
        ],
        effectiveDate: '2025-01-01',
        version: '3.2'
    },
    {
        id: 'leave-2',
        category: 'Leave & Attendance',
        title: 'Sick Leave Policy',
        documentName: 'Employee Handbook v3.2',
        section: '5.2 – Sick Leave',
        content: 'Employees are entitled to 10 days of sick leave per calendar year. Sick leave exceeding 3 consecutive days requires a medical certificate.',
        conditions: [
            'Medical certificate required for 3+ consecutive days',
            'Can be used in half-day increments',
            'Unused sick leave can be carried forward up to 30 days'
        ],
        effectiveDate: '2025-01-01',
        version: '3.2'
    },

    // Exit & Separation
    {
        id: 'exit-1',
        category: 'Exit & Separation',
        title: 'Notice Period',
        documentName: 'Employee Handbook v3.2',
        section: '8.2 – Resignation',
        content: 'The standard notice period for all permanent employees is 90 days (3 months).',
        conditions: [
            'Waiver of notice period is subject to management approval',
            'Leave cannot be adjusted against the notice period unless specifically approved',
            'Employee must complete a formal handover of all company assets'
        ],
        effectiveDate: '2025-01-01',
        version: '3.2'
    },
    {
        id: 'exit-2',
        category: 'Exit & Separation',
        title: 'Full & Final Settlement',
        documentName: 'Employee Handbook v3.2',
        section: '8.4 – Settlement',
        content: 'Full and final settlement will be processed within 45 days of the last working day, subject to completion of all clearances.',
        conditions: [
            'All company assets must be returned',
            'Exit interview must be completed',
            'Knowledge transfer documentation required'
        ],
        effectiveDate: '2025-01-01',
        version: '3.2'
    },

    // Remote & Hybrid Work
    {
        id: 'remote-1',
        category: 'Remote & Hybrid Work',
        title: 'WFH During Probation',
        documentName: 'Remote Work Policy 2024',
        section: '1.4 – Eligibility',
        content: 'Work from home is generally not permitted during the first 3 months of probation to ensure proper onboarding and integration.',
        conditions: [
            'Exceptions may be granted for medical emergencies with documentation',
            'Reporting manager approval is required for any temporary deviation'
        ],
        effectiveDate: '2024-06-01',
        version: '2.0'
    },
    {
        id: 'remote-2',
        category: 'Remote & Hybrid Work',
        title: 'Hybrid Work Schedule',
        documentName: 'Remote Work Policy 2024',
        section: '2.1 – Hybrid Model',
        content: 'Employees are expected to work from office a minimum of 3 days per week. Remote work days should be coordinated with your team.',
        conditions: [
            'Core office days may be mandated by department heads',
            'Wednesdays are typically designated as collaboration days',
            'VPN must be used for all remote work'
        ],
        effectiveDate: '2024-06-01',
        version: '2.0'
    },

    // Employee Handbook (General)
    {
        id: 'handbook-1',
        category: 'Employee Handbook',
        title: 'Working Hours',
        documentName: 'Employee Handbook v3.2',
        section: '3.1 – Work Schedule',
        content: 'Standard working hours are 9:00 AM to 6:00 PM, Monday to Friday, with a 1-hour lunch break. Flexible timing is available with manager approval.',
        conditions: [
            'Core hours are 10:00 AM to 5:00 PM',
            'Overtime must be pre-approved',
            'Minimum 8 hours of work per day expected'
        ],
        effectiveDate: '2025-01-01',
        version: '3.2'
    },

    // Code of Conduct
    {
        id: 'conduct-1',
        category: 'Code of Conduct',
        title: 'Professional Behavior',
        documentName: 'Code of Conduct Policy',
        section: '1.1 – General Conduct',
        content: 'All employees are expected to maintain professional behavior, treat colleagues with respect, and uphold the company\'s values in all interactions.',
        conditions: [
            'Zero tolerance for harassment or discrimination',
            'Confidential information must be protected',
            'Personal social media should not reflect negatively on the company'
        ],
        effectiveDate: '2024-01-01',
        version: '2.1'
    },

    // Compensation
    {
        id: 'comp-1',
        category: 'Compensation',
        title: 'Salary Payment',
        documentName: 'Compensation Policy',
        section: '2.1 – Salary Structure',
        content: 'Salaries are credited on the last working day of each month directly to the registered bank account.',
        conditions: [
            'Bank account details must be updated in HRIS',
            'Salary slips are available on the employee portal',
            'Queries should be raised within 5 days of salary credit'
        ],
        effectiveDate: '2025-01-01',
        version: '1.5'
    },
    {
        id: 'comp-2',
        category: 'Compensation',
        title: 'Annual Bonus',
        documentName: 'Compensation Policy',
        section: '3.1 – Bonus Structure',
        content: 'Annual performance bonus is typically paid in April, based on individual and company performance. Eligibility requires minimum 6 months of service.',
        conditions: [
            'Subject to company performance targets being met',
            'Individual rating must be "Meets Expectations" or above',
            'Pro-rated for employees who joined mid-year'
        ],
        effectiveDate: '2025-01-01',
        version: '1.5'
    },

    // Travel & Expense
    {
        id: 'travel-1',
        category: 'Travel & Expense',
        title: 'Business Travel Reimbursement',
        documentName: 'Travel Policy',
        section: '1.1 – Travel Expenses',
        content: 'All business travel must be pre-approved. Expenses are reimbursed within 15 working days of expense report submission.',
        conditions: [
            'Original receipts required for all expenses over ₹500',
            'Expense reports must be submitted within 7 days of travel',
            'Per diem rates apply based on travel destination'
        ],
        effectiveDate: '2024-01-01',
        version: '2.0'
    },

    // Ethics & POSH
    {
        id: 'ethics-1',
        category: 'Ethics & POSH',
        title: 'Anti-Harassment Policy',
        documentName: 'POSH Policy',
        section: '1.1 – Prevention',
        content: 'The company maintains a zero-tolerance policy towards any form of harassment. All complaints are handled confidentially by the Internal Complaints Committee.',
        conditions: [
            'Complaints can be filed online or in person',
            'Investigation completed within 90 days',
            'Retaliation against complainants is strictly prohibited'
        ],
        effectiveDate: '2024-01-01',
        version: '3.0'
    },
    {
        id: 'ethics-2',
        category: 'Ethics & POSH',
        title: 'Conflict of Interest',
        documentName: 'Ethics Policy',
        section: '2.1 – Declarations',
        content: 'Employees must disclose any potential conflicts of interest, including outside employment, family relationships with vendors, or financial interests in competitors.',
        conditions: [
            'Annual disclosure required during appraisal cycle',
            'Immediate disclosure for new conflicts',
            'HR approval needed for secondary employment'
        ],
        effectiveDate: '2024-01-01',
        version: '2.0'
    }
];

