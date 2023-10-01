const ship = class{
    constructor(name,size,belongsTo){
        this.name = name
        this.size = size
        this.health = this.size
        this.belongsTo = belongsTo
        this.placed = false
    }
    hit(){
        this.health--
    }
    sunk(){
        this.belongsTo.health -=this.size
    }
}

export { ship }