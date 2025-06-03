
const resizeGridButton = document.querySelector("#resizeGridButton")

const gridContainer = document.querySelector("#gridContainer");

const containerSize = "500px";

let gridCount = 100;
let backgroundColor = "#00FFFF";

let mouseDown = false;
let randomColor = true;

gridContainer.style.cssText = `display: flex; flex-direction: column; \
                                width: ${containerSize}; height: ${containerSize}`;

function resizeGrid() {
    // Set GridContainer Attributes
    gridContainer.innerHTML = '';
    for (let rows = 0; rows < gridCount; rows++) {
        // Create row div to add cols to
        let newRow = document.createElement("div");
        newRow.style.cssText = "display: flex; flex: 1;";
        for (let cols = 0; cols < gridCount; cols++) {
            let newCell = document.createElement("div");
            // For now we'll create the div with a border we can see
            newCell.style.cssText = "flex: 1; user-select: none;";
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
        let useBackgroundColor = backgroundColor;
        if (randomColor) {
            const red = Math.random() * 255;
            const green = Math.random() * 255;
            const blue = Math.random() * 255;
            useBackgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
        event.target.style.backgroundColor = useBackgroundColor;
    }
});

resizeGrid();

// gridContainer.addEventListener("mousedown", () => {
//     mouseDown = true;
// });

// gridContainer.addEventListener("mouseup", () => {
//     mouseDown = false;
// });

