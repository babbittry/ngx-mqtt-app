export interface ReceiveDataFormat {
    readonly deviceName: string
    readonly deviceEUI: string;
    readonly data: string;
    readonly RSSI: number;
    readonly SNR: number;
    readonly frequency: number;
    readonly time: string;
}
