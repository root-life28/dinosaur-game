export function getCustomProperty(element,props){
    return parseFloat(getComputedStyle(element).getPropertyValue(props)) || 0

} 

export function setCustomProperty(element,props,value){
    element.style.setProperty(props,value)

}

export function incrementCustomProperty(element,props,increment){
    setCustomProperty(element,props,getCustomProperty(element,props)+increment)

}