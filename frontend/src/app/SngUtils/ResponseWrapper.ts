// SNG coding...
export class ResponseWrapper<T> {

    constructor() {
    }

    private entity: T;
    private message: string;
    private status: 'VALID' | 'INVALID';

    public isValid(): boolean {
        return this.status === 'VALID';
    }

    public isInvalid(): boolean {
        return this.status === 'INVALID';
    }

    public getMessage(): string {
        return this.message;
    }

    public getEntity(): T {
        return this.entity;
    }

    public getStatus(): 'VALID' | 'INVALID' {
        return this.status;
    }


    public setMessage(message: string) {
        this.message = message;
    }

    public setEntity(entity: T) {
        return this.entity = entity;
    }

    public setStatus(status: 'VALID' | 'INVALID') {
        this.status = status;
    }

}

// SNG coding...
export class ResponseEntity<T> {

    constructor() {
    }

    private data: T;
    private message: string;
    private status: 'VALID' | 'INVALID';

    public isValid(): boolean {
        return this.status === 'VALID';
    }

    public isInvalid(): boolean {
        return this.status === 'INVALID';
    }

    public getMessage(): string {
        return this.message;
    }

    public getData(): T {
        return this.data;
    }

    public getStatus(): 'VALID' | 'INVALID' {
        return this.status;
    }


    public setMessage(message: string) {
        this.message = message;
    }

    public setData(data: T) {
        return this.data = data;
    }

    public setStatus(status: 'VALID' | 'INVALID') {
        this.status = status;
    }

}
