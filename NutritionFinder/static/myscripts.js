var x = 0
var keyNames = Object.keys(myObject);

const objectValues = [];
for (let i in myObject) {
    objectValues.push(myObject[i])
}
const baseNutrients = [
    document.getElementById("Cal").innerHTML,
    document.getElementById("Pro").innerHTML,
    document.getElementById("Fat").innerHTML,
    document.getElementById("Carbs").innerHTML
]

function myFunction() {
    if (keyNames.length == 1) {

        if (document.getElementById("servingSize").innerHTML == "100 grams") {
            document.getElementById("servingSize").innerHTML = keyNames + " " + objectValues[x] + " grams"

            let ratio = objectValues[x] / 100
            document.getElementById("Cal").innerHTML = (baseNutrients[0] * ratio).toFixed(2)
            document.getElementById("Pro").innerHTML = (baseNutrients[1] * ratio).toFixed(2)
            document.getElementById("Fat").innerHTML = (baseNutrients[2] * ratio).toFixed(2)
            document.getElementById("Carbs").innerHTML = (baseNutrients[3] * ratio).toFixed(2)
        } else {
            document.getElementById("servingSize").innerHTML = "100 grams"
            let calories = document.getElementById("Cal").innerHTML
            let protein = document.getElementById("Pro").innerHTML
            let fat = document.getElementById("Fat").innerHTML
            let carbs = document.getElementById("Carbs").innerHTML

            let ratio = objectValues[x] / 100

            document.getElementById("Cal").innerHTML = (calories / ratio).toFixed(2)
            document.getElementById("Pro").innerHTML = (protein / ratio).toFixed(2)
            document.getElementById("Fat").innerHTML = (fat / ratio).toFixed(2)
            document.getElementById("Carbs").innerHTML = (carbs / ratio).toFixed(2)
        }
    } else {
        if (x > keyNames.length - 1) {
            document.getElementById("servingSize").innerHTML = "100 grams";
            x = 0;
            document.getElementById("Cal").innerHTML = baseNutrients[0];
            document.getElementById("Pro").innerHTML = baseNutrients[1];
            document.getElementById("Fat").innerHTML = baseNutrients[2];
            document.getElementById("Carbs").innerHTML = baseNutrients[3];

        } else {
            document.getElementById("servingSize").innerHTML = keyNames[x] + " " + objectValues[x] + " grams"

            let ratio = objectValues[x] / 100
            document.getElementById("Cal").innerHTML = (baseNutrients[0] * ratio).toFixed(2)
            document.getElementById("Pro").innerHTML = (baseNutrients[1] * ratio).toFixed(2)
            document.getElementById("Fat").innerHTML = (baseNutrients[2] * ratio).toFixed(2)
            document.getElementById("Carbs").innerHTML = (baseNutrients[3] * ratio).toFixed(2)

            x++
        }
    }
}

function addFood() {
    // Get current food nutrition
    const temp_list = []
    let foodName = document.getElementById("foodName").innerHTML;
    let size = document.getElementById("servingSize").innerHTML;
    let calories = document.getElementById("Cal").innerHTML;
    let protein = document.getElementById("Pro").innerHTML;
    let fat = document.getElementById("Fat").innerHTML;
    let carbs = document.getElementById("Carbs").innerHTML;

    temp_list.push(foodName, size, calories, protein, fat, carbs);

    // create a table cell for each food info
    const rowElement = document.createElement("tr");
    for (const foodInfo of temp_list) {
        const cellElement = document.createElement("td");
        cellElement.textContent = foodInfo;
        rowElement.appendChild(cellElement);
    }

    // Display to screen
    tableBody = document.getElementById("userbody");
    tableBody.appendChild(rowElement);

    let subtotal = document.getElementsByClassName("subtotal");



    // Add to user_foods list
    let user_info = temp_list;
    const request = new XMLHttpRequest();
    request.open('POST', `/ProcessUserInfo/${JSON.stringify(user_info)}`);
    request.send();

}

