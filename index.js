export function strokesRequired(picture) {
    // TODO: Write your code here
    let pictureArr = []; // create a blank array for array of arrays for picture input
    let pictureMasks = []; // create a blank array to store which bits of data have been dealt with
    let pictureMask = []; // used to populate the pictureMasks array    
    let pictureMaskDone = 0;
    //    
    picture.map((element) => { 
        pictureMask = [];
        pictureArr.push(element.split("")); 
        for(let a = 0; a < element.length; a++) {
            pictureMask.push(0);            
            pictureMaskDone += pictureMask.length;
        }
        pictureMasks.push(pictureMask);
    }); // convert picture input to array of arrays, also create pictureMasks array to determine which
        // bits of data are dealt with.

    let cnt = 1;

    for(let y = 0; y < pictureMasks.length; y++) { // each row
        for (let x = 0; x < pictureMasks[y].length; x++) { // each element of the row
            if (pictureMasks[y][x] === 0) { // if the pictureMask is 0 this means we haven't done anything with this
                                            // data yet so go ahead and check it out.
                pictureMasks = floodFill(pictureArr, pictureMasks, y, x, cnt++); // perform a flood fill starting at this square using the value in cnt
            }
        }
    }
    
    return cnt-1; //cnt will be +1 from the amount of times we have flood filled so take 1 off

}

const floodFill = (picture, pictureMask, y, x, newValue) => {
    const currentValue = picture[y][x]; // get the current value from the position in the picture array                                        
    if(currentValue === newValue){ // if the values are the same then no need to do this, return to 
                                   // strokesRequired routine and find the next value.
        return pictureMask;        
    }
    fill(picture, pictureMask, y, x, newValue, currentValue); // fill the values in on pictureMask based on values in picture
    return pictureMask;
};

const fill = (picture, pictureMask, y, x, newValue, current) => {    

    // check boundaries, if out return from function
    if(y < 0 || x < 0) { return; }    
    if(y > picture.length - 1 || x > picture[y].length - 1) { return; }    

    // if same value return
    if(picture[y][x] !== current) { return; }
    
    pictureMask[y][x] = newValue;
    picture[y][x] = newValue;
    // try filling in the surrounding squares
    fill(picture,pictureMask, y - 1, x, newValue, current);
    fill(picture,pictureMask, y + 1, x, newValue, current);
    fill(picture,pictureMask, y, x - 1, newValue, current);
    fill(picture,pictureMask, y, x + 1, newValue, current);
    //
}
 