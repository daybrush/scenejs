import { IObject } from "@daybrush/utils";
import { NameType } from "./types";

export default class OrderMap {
    public orderMap: IObject<NameType[]> = {};

    constructor(private separator: string) {}
    public getFullName(names: NameType[]) {
        return names.join(this.separator);
    }
    public get(names: NameType[]): NameType[] | undefined {
        return this.orderMap[this.getFullName(names)];
    }
    public gets(names: NameType[], isFull = true): NameType[][] {
        const fullOrders: NameType[][] = [];
        const self = this;
        function pushOrders(nextNames: NameType[], stack: NameType[]) {
            const orders = self.get(nextNames);

            if (!orders) {
                return;
            }
            orders.forEach(name => {
                const nextStack = [...stack, name];
                const nextOrders = pushOrders([...nextNames, name], nextStack);

                if (!nextOrders || !nextOrders.length) {
                    fullOrders.push([...stack, name]);
                }
            });
            return orders;
        }

        pushOrders(names, isFull ? names : []);

        return fullOrders;
    }

    public set(names: NameType[], orders: NameType[]): NameType[] {
        names.forEach((name, i) => {
            const prevNames = names.slice(0, i);
            if (this.get(prevNames)) {
                return;
            }
            this.add(prevNames, name);
        });
        this.orderMap[this.getFullName(names)] = orders;

        return orders;
    }
    public add(names: NameType[], name: NameType): NameType[] {
        const orders = this.get(names) || this.set(names, []);

        if (orders.indexOf(name) === -1) {
            orders.push(name);
        }
        return orders;
    }

    public findIndex(names: NameType[], orderName: NameType): number {
        const orders = this.orderMap[this.getFullName(names)];

        if (!orders) {
            return -1;
        }
        return orders.indexOf(orderName);
    }
    public remove(names: NameType[]): this {
        const fullName = this.getFullName(names);
        const orderMap = this.orderMap;

        for (const name in orderMap) {
            if (name.indexOf(fullName) === 0) {
                delete orderMap[name];
            }
        }
        const length = names.length;

        if (length) {
            const prevNames = names.slice(0, -1);
            const lastName = names[length - 1];

            this.splice(prevNames, this.findIndex(prevNames, lastName), 1);
        }
        return this;
    }

    public splice(names: NameType[], index: number, deleteCount: number, ...orders: NameType[]) {
        const currentOrders = this.get(names) || this.set(names, []);

        currentOrders.splice(index, deleteCount, ...orders);

        return this;
    }
    public clear() {
        this.orderMap = {};
    }
    public setObject(obj: IObject<NameType[]>) {
        this.orderMap = {};

        const orderMap = this.orderMap;
        for (const name in obj) {
            orderMap[name] = obj[name].slice();
        }
    }
    public clone() {
        const map = new OrderMap(this.separator);

        map.setObject(map.orderMap);
        return map;
    }
}
