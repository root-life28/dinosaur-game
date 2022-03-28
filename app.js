import { updateGround,setupGround } from "./ground.js"

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
    updateSpeedScale(delta)
    updateScore(delta)
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

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
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