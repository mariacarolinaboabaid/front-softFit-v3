export interface DashboardCards {
    totalCustomers:             number;
    totalDeliquentCustomers:    number;
    totalDelinquencyAmount:     number;
    totalRenewedEnrollments:    number;
    totalCanceledEnrollments:   number;
    totalNewEnrollments:        number;
    totalPremiumEnrollments:    number;
    totalBasicEnrollments:      number;
}

export interface DeliquentCustomer {
    id:       string;
    fullName: string;
}

export interface BestRatedInstructors {
    id:                  string;
    fullName:            string;
    ratingValue:         number;
    ratingVotesQuantity: number;
}

