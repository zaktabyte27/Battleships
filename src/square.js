const square = class{
    constructor(num){
        this.pieceInSquare = null
        this.square = document.createElement("div")
        this.square.classList.add("square")
        this.square.setAttribute("value",num)
    }
}

export {square}