export default class Content {
    constructor (name, photo, qte, id) {
        this._name = name;
        this._photo = photo;
        this._qte = qte;
        this._id = id;
    }

    get name() { return this._name; }
    get qte() { return this._qte; }

    set photo(p) { this._photo = p; }
    set name(n) { this._name = n }
    set qte(q) { this._qte = q; }
}