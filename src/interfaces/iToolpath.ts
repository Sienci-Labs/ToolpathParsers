import {Bit} from "./iBit";

export interface Toolpath {
    label: string;
    bit: Bit;
    stepDown: number;
    stepOver: number;
    feedrate: number;
    plungerate: number
}
