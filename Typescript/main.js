//Use Foreach
// const fruits = [1, 2,3,4];
// fruits.forEach(element => {
//         if(element === 0 || !!(element && !(element%2))){
//             console.log(element);
//         }
// });
// Use filter
function ispositive(value, index, array) {
    array.filter(function (item) {
        if (item === 0 || !!(item && !(item % 2))) {
            var result = 0;
            var plus = item * item;
            result += plus;
            console.log(result);
        }
    });
    return array;
}
// Driver code
var fruits = [1, 2, 3, 4, 5];
var text = fruits.toString();
document.getElementById("demo").innerHTML = text;
// check for positive number 
var value = fruits.filter(ispositive);
console.log(value);
