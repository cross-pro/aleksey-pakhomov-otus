import './styles/main.css'

import {HeaderComponent} from "./components/header-component.js"
import {Tree} from "./components/tree.js"
import {Directory} from "./components/directory.js"
import {File} from "./components/file.js"


customElements.define('my-header', HeaderComponent)
customElements.define("my-tree", Tree)
customElements.define("my-file", File)
customElements.define("my-directory", Directory)