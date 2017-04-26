export class Device {
    ip: string;
    name: string;
    interval: string;
    attributes: {
        temperature: boolean,
        pressure: boolean,
        luminosity: boolean,
        switch: boolean
    };
    creation: string;
    modification: string;
}