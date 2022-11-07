import {LitElement, html} from 'lit-element'

class Tree extends LitElement {

    exampleData = '[{' +
        '"id":32,' +
        '"title":"parse",' +
        '"items":[{' +
        '"id":3, "title":"subtitle", "items":[]' +
        '}] },' +
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
            data: {type: Object}
        }
    }

    render() {
        return html`
            <my-file id="1" title="title" items='[{"id":1,"title":"Заголовок", "items":[]},{"id":2,"title":"Заголовок2", "items":[]}]'></my-file>
            <my-file id="2" title="title2" items="[]"></my-file>
            
        ${this.data && this.data.map(i => html`
                <my-file id=${i.id} title=${i.title} items='${JSON.stringify(i.items)}'></my-file>
            `)}
            `
    }


}

export {Tree}