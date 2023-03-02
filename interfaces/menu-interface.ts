export interface IMenu {
    type: string;
    items: IItems[];
}

export interface IItems {
    label: string;
    route: string;
}
