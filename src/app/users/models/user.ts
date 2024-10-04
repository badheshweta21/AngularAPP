import { formatDate } from "@angular/common";

export interface IUserId {
    name: string;
    value: string;
};

export interface IUserData {
    name: IUserName;
    email?: string;
    dob?: {date: string};
    cell?: string;
    picture?: IUserPicture;
    phone: string;
    id?: IUserId;
}

export interface IUserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface IUserName {
    title: string;
    first: string;
    last: string;
}

export class User {

    public picture?: IUserPicture;
    public name: string;
    public email?: string;
    public dob_date?: string;
    public cell?: string;
    public phone?: string;
    public userId? : string;

    constructor(props: IUserData) {
        this.picture = props.picture;
        this.name = props.name ? (props.name.last + ' ' + props.name.first) : '';
        this.email = props.email;
        this.dob_date = props.dob?.date ? formatDate(props.dob.date, 'yyyy-MM-dd', 'en-US') : '';
        this.cell = props.cell;
        this.phone = props.phone;
        this.userId = props.id?.value || '';
    }

    public getAttribute(attr: string): string | IUserPicture | ((attr: string) => void) | undefined {
        return this[attr as keyof User];
    }

}
