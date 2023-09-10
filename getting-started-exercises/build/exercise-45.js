function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $a381fb0a81febf88$export$2e2bcd8739ae039);
/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ String.prototype.toCapitalize = function() {
    let textArr = this.valueOf().split(" ");
    let capitalizedText = "";
    for(let i = 0; i < textArr.length; i++)capitalizedText += `${textArr[i].charAt(0).toUpperCase()}${textArr[i].slice(1)} `;
    return capitalizedText.trim();
};


const $a381fb0a81febf88$var$Exercise45 = ()=>{
    const createCar = (manufacturer, model, year, args)=>{
        let car = {
            manufacturer: manufacturer,
            model: model,
            year: year
        };
        if (args) for(let key in args)car[key] = args[key];
        return car;
    };
    console.log(createCar("Honda", "Civic", 2004, {
        color: "Navy",
        sunroof: true
    }));
};
// TODO: Uncomment the statement below to execute the exercise function
$a381fb0a81febf88$var$Exercise45();
var $a381fb0a81febf88$export$2e2bcd8739ae039 = $a381fb0a81febf88$var$Exercise45;


