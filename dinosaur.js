import { setCustomProperty,getCustomProperty,incrementCustomProperty } from "./updateCustomProperty.js"

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let Velocity

const dinosaurElement=document.querySelector('[data-dinosaur]');

let isJumping
let dinoFrame
let currentFrameTime



export function setupDinosaur()
{
    isJumping=false
    dinoFrame=0
    currentFrameTime=0
    Velocity=0;
    setCustomProperty(dinosaurElement,"--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)
}
export function updateDinosaur(delta,speedScale)
{
    handelRun(delta,speedScale)
    handleJump(delta)
}

export function getDinoReact()
{
    return dinosaurElement.getBoundingClientRect()
}

export function setDinoLose()
{
    dinosaurElement.src="./images/dino-lose.png"
}

function handelRun(delta,speedScale)
{
    if(isJumping)
    {
        dinosaurElement.src=`./images/dino-stationary.png`
        return
    }

    if(currentFrameTime >= FRAME_TIME)
    {
        dinoFrame=(dinoFrame+1)% DINO_FRAME_COUNT
        dinosaurElement.src=`./images/dino-run-${dinoFrame}.png`
        currentFrameTime -=FRAME_TIME
    }

    currentFrameTime+=delta*speedScale
   
}



function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(dinosaurElement, "--bottom", Velocity * delta)
  
    if (getCustomProperty(dinosaurElement, "--bottom") <= 0) {
      setCustomProperty(dinosaurElement, "--bottom", 0)
      isJumping = false
    }
  
    Velocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    Velocity = JUMP_SPEED
    isJumping = true
  }