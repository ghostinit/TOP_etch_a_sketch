const relativeContainer = document.querySelector("#relativeContainer");
const gridContainer = document.querySelector("#gridContainer");
const backgroundContainer = document.querySelector("#backgroundContainer");

const containerSize = "500px";

let gridCount = 100;
let penColor = "#39FF14";
let gridBackgroundColor = "#000000";
let randomColor = false;
let multiPassMode = false;
let gridVisible = false;
let gridColor = "black";
let hoverMode = false;
let eraserMode = false;


// CSS settings
relativeContainer.style.cssText = `position: relative; width: ${containerSize}; height: ${containerSize};`;
backgroundContainer.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"
gridContainer.style.cssText = `display: flex; flex-direction: column; \
                                position: absolute; top: 0; left: 0; width: 100%; height: 100%; \
                                cursor: url('images/paintbrush.png'), auto; z-index: 2;`;

// resizeGrid both initially creates, resizes and clears the grid
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
            newCell._opacityLevel = 0;
            newCell.style.backgroundColor = "#00000000";
            if (gridVisible) {
                newCell.style.cssText = `flex: 1; user-select: none; border: ${gridColor} 1px solid`;
            } else {
                newCell.style.cssText = "flex: 1; user-select: none;";
            }
            newRow.appendChild(newCell);
        }
        gridContainer.appendChild(newRow);
    }
}


// To increase performance we are using 1 event listener for
// all cells.
// This is the event listener that populates the divs
// according the UI settings
gridContainer.addEventListener("mousemove", function (event) {

    if ((event.buttons === 1 || hoverMode) && !eraserMode) {
        console.log(event.target.style.backgroundColor)

        // 'finalPenColor' is the name of the variable that will actually
        // get pushed to the div background
        let finalPenColor = penColor;
        if (randomColor) {
            const red = Math.random() * 255;
            const green = Math.random() * 255;
            const blue = Math.random() * 255;
            finalPenColor = `rgb(${red}, ${green}, ${blue})`;
        }

        if (multiPassMode) {
            if (event.target._opacityLevel < 1) {
                event.target._opacityLevel += 0.1;
            }
        } else {
            event.target._opacityLevel = 1;
        }
        event.target.style.opacity = event.target._opacityLevel.toFixed(1);
        event.target.style.backgroundColor = finalPenColor;
    } else if ((event.buttons === 1 || hoverMode) && eraserMode) {
        event.target.style.backgroundColor = "#FFFFFF00";
    }

});

// Prevent context menu when right clicking on grid container
gridContainer.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Everything from here is eventListeners for the
// various UI elements.  Nothing super interesting.


// ================================== MULTI PASS MODE ===============

const multiPassOnButton = document.querySelector("#multiPassOnButton");
multiPassOnButton.addEventListener("click", () => {
    multiPassMode = true;
    multiPassOnButton.classList.add("pressed");
    multiPassOffButton.classList.remove("pressed");
});

const multiPassOffButton = document.querySelector("#multiPassOffButton");
multiPassOffButton.addEventListener("click", () => {
    multiPassMode = false;
    multiPassOnButton.classList.remove("pressed");
    multiPassOffButton.classList.add("pressed");
});
// ================================== HOVER MODE CONTROL ============

const hoverOnButton = document.querySelector("#hoverOnButton");
hoverOnButton.addEventListener("click", () => {
    hoverMode = true;
    hoverOnButton.classList.add("pressed");
    hoverOffButton.classList.remove("pressed");
});

const hoverOffButton = document.querySelector("#hoverOffButton");
hoverOffButton.addEventListener("click", () => {
    hoverMode = false;
    hoverOnButton.classList.remove("pressed");
    hoverOffButton.classList.add("pressed");
});

// ================================== ERASER CONTROL ================

const eraserOnButton = document.querySelector("#eraserOnButton");
eraserOnButton.addEventListener("click", () => {
    eraserMode = true;
    eraserOnButton.classList.add("pressed");
    eraserOffButton.classList.remove("pressed");
});

const eraserOffButton = document.querySelector("#eraserOffButton");
eraserOffButton.addEventListener("click", () => {
    eraserMode = false;
    eraserOnButton.classList.remove("pressed");
    eraserOffButton.classList.add("pressed");
});

// ================================== COLOR CONTROL =================

function updateBackground() {
    backgroundContainer.style.backgroundColor = gridBackgroundColor;
}

// PEN COLOR PICKER
const penColorPicker = document.querySelector("#penColorPicker");
penColorPicker.addEventListener("input", (event) => {
    penColor = event.target.value;
});

// BACKGROUND COLOR PICKER
const bgColorPicker = document.querySelector("#bgColorPicker");
bgColorPicker.addEventListener("input", (event) => {
    gridBackgroundColor = event.target.value;
    updateBackground();
});

// RAINBOW MODE CONTROL
const rainbowOnButton = document.querySelector("#rainbowOnButton");
rainbowOnButton.addEventListener("click", () => {
    randomColor = true;
    rainbowOnButton.classList.add("pressed");
    rainbowOffButton.classList.remove("pressed");
});

const rainbowOffButton = document.querySelector("#rainbowOffButton");
rainbowOffButton.addEventListener("click", () => {
    randomColor = false;
    rainbowOnButton.classList.remove("pressed");
    rainbowOffButton.classList.add("pressed");
});

// ================================== GRID SIZE CONTROL ====================

const gridSizeSlider = document.querySelector("#gridSizeSlider");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
gridSizeSlider.addEventListener("input", (event) => {
    gridCount = event.target.value;
    gridSizeLabel.textContent = `Grid Size: ${gridCount}`;
});

const resizeGridButton = document.querySelector("#resizeGridButton")
resizeGridButton.addEventListener("click", resizeGrid);
resizeGridButton.addEventListener("mousedown", () => {
    resizeGridButton.classList.add('pressed');
});

resizeGridButton.addEventListener("mouseup", () => {
    resizeGridButton.classList.remove('pressed');
});

// ================================== GRID LINE CONTROL ====================

// In order to update the borders of each cell we need to query them all
// I'm still new at this and there might be a better way
function updateGridLineColor() {
    const cells = document.querySelectorAll("#cell");
    const cellArr = Array.from(cells);
    for (let cell of cellArr) {
        const cellBackground = cell.style.backgroundColor;
        cell.style.cssText = "";
        if (gridVisible) {
            cell.style.cssText = `flex: 1; user-select: none; border: ${gridColor} 1px solid`;
        } else {
            cell.style.cssText = "flex: 1; user-select: none;";
        }
        cell.style.backgroundColor = cellBackground;
    }
}

function toggleGridLines(newState) {
    if (newState) {
        gridOnButton.classList.add('pressed');
        gridOffButton.classList.remove('pressed');
        gridVisible = true;
    } else {
        gridOnButton.classList.remove('pressed');
        gridOffButton.classList.add('pressed');
        gridVisible = false;
    }
    updateGridLineColor();
}

const gridOnButton = document.querySelector("#gridLinesOnButton");
gridOnButton.addEventListener("click", () => {
    if (!gridVisible) {
        toggleGridLines(true);
    }
});

const gridOffButton = document.querySelector("#gridLinesOffButton");
gridOffButton.addEventListener("click", () => {
    if (gridVisible) {
        toggleGridLines(false);
    }
});

const gridLineBlackButton = document.querySelector("#gridLinesBlackButton");
gridLineBlackButton.addEventListener("click", () => {
    if (gridColor === "white") {
        gridLineBlackButton.classList.add('pressed');
        gridLineWhiteButton.classList.remove('pressed');
        gridColor = "black";
    }
    if (gridVisible) {
        updateGridLineColor();
    }
});

const gridLineWhiteButton = document.querySelector("#gridLinesWhiteButton");
gridLineWhiteButton.addEventListener("click", () => {
    if (gridColor === "black") {
        gridLineBlackButton.classList.remove('pressed');
        gridLineWhiteButton.classList.add('pressed');
        gridColor = "white";
    }
    if (gridVisible) {
        updateGridLineColor();
    }
});


// =================== INITIALIZE

// Build grid on initial load with defaults
resizeGrid();
penColorPicker.value = penColor;
bgColorPicker.value = gridBackgroundColor;

