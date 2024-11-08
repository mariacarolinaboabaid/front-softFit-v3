export interface DashboardCards {
    totalCustomers:             number;
    totalDeliquentCustomers:    number;
    totalDeliquencyAmount:      number;
    totalRenewedEnrollments:    number;
    totalCanceledEnrollments:   number;
    totalNewEnrollments:        number;
    totalPremiumEnrollments:    number;
    totalBasicEnrollments:      number;
    [key: string]: number;
}

export interface DeliquentMember {
    id:       string;
    fullName: string;
}

export interface BestRatedTrainers {
    id:                  string;
    fullName:            string;
    ratingValue:         number;
    ratingVotesQuantity: number;
}

