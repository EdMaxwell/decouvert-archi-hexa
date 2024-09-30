export default class Conference {
    constructor(
        public id: string,
        public title: string,
        public startDate: Date,
        public endDate: Date,
        public seats: number,
    ) {
    }
}