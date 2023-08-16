let emojisArray;

class EmojiPicker {
    constructor(selector) {
        this.value = "😀";
        this.htmlTarget = document.querySelector(selector);
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.show = false;
        this.category = "People";
    }
    async init() {
        // Get all Emojis
        const jsonData = await fetch("../emojis.json");
        emojisArray = await jsonData.json();

        // Emojis List Div
        this.div.setAttribute("style" ,"display: none");
        this.populateEmojis()

        // Open Emoji Selector Button
        this.button.innerText = this.value;
        this.button.setAttribute("style", "cursor: pointer; font-size: 25px;");
        this.button.addEventListener("click",() => {
           return this.toggle();
        });


        // Appends
        this.htmlTarget.appendChild(this.button);
        this.htmlTarget.appendChild(this.div);
    }

    toggle() {
        this.show = !this.show;

        if (this.show) {
            this.div.setAttribute("style", `z-index: 2; display: flex; flex-flow: row wrap; margin-top: 10px; border: solid 1px black; width: 300px; height: 200px; overflow-y: scroll; font-size: 25px; position: absolute;`);
        } else {
            this.div.setAttribute("style" ,"display: none");
        }
    }

    populateEmojis() {
        const emojisSubset = emojisArray[this.category];

        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild)
        }

        for (let i = 0; i < emojisSubset.length; i++) {
            const emojiEl = document.createElement("span");
            emojiEl.setAttribute("style", "padding: 5px; cursor: pointer; text-align: center; margin: 1px;");
            emojiEl.innerText = emojisSubset[i].emoji;
            emojiEl.setAttribute("title", emojisSubset[i].title);
            emojiEl.addEventListener("mouseover", () => {
                emojiEl.style.backgroundColor = "darkgrey"
            });
            emojiEl.addEventListener("mouseout", () => {
                emojiEl.style.backgroundColor = "white"
            });
            emojiEl.addEventListener("click", () => {
                this.value = emojiEl.innerText;
                this.button.innerText = emojiEl.innerText;
                this.toggle();
            });
            this.div.appendChild(emojiEl);
        }
    }
}