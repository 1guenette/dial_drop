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

//104, 112, 13
x = convert([72,82,58])


console.log(x)

//z = mx+ny+b


//Input-module__pbIYDa__stripHandleInstant //class [0]
//Input-module__pbIYDa__stripHandleInstant // class [1]