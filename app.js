import { updateGround,setupGround } from "./ground.js"
import { updateDinosaur,setupDinosaur,getDinoReact,setDinoLose } from "./dinosaur.js"
import { updateCactus,setupCactus,getCactusRects } from "./cactus.js"

const worldElement=document.querySelector('[data-world]')
const scoreElement=document.querySelector('[data-score]')
const startElement=document.querySelector('[data-start]')
const WORLD_WIDTH=100;
const SPEED_SCALE_INCREASE=.00001;
const WORLD_HEIGHT=30;
let    speedScale
let score

setPixelToWorldScale()
window.addEventListener('resize',setPixelToWorldScale);
document.addEventListener('keydown',handleStart,{once: true})

setupGround();
let lastTime;
function update(time)
{
    if(lastTime==null)
    {
        lastTime=time;
        window.requestAnimationFrame(update)
        return
    }

    const delta=time - lastTime
    updateGround(delta,speedScale)
    updateDinosaur(delta,speedScale)
    updateCactus(delta,speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if(looks()) return handleLose()
    lastTime=time
    window.requestAnimationFrame(update)
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
  }

  function updateScore(delta)
  {
    score+=delta * 0.01
    scoreElement.textContent=Math.floor(score)
  }

  function looks(){
      const dinoBody=getDinoReact()
      return getCactusRects().some(rect=>isCollision(rect,dinoBody))
  }

  function isCollision(rect,dinoBody)
  {
      return (rect.left<dinoBody.right&&
      rect.top<dinoBody.bottom&&
      rect.right>dinoBody.left&&
      rect.bottom>dinoBody.top)
  }

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDinosaur()
    setupCactus()
    startElement.classList.add('hide')
   
    window.requestAnimationFrame(update)
  }
function setPixelToWorldScale()
{
    let worldToPixelScale;
        if(window.innerWidth/window.innerHeight<WORLD_WIDTH/WORLD_HEIGHT)
        {
            worldToPixelScale=window.innerWidth/WORLD_WIDTH
        }
        else
        {
            worldToPixelScale=window.innerHeight/WORLD_HEIGHT;

        }

        worldElement.style.width=`${WORLD_WIDTH*worldToPixelScale}px`;
        worldElement.style.height=`${WORLD_HEIGHT*worldToPixelScale}px`;
    }

    function handleLose()
    {
        setDinoLose()
        setTimeout(()=>{
            document.addEventListener("keydown",handleStart,{once:true})
            startElement.classList.remove('hide')
        },100)
    }