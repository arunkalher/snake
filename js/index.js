let direction={x:0,y:0}
const foodSound=new Audio("../music/food.mp3")
const gameOverSound=new Audio("../music/ganeover.mp3")
const moveSound=new Audio("../music/move.mp3")
const musicSound=new Audio("../music/music.mp3")
let speed=10
let lastPaintTime=0
let snakeArr=[
    {x:13,y:8}
]
let velocity={x:0,y:0}
let score=0
food={x:5,y:5}
// Game 
function main(ctime)
{
    window.requestAnimationFrame(main)
    if ((ctime-lastPaintTime)/1000 < 1/speed)
    return;
    
    lastPaintTime=ctime
    gameEngine()
    

}
function iscollide(snakeArr)
{
    for(let index=1;index<snakeArr.length;index++)
    {
        if(snakeArr[0].x===snakeArr[index].x && snakeArr[0].y===snakeArr[index].y)
        return true
    }
    if(snakeArr[0].x<=0 || snakeArr[0].y<=0 || snakeArr[0].x>18 || snakeArr[0].y>18)
    return true

    return false
}
function gameEngine()
{
    board.innerHTML="" 
    if(iscollide(snakeArr))
    {
        gameOverSound.play()
        musicSound.pause()
        velocity={x:0,y:0}
        alert("Game Over,Press any key to continue")
        snakeArr=[
            {x:13,y:8}
        ]
        musicSound.play()
        score=0
        document.getElementById("score").innerHTML=`SCORE : ${score}`

        
    }



    // when food eaten
    if (snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {   
        score+=1
        document.getElementById("score").innerHTML=`SCORE : ${score}`
        foodSound.play()
        snakeArr.unshift({x:food.x+velocity.x,y:food.y+velocity.y})
        food={x:Math.floor(2+Math.random()*14),y:Math.floor(2+Math.random()*14)}
    }
    //move snakeArr
    console.log(snakeArr)
    for (let i=snakeArr.length-2;i>=0;i--)
    {   
        snakeArr[i+1]={...snakeArr[i]}

    }

    snakeArr[0].x+=velocity.x
    snakeArr[0].y+=velocity.y

    
    //display snake
    snakeArr.forEach((e,index)=>{
    
    snakeElement=document.createElement('div')
    snakeElement.style.gridRowStart=e.y
    snakeElement.style.gridColumnStart=e.x
    let cl=""
    if (index==0)
    {
    cl="head"}
    else
    {cl="snake"}
    
    snakeElement.classList.add(cl)
    
    board.appendChild(snakeElement)

    // display food
    foodElement=document.createElement('div')
    foodElement.style.gridRowStart=food.y
    foodElement.style.gridColumnStart=food.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)

    })



}





window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    velocity={x:0,y:1}
    moveSound.play()
    switch(e.key)
    {
        case "ArrowUp":
            velocity.x=0
            velocity.y=-1
            break
        case "ArrowDown":
            velocity.x=0
            velocity.y=1
            break
        case "ArrowLeft":
            velocity.x=-1
            velocity.y=0
            break
        case "ArrowRight":
            velocity.x=1
            velocity.y=0
            break

        

    }

})