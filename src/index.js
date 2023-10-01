/*
This game will be pretty easy to make.
1)Firstly create a board using a lot of square classes and then append it to a game class
2)Create game class with player class and board array. Create getSquareIndex, in bounds function
3)Create ship class which simply put takes a single value, health which is also its length. Add a .hit function to reduce hitpoints. 
4)Each square has a attribute of .ship on square which is linked to the ship class. 
5)Easy
*/
import { ship } from "./ship"
import { player } from "./player"
import { square } from "./square"

const game = class{
    constructor(){
        this.playerBoard = []
        this.computerBoard = []
        this.player = new player("Zaki")
        this.computer = new player("computer")
        this.messageBox = document.querySelector(".messages")
        this.ships = [
            new ship("Battleship",4,this.player),
            new ship("Carrier",5,this.player),
            new ship("Destroyer",3,this.player),
            new ship("Submarine",3,this.player),
            new ship("Patrol",2,this.player)
        ]
        this.computerShips = [
            new ship("Battleship",4,this.computer),
            new ship("Carrier",5,this.computer),
            new ship("Destroyer",3,this.computer),
            new ship("Submarine",3,this.computer),
            new ship("Patrol",2,this.computer)
        ]
        this.rows = 8
        this.columns = 8
        this.compContainer = document.querySelector(".computerSide")
        this.compContainer.style.display = "none"
        this.createBoard()
        this.placeShips()
        this.computerPlace()
    }
    GetIndexOfSquare(ref){
        let row = Math.floor(ref/10)
        let column =  (ref%10)
        return (row-1) * this.columns +(column-1)
    }
    checkValid(ref,size,plyr){
        for (let i = 0; i<size; i++){
            let row = Math.floor((ref+i)/10)
            let column = ((ref+i)% 10)
            if (row < 1 || row > this.rows){
                return false
            } else if (column < 1 || column > this.columns){ 
                return false
            } else if (plyr){
                if (this.playerBoard[this.GetIndexOfSquare(ref+i)].pieceInSquare != null){
                    return false
                }
            } else if (plyr == false){
                if (this.computerBoard[this.GetIndexOfSquare(ref+i)].pieceInSquare != null){
                    return false
                }
            }
        }
        return true
    }
    createBoard(){
        let container = document.querySelector(".cContainer")
        for (let row = 1; row < this.rows+1; row++){
            let x = document.createElement("div")
            x.classList.add("row")
            for (let column = 1; column < this.columns+1; column++){
                let num = parseInt(String(row)+String(column))
                let y = new square(num)
                this.computerBoard.push(y)
                x.append(y.square)
            }
            container.append(x)
        }
        //Create computer board
        let newcontainer = document.querySelector(".pContainer")
        for (let row = 1; row < this.rows+1; row++){
            let x = document.createElement("div")
            x.classList.add("row")
            for (let column = 1; column < this.columns+1; column++){
                let num = parseInt(String(row)+String(column))
                let y = new square(num)
                this.playerBoard.push(y)
                x.append(y.square)
            }
            newcontainer.append(x)
        }
        //Create player board
    }
    clearBoard(){
        for (const sqre of this.playerBoard){
            if (sqre.pieceInSquare == null){
                sqre.square.style.backgroundColor = "white"
            } 
        }
    }
    displayShip(idx,size){
        for (let i = 0; i< size; i++){
            this.playerBoard[idx+i].square.style.backgroundColor = "green"
        }
        // this displays the ship when hovering
    }
    placeShip(idx,ship,plyer){
        if (plyer) {
            for (let i =0; i<ship.size; i++){
                this.playerBoard[idx+i].square.style.backgroundColor = "green"
                this.playerBoard[idx+i].pieceInSquare = ship
            }
        } else if (plyer == false) {
            for (let i =0; i<ship.size; i++){
                this.computerBoard[idx+i].pieceInSquare = ship
            }
        }
        // displays the ship permanently when a square is clicked
    }
    placeShips(){
        let pointer = 0
        let placed = false
        let currentShip = this.ships[pointer]
        document.addEventListener('mouseover', e => {
            if (e.target.className == "square" && placed != true){
                this.clearBoard()
                let num = e.target.getAttribute("value")
                let squareIndex = this.GetIndexOfSquare(num)
                if (this.checkValid(parseInt(num),currentShip.size,true)){
                    this.displayShip(squareIndex,currentShip.size)
                }
            }
        }, {passive: true})
        document.addEventListener("click",(e)=>{
            if (e.target.className == "square" && placed != true){
                let num = e.target.getAttribute("value")
                let squareIndex = this.GetIndexOfSquare(num)
                if (this.checkValid(parseInt(num),currentShip.size,true)){
                    this.placeShip(squareIndex,currentShip,true)
                    pointer ++
                    if (pointer == 5){
                        placed = true
                        this.compContainer.style.display = "grid"
                        this.messageBox.textContent = "Player turn"
                        this.mainCycle()
                    } else {
                        currentShip = this.ships[pointer]
                    }
                }
            }
        },{passive:true})
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    computerPlace(){
        let pointer = 0
        while (pointer != 5){
            let currentShip = this.computerShips[pointer]
            let num = this.getRandomInt(11,88)
            let squareIndex = this.GetIndexOfSquare(num)
            if (this.checkValid(parseInt(num),currentShip.size,false)){
                this.placeShip(squareIndex,currentShip,false)
                pointer ++
           }
        }
    }
    mainCycle(){
        let finished = false
        let hit = true
        document.addEventListener("click",(e)=>{
            if (finished != true){
                var num = e.target.getAttribute("value")
                var squareHit = this.computerBoard[this.GetIndexOfSquare(num)]
                if (e.target.className == "square" && e.target.parentElement.parentElement.className == "cContainer" && e.target.textContent == "" && hit ==true){
                    if (squareHit.pieceInSquare != null){
                        hit = true
                        let shipInSquare = squareHit.pieceInSquare
                        shipInSquare.hit()
                        squareHit.square.textContent = "X"
                        squareHit.square.style.color = "red"
                        squareHit.square.style.backgroundColor = "grey"
                        this.messageBox.textContent = "Hit"
                        if (shipInSquare.health == 0){
                            shipInSquare.sunk()
                            this.messageBox.textContent = "Sunk "+shipInSquare.name
                        }
                        if (this.computer.health == 0){
                            finished = true
                            this.messageBox.textContent = "Player won"
                        }
                    } else {
                        hit = false
                        squareHit.square.textContent = "X"
                        squareHit.square.style.color = "black"
                    }
                }
                //player loop
                if (hit == false){
                    var num = null
                    var squareHit = null
                    let missed = false
                    while (missed != true){
                        let empty = false
                        while (empty != true){
                            var num = this.getRandomInt(11,88)
                            var squareHit = this.playerBoard[this.GetIndexOfSquare(num)]
                            if (squareHit.square.textContent != "X"){
                                empty = true
                            }
                        }
                        if (squareHit.pieceInSquare != null){
                            let shipInSquare = squareHit.pieceInSquare
                            shipInSquare.hit()
                            squareHit.square.textContent = "X"
                            squareHit.square.style.color = "red"
                            if (shipInSquare.health == 0){
                                shipInSquare.sunk()
                            }
                            if (this.player.health == 0){
                                finished = true
                                this.messageBox.textContent = "Computer won"
                            }
                        } else {
                            missed = true
                            squareHit.square.textContent = "X"
                            squareHit.square.style.color = "black"
                            hit = true
                        }
                    }
                }
            //Computer loop
           }
         })
    }
}

const battleships = new game()

export {battleships}