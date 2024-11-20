export interface HTTP_HEADERS { [key: string]: string }
export interface HTTP_REQUESST {
    url: string;
    payload?: any;
    headers?: HTTP_HEADERS;
}
