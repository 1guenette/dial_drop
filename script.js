//get target color
function getColor(){
    const element = document.getElementsByClassName('Stimulus-module__91Z0fa__swatch'); 
    console.log(element[0]);
    return element[0].style.cssText.match(/\d+(\.\d+)?/g).map(Number);
}


//get current color
function getDial(){const element = document.getElementsByClassName('Input-module__pbIYDa__bg'); console.log(element[0]);}


//Hue-360 == Input-module__pbIYDa__strip


//hsv to rgb calulation = HACK

//FORMULA
// Value = round((value8bit/255)*100)

// Red % = (R / 255) × 100
// Green % = (G / 255) × 100
// Blue % = (B / 255) × 100
function convert(rgbArr){
    let r_deriv = rgbArr[0]/255
    let g_deriv = rgbArr[1]/255
    let b_deriv = rgbArr[0]/255
    let cMax = Math.max(...[r_deriv, g_deriv, b_deriv])
    let cMin = Math.min(...[r_deriv, g_deriv, b_deriv])
    let delta = cMax - cMin
    let h = { 
        rh: 60*(((g_deriv-b_deriv)/delta)%6),
        gh: 60*(((b_deriv-r_deriv)/delta)+2),
        bh:  60*(((r_deriv-g_deriv)/delta)+4)
    }

    hue = null
    if ( cMax === r_deriv){

       hue = h.rh 
    }
    else if(cMax === g_deriv){
         console.log("+++")
        hue = h.gh
    }
    else if(cMax == b_deriv){
        hue = h.bh
    }

    sat = cMax == 0 ? 0 :delta/cMax

    val = cMax

    return [hue, sat, val]


}


function setSliders(){
    let sliderList = document.getElementsByClassName('Input-module__pbIYDa__strip')
    console.log(sliderList.length)

    for(i=0; i<sliderList.length; i++){
        console.log(sliderList[i].ariaLabel)
    }

    // sliderList.forEach((element) => {
    //     console.log(element)
    // });
}
setSliders()

function toggleAndMoveHueDown(units = 1) {
  document.getElementById('toggle')?.click();

  const strip = document.querySelector('[role="slider"][aria-label="Hue"]'); //TODO: change for class Input-module__pbIYDa__strip change all toggles
  if (!strip) return;

  const min = Number(strip.getAttribute('aria-valuemin'));
  const max = Number(strip.getAttribute('aria-valuemax'));
  const current = Number(strip.getAttribute('aria-valuenow'));
  
  const target = Math.min(max, current + units); // down = higher hue

  const rect = strip.getBoundingClientRect(); // {x,y,width,height,top,right,bottom,left}
  const x = rect.left + rect.width / 2; //loc of button center
  const y = rect.top + ((target - min) / (max - min)) * rect.height; //loc of button center y

  const fire = (el, type, isPointer) => {
    const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0, buttons: type.endsWith('up') ? 0 : 1 };
    el.dispatchEvent(
      isPointer
        ? new PointerEvent(type, { ...opts, pointerId: 1, isPrimary: true, pointerType: 'mouse' })
        : new MouseEvent(type, opts)
    );
  };

  // Simulate pressing on the strip at the target position, then releasing
  fire(strip, 'pointerdown', true);
  fire(strip, 'mousedown', false);
  fire(document, 'pointermove', true);
  fire(document, 'mousemove', false);
  fire(document, 'pointerup', true);
  fire(document, 'mouseup', false);
}

toggleAndLowerSlider();

//104, 112, 13
x = convert([72,82,58])


console.log(x)

//z = mx+ny+b


//Input-module__pbIYDa__stripHandleInstant //class [0]
//Input-module__pbIYDa__stripHandleInstant // class [1]