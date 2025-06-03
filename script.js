
const resizeGridButton = document.querySelector("#resizeGridButton")
const updateBackgroundButton = document.querySelector("#updateBackgroundButton");

const gridContainer = document.querySelector("#gridContainer");

const containerSize = "500px";

let gridCount = 100;
let paintColor = "#00FFFF";
let gridBackgroundColor = "rgb(255, 255, 255)";

let mouseDown = false;
let randomColor = true;

gridContainer.style.cssText = `display: flex; flex-direction: column; \
                                width: ${containerSize}; height: ${containerSize}; \
                                cursor: url('images/paintbrush.png'), auto;`;

function resizeGrid() {
    // Set GridContainer Attributes
    gridContainer.innerHTML = '';
    for (let rows = 0; rows < gridCount; rows++) {
        // Create row div to add cols to
        let newRow = document.createElement("div");
        newRow.style.cssText = "display: flex; flex: 1;";
        for (let cols = 0; cols < gridCount; cols++) {
            let newCell = document.createElement("div");
            newCell.id = "cell";
            // For now we'll create the div with a border we can see
            newCell.style.cssText = "flex: 1; user-select: none;";
            newCell.style.backgroundColor = gridBackgroundColor;
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

function updateBackground(newColor) {
    console.log("Updating Background");
    const cells = document.querySelectorAll("#cell");
    const cellArr = Array.from(cells);
    for (let cell of cellArr) {
        if (cell.style.backgroundColor === gridBackgroundColor) {
            cell.style.backgroundColor = newColor;
        }
    }
}
updateBackgroundButton.addEventListener("click", () => {

    updateBackground("#00FF00")
});

resizeGrid();



// gridContainer.addEventListener("mousedown", () => {
//     mouseDown = true;
// });

// gridContainer.addEventListener("mouseup", () => {
//     mouseDown = false;
// });

