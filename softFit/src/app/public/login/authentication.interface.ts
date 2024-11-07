export interface UserCredentialsForAuthentication {
    username: string;
    password: string;
}

export interface AuthenticationResponseSuccess {
    accessToken: string;
    name:        string;
    currency:    string;
}