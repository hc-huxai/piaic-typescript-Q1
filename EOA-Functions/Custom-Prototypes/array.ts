interface Array<T> {
  toLowerCase(): any[];
}

Array.prototype.toLowerCase = function () {
  return this.filter((value: any) =>
    typeof value == "string" ? value.toLowerCase() : value
  );
};
