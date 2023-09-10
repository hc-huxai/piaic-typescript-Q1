interface String {
  toCapitalize(): string;
}

String.prototype.toCapitalize = function () {
  let textArr = this.valueOf().split(" ");
  let capitalizedText = "";
  for (let i = 0; i < textArr.length; i++) {
    capitalizedText += `${textArr[i].charAt(0).toUpperCase()}${textArr[i].slice(
      1
    )} `;
  }
  return capitalizedText.trim();
};
