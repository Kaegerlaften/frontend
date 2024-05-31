export default class Search {
    constructor (text) {
        this._text = _text;
    }

    get text() { return this._text }

    set text(input) {
        this._text = input;
    }
}