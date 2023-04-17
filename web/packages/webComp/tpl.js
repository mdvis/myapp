class CstEle extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const textFrom = document.createTextNode(
            this.getAttribute("from")
        );
        const textTo = document.createTextNode(this.getAttribute("to"));
        const fromLabel = document.createTextNode("from: ");
        const toLabel = document.createTextNode("to: ");
        const tpl = document.querySelector('#tpl').content;

        shadow.appendChild(fromLabel);
        shadow.appendChild(textFrom);
        shadow.appendChild(toLabel);
        shadow.appendChild(textTo);
        shadow.appendChild(tpl.cloneNode(true))
    }
    connectedCallback(){console.log(1)}
    disconnectedCallback(){console.log(2)}
    adoptedCallback(){console.log(3)}
    attributeChangedCallback(){console.log(4)}
    static get observedAttributes(){return ['to']}
}

window.customElements.define("cst-ele", CstEle);
