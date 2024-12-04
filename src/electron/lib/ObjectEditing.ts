export default class ObjectEditing<O extends Object> {

    object: O;

    constructor(object: O) {
        this.object = object;
    }

    changeProperty<K extends keyof O, F>(key: K, cb: (property: O[K]) => F ): this {
        this.object[key] = cb(this.object[key]) as O[K];
        return this;
    }

    getResult(): Object {
        return this.object;
    }

}
