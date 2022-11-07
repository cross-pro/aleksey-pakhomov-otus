import {LitElement, html} from 'lit-element'


class Tree extends LitElement {

    exampleData = '[{' +
        '"id":1,' +
        '"title":"title",' +
        '"items":[] },' +
        '{"id":2,' +
        '"title":"title2",' +
        '"items":[]' +
        '}]'

    constructor() {
        super()
        this.data = JSON.parse(this.exampleData)

        console.log(this.data)
    }



    static get properties() {
        return {
            title: {type: String},
            data: {type: Object},
            isRoot: {type: String}
        };
    }

    render() {
        return html`
            <my-file id="1" title="title" items='[{"id":1,"title":"Заголовок", "items":[]},{"id":2,"title":"Заголовок2", "items":[]}]'></my-file>
            <my-file id="2" title="title2" items="[]"></my-file>
        `
    }


}

export {Tree}