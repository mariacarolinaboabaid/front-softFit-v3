export interface Sidenav {
    links: Link[];
}

export interface Link {
    id:    number;
    link:  string;
    route: string;
    icon: string;
}