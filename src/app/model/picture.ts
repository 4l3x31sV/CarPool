export class DataFace {
    constructor( public data: PictureFace) {}
}
export class PictureFace {
    constructor(
        public height?: number,
        public is_silhouette?: boolean,
        public url?: string,
        public width?: number
    ) {

    }

}