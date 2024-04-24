const buttonHTML = {
    left: document.querySelector(".left"),
    right: document.querySelector(".right"),
    up: document.querySelector(".up"),
    down: document.querySelector(".down"),
    x: document.querySelector(".x"),
    a: document.querySelector(".a"),
    b: document.querySelector(".b"),
    y: document.querySelector(".y"),
    l1: document.querySelector(".l1"),
    l2: document.querySelector(".l2"),
    l3: document.querySelector(".l3"),
    r1: document.querySelector(".r1"),
    r2: document.querySelector(".r2"),
    r3: document.querySelector(".r3"),
    start: document.querySelector(".start"),
    select: document.querySelector(".select"),
    analogic_left: document.querySelector(".analogic_left"),
    analogic_right: document.querySelector(".analogic_right"),
    analogic_left_ball: document.querySelector(".analogic_left > .analogic_ball"),
    analogic_right_ball: document.querySelector(".analogic_right > .analogic_ball"),
}

const buttons = {
    x: 0,
    a: 0,
    b: 0,
    y: 0,
    left: 0,
    right: 0,
    up: 0,
    down: 0,
    l1: 0,
    l2: 0,
    l3: 0,
    r1: 0,
    r2: 0,
    r3: 0,
    start: 0,
    select: 0,
    analogic_left: {
        x: 0,
        y: 0
    },
    analogic_right: {
        x: 0,
        y: 0
    },
    menu: 0
}


// ANALOGIC
function setAnalogicLeft(x, y){

    let length = Math.sqrt(x**2 + y**2 )
    x = length > 1 ? x/length : x
    y = length > 1 ? y/length : y

    x = x > 0 ? x+0.01 : x
    x = x < 1 ? x-0.01 : x

    y = y > 0 ? y+0.01 : y
    y = y < 1 ? y-0.01 : y

    x = x > 1 ? 1 : x
    y = y > 1 ? 1 : y

    x = x < -1 ? -1 : x
    y = y < -1 ? -1 : y

    buttons.analogic_left.x = x
    buttons.analogic_left.y = y

    buttonHTML.analogic_left_ball.style.transform = `translate(${x*60}px, ${-y*60}px)`
}

function setAnalogicRight(x, y){
    
    let length = Math.sqrt(x * x + y * y);

    x = (length > 1) ? x / length : x;
    y = (length > 1) ? y / length : y;

    x = x > 0 ? x+0.01 : x
    x = x < 1 ? x-0.01 : x

    y = y > 0 ? y+0.01 : y
    y = y < 1 ? y-0.01 : y

    x = x > 1 ? 1 : x
    y = y > 1 ? 1 : y

    x = x < -1 ? -1 : x
    y = y < -1 ? -1 : y

    buttons.analogic_right.x = x
    buttons.analogic_right.y = y

    buttonHTML.analogic_right_ball.style.transform = `translate(${x*60}px, ${-y*60}px)` 
}

class EventJoystick{

    constructor(div, val){
        this.div = div

        if(val == 0) this.setAnalogic = setAnalogicLeft;
        if(val == 1) this.setAnalogic = setAnalogicRight;
        
    }

    joystick(){

        this.div.addEventListener('touchstart', e=> { 
            this.val = e.touches.length
            this.div.style.background = 'red'
        })

        this.div.addEventListener('touchend', (e) => {
            this.val = e.touches.length
            // this.setAnalogic(0, 0)
            this.div.style.background = 'transparent'
        })

        this.div.addEventListener('touchmove', (e) => {
            const t = e.touches[this.val-1]
            const x = t.clientX - this.div.offsetLeft
            const y = t.clientY - this.div.offsetTop
            const sizeW = this.div.clientWidth
            const sizeH = this.div.clientHeight
            const dx = (x - sizeW/2) /sizeW * 2.5
            const dy = ((sizeH - y) - sizeH/2) / sizeH * 3
            this.setAnalogic(dx, dy)
        } )
    }
}

const EventJoystickLeft = new EventJoystick(buttonHTML.analogic_left, 0)
EventJoystickLeft.joystick()

const EventJoystickRight = new EventJoystick(buttonHTML.analogic_right, 1)
EventJoystickRight.joystick()

// EVENTS BUTTONS
Object.keys(buttonHTML).map(e=>{
    buttonHTML[e].addEventListener('touchstart', ()=> { 
        if(e != 'analogic_left' && e!= 'analogic_right')
            buttons[e] = 1
    })
})

function getButtonsPressed(){
    const b = {}
    Object.keys(buttons).map(e=>{
        
        if(buttons[e] == 1)
            if(e != 'analogic_left' || e!= 'analogic_right') b[e] = 1;

        if(buttons.analogic_left.x != 0 && buttons.analogic_left.y != 0)
            b.analogic_left = buttons.analogic_left

        if(buttons.analogic_right.x != 0 && buttons.analogic_right.y != 0)
            b.analogic_right = buttons.analogic_right
        
    })
    return b
}

