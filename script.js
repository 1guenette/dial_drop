function convert(rgbArr){
    let r_deriv = rgbArr[0]/255
    let g_deriv = rgbArr[1]/255
    let b_deriv = rgbArr[2]/255
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
    return [Math.round(hue), Math.round(sat*100), Math.round(val*100)]
}


function getColor(){
    const element = document.getElementsByClassName('Stimulus-module__91Z0fa__swatch'); 
    console.log(element[0]);
    return convert(element[0].style.cssText.match(/\d+(\.\d+)?/g).map(Number));
    
}

function setSliders(dest=[360,100,100]){
    let sliderList = document.getElementsByClassName('Input-module__pbIYDa__strip')
    
    for(let i=0; i < sliderList.length; i++){
        console.log(sliderList[i].ariaLabel)
        //toggleSlide(0, sliderList[i])


        let currLoc = parseInt(sliderList[i].getAttribute('aria-valuenow'))
        //let moveAmount = dest[i] - currLoc        
        let moveAmount = dest[i]
        console.log(moveAmount)

        toggleSlide(moveAmount, sliderList[i])

        if(i !== 0){
            toggleSlide(100-moveAmount, (sliderList[i]))
        }
        else{
            if(moveAmount < 0){
                toggleSlide(360 + moveAmount, sliderList[i])
            }
            else{
                toggleSlide(moveAmount, sliderList[i])
            }
        }
    }
}

function toggleSlide(units = 1, element) {
  document.getElementById('toggle')?.click();

  const strip = element;
  if (!strip) return;

  const min = Number(strip.getAttribute('aria-valuemin')); //Got max possible Slider value
  const max = Number(strip.getAttribute('aria-valuemax'));//Get min possible Slider value
  const current = Number(strip.getAttribute('aria-valuenow')); //Get current Slider value
  
  const target = units; // down = higher hue 

  const rect = strip.getBoundingClientRect(); // {x,y,width,height,top,right,bottom,left}
  const x = rect.left + rect.width / 2; //loc of button center x
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