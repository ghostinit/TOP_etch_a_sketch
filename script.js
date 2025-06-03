
const resizeGridButton = document.querySelector("#resizeGridButton")
const updateBackgroundButton = document.querySelector("#updateBackgroundButton");

const relativeContainer = document.querySelector("#relativeContainer");
const gridContainer = document.querySelector("#gridContainer");
const backgroundContainer = document.querySelector("#backgroundContainer");

const containerSize = "500px";

let gridCount = 100;
let paintColor = "#338833";
let gridBackgroundColor = "rgb(255, 255, 255)";

let randomColor = false;
let doGradualFill = true;


relativeContainer.style.cssText = `position: relative; width: ${containerSize}; height: ${containerSize};`;
backgroundContainer.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"
gridContainer.style.cssText = `display: flex; flex-direction: column; \
                                position: absolute; top: 0; left: 0; width: 100%; height: 100%; \
                                cursor: url('images/paintbrush.png'), auto; z-index: 2;`;

function resizeGrid() {
    // Set GridContainer Attributes
    gridContainer.innerHTML = '';
    backgroundContainer.style.backgroundColor = gridBackgroundColor;
    for (let rows = 0; rows < gridCount; rows++) {
        // Create row div to add cols to
        let newRow = document.createElement("div");
        newRow.style.cssText = "display: flex; flex: 1;";
        for (let cols = 0; cols < gridCount; cols++) {
            let newCell = document.createElement("div");
            newCell.id = "cell";
            // For now we'll create the div with a border we can see
            newCell.style.cssText = "flex: 1; user-select: none;";
            newCell.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
            //newCell.style.cssText = "border: black 1px solid";
            // Add cell to row
            newRow.appendChild(newCell);
        }
        gridContainer.appendChild(newRow);
    }
}


resizeGridButton.addEventListener("click", resizeGrid);

gridContainer.addEventListener("mousemove", function (event) {
    if (event.buttons === 1) {
        let usePaintColor = paintColor;
        if (randomColor) {
            const red = Math.random() * 255;
            const green = Math.random() * 255;
            const blue = Math.random() * 255;
            usePaintColor = `rgb(${red}, ${green}, ${blue})`;
        }
        event.target.style.backgroundColor = usePaintColor;
    } else if (event.buttons === 2) {
        event.target.style.backgroundColor = gridBackgroundColor;
    }
});

gridContainer.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

function getAlphaValue(colorStr) {
    if (colorStr.startsWith('rgba') || colorStr.startsWith('hsla')) {
        const parts = colorStr.match(/[\d.]+/g);  // extracts all numbers including decimals
        return parseFloat(parts[3]);  // the alpha is the 4th number
    } else {
        return 1;  // fully opaque if it's 'rgb()' or a hex color
    }
}

function updateBackground(newColor) {
    // console.log("Updating Background");
    // const cells = document.querySelectorAll("#cell");
    // const cellArr = Array.from(cells);
    // for (let cell of cellArr) {
    //     if (cell.style.backgroundColor === gridBackgroundColor) {
    //         cell.style.backgroundColor = newColor;
    //     }
    // }
    // gridBackgroundColor = newColor;
    backgroundContainer.style.backgroundColor = newColor;
}
updateBackgroundButton.addEventListener("click", () => {

    updateBackground("rgb(0, 255, 0)")
});

resizeGrid();



// gridContainer.addEventListener("mousedown", () => {
//     mouseDown = true;
// });

// gridContainer.addEventListener("mouseup", () => {
//     mouseDown = false;
// });

