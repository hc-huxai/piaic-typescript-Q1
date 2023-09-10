const Exercise01 = () => {
  function promiseFunction(success: any, error: any) {
    if (Math.random() > 0.5) {
      success("Success");
    } else {
      error("Error");
    }
  }

  new Promise(promiseFunction)
    .then((success) => console.log(success))
    .catch((error) => console.log(error));
};
