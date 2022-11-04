export interface AuthFormat {
    client_id: string;
    response_type: 'token' | string;
    redirect_uri: string;
    scope:  string;
}
