export interface User {
    id: number;
    username: string;
    password: string;
}

export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string
    ) {}
}

