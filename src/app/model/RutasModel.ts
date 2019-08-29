import { Adress } from './AdressModel';

export class Rutas {
    constructor(
        public id?: number,
        public idUsuario?: number,
        public horaPartida?: string,
        public horaLlegada?: string,
        public dias?: string,
        public puntoInicial?: Adress,
        public puntoFinal?: Adress,
        public adress?: Array<Adress>,
        public zonaSalida?: string,
        public zonaDestino?: string
    ) {}
}