import {DataFace } from './picture';

export class Usuarios {
    constructor(
        public id?: any,
        public email?: string,
        public first_name?: string,
        public gender?: string,
        public last_name?: string,
        public name?: string,
        public picture?: DataFace,
        public numCelular?: number
    ) {

    }
}