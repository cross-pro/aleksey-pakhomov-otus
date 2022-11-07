import {LitElement, html} from 'lit-element'

class Tree extends LitElement {

    exampleData = '[{' +
        '"id":32,' +
        '"title":"Заголовок 1",' +
        '"items":[{' +
        '"id":3, "title":"Подзаголовок", "items":[' +
        '{"id":4, "title":"Вложенный файл"}' +
        ']' +
        '}]}, {"id":23, "title":"Файл 1" },' +
        '{"id":2,' +
        '"title":"Файл 2",' +
        '"items":[]' +
        '}]'

    constructor() {
        super()
        this.data = JSON.parse(this.exampleData)
    }


    static get properties() {
        return {
            data: {type: Object}
        }
    }

    render() {
        return html`
        ${this.data && this.data.map(i => html`
                <my-file id=${i.id} title=${i.title} items='${JSON.stringify(i.items)}'></my-file>
            `)}
            `
    }
}

export {Tree}