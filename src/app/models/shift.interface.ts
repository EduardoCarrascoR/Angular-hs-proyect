export interface Shift {

    shiftId?: number;
    type: string;
    start: string;
    finish: string;
    dates: string[];
    shiftPlace: string;
    guardsIds: number[];
    client: number;

}