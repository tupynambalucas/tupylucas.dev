const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

var menu = document.getElementById('menu')
var menuTools = document.getElementById('menu-tools')
var shadowBox = document.getElementById('shadow-box')
var exitButton = document.getElementById('exit-button')
var aberto = 'menu'
menuTools.addEventListener("click", function(e){
    menu.style.display = 'none'
    animateCSS('#exit-button', 'fadeIn');
    exitButton.style.display = 'block'
    
    var name = e.target.getAttribute("name");
    if (name=='box-shadow') {
      shadowBox.style.display = 'block'
      animateCSS('#shadow-box', 'fadeInLeft');
      aberto = 'shadow-box'
    }
});
exitButton.addEventListener("click", function(e){
  exitButton.style.display = 'none'

  if (aberto=='shadow-box') {
    shadowBox.style.display = 'none'
    menu.style.display = 'block'
    animateCSS('#menu', 'fadeIn');
    aberto = 'menu'
  }
});



var displayBox = document.getElementById('display-box')
var displayCode = document.getElementById('display-code')
var insetCheck = document.getElementById('inset-check')

var horizontalBar = document.getElementById("horizontal-bar");
var horizontalOutput = document.getElementById("horizontal-output");
horizontalOutput.innerHTML = `${horizontalBar.value} px`;

var verticalBar = document.getElementById("vertical-bar");
var verticalOutput = document.getElementById("vertical-output");
verticalOutput.innerHTML = `${verticalBar.value} px`;

var blurBar = document.getElementById("blur-bar");
var blurOutput = document.getElementById("blur-output");
blurOutput.innerHTML = `${blurBar.value} px`;

var spreadBar = document.getElementById("spread-bar");
var spreadOutput = document.getElementById("spread-output");
spreadOutput.innerHTML = `${spreadBar.value} px`;

var opacityBar = document.getElementById("opacity-bar");
var opacityOutput = document.getElementById("opacity-output");
opacityOutput.innerHTML = `${opacityBar.value} px`;

var colorPicker = document.getElementById('color-picker')
var colorPickerHexInput = document.getElementById('color-picker-hexinput')
var rgb = '0,0,0'

horizontalBar.oninput = function() {
  horizontalOutput.innerHTML = `${this.value} px`;
  autoEval()
}

verticalBar.oninput = function() {
  verticalOutput.innerHTML = `${this.value} px`;
  autoEval()
}

blurBar.oninput = function() {
  blurOutput.innerHTML = `${this.value} px`;
  autoEval()
}

spreadBar.oninput = function() {
  spreadOutput.innerHTML = `${this.value} px`;
  autoEval()
}

opacityBar.oninput = function() {
  opacityOutput.innerHTML = `${this.value}`;
  autoEval()
}

colorPicker.oninput = function() {
  rgb = hexToRgb(colorPicker.value)
  colorPickerHexInput.value = colorPicker.value
  autoEval()
}

colorPickerHexInput.oninput = function() {
  rgb = hexToRgb(colorPickerHexInput.value)
  colorPicker.value = colorPickerHexInput.value
  autoEval()
}

insetCheck.oninput = function() {
  console.log(insetCheck.value)
  autoEval()
}

function hexToRgb(hex) {
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) return normal.slice(1).map(e => parseInt(e, 16));

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16));

  return null;
}

function autoEval() {
  if (insetCheck.checked) {
    displayBox.style.boxShadow = `inset ${horizontalBar.value}px ${verticalBar.value}px ${blurBar.value}px ${spreadBar.value}px rgba(${rgb},${opacityBar.value})`
    displayCode.innerHTML = `box-shadow: inset ${horizontalBar.value}px ${verticalBar.value}px ${blurBar.value}px ${spreadBar.value}px rgba(${rgb},${opacityBar.value})`
  } else {
    displayBox.style.boxShadow = `${horizontalBar.value}px ${verticalBar.value}px ${blurBar.value}px ${spreadBar.value}px rgba(${rgb},${opacityBar.value})`
    displayCode.innerHTML = `box-shadow: ${horizontalBar.value}px ${verticalBar.value}px ${blurBar.value}px ${spreadBar.value}px rgba(${rgb},${opacityBar.value})`
  }
}