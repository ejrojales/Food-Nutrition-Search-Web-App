function loadTable() {
    tableBody = document.getElementById("userbody");
    for (const row of added_foods) {
        const rowElement = document.createElement("tr");

        for (const cellText of row) {
            const cellElement = document.createElement("td");

            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }

    // Subtotal
    let calTotal = 0
    let proTotal = 0
    let fatTotal = 0
    let carbsTotal = 0

    tableFoot = document.getElementById("subtotals");
    for (let i = 0; i < added_foods.length; i++) {
        for (let j = 2; j < 6; j++) {
            if (j === 2) {
                calTotal += parseFloat(added_foods[i][j]);
            } else if (j === 3) {
                proTotal += parseFloat(added_foods[i][j]);
            } else if (j === 4) {
                fatTotal += parseFloat(added_foods[i][j]);
            } else if (j === 5) {
                carbsTotal += parseFloat(added_foods[i][j]);
            }
        }
    }

    const calCell = document.createElement("td");
    calCell.textContent = calTotal.toFixed(2);

    const proCell = document.createElement("td");
    proCell.textContent = proTotal.toFixed(2);

    const fatCell = document.createElement("td");
    fatCell.textContent = fatTotal.toFixed(2);

    const carbsCell = document.createElement("td");
    carbsCell.textContent = carbsTotal.toFixed(2);

    tableFoot.appendChild(calCell);
    tableFoot.appendChild(proCell);
    tableFoot.appendChild(fatCell);
    tableFoot.appendChild(carbsCell);

}

function clearFoods() {
    fetch('/clearFoodList')
}

