export default class Content {
    constructor (element) {
        this._name = element.nom;
        this._photo = element.photo;
        this._qte = element.qte;
        this._id = element.id;
    }

    get name() { return this._name; }
    get qte() { return this._name; }

    set photo(p) { this._photo = p; }
    set name(n) { this._name = n }
    set qte(q) { this._qte = q; }
}