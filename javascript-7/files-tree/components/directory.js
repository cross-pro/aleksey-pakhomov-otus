import {LitElement, html} from 'lit-element'


class Directory extends LitElement {

    clickFolder() {
        alert("click")
    }


    render() {
        return html`
            <style>
                .directory-image {
                    width: 30px;
                    margin-right: 10px;
                }
                .row {
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    -webkit-align-items: center;
                    font-family: sans-serif;
                }
            </style>

        <div class="row"><img class="directory-image" src="${"./images/directory.png"}" onclick="clickFolder">Название директории</div>
        `
    }



}

export {Directory}