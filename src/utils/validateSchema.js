export const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
export const digitOnly = /^[0-9]*(?:\.[0-9]*)?$/;

// Probably want to refactor into it's own file
function validateSchema(schema, dataObj) {
  let errorObj = {};

  // Validate form data.
  Object.keys(schema).forEach((field, key) => {
    Object.keys(schema[field]).forEach(validator => {
      let dataField = dataObj[field];
      errorObj[field] = errorObj[field] || [];
      let type = Object.prototype.toString.call(dataField);
      if (!schema[field][validator]) {
        return;
      }
      switch (validator) {
        case "required":
          let missing = !dataField;
          // Check for the lenght of the Mobx ObservableArray.
          if (type !== "[object String]" && dataField.slice) {
            missing = !dataField.length;
          }
          // Check it is present (required), push an error if it isn't
          if (missing) {
            let requiredMsg =
              schema[field][validator] === true
                ? "This field is required."
                : schema[field][validator];
            errorObj[field].push(requiredMsg);
          }
          break;

        case "digitOnly":
          if (!digitOnly.test(dataField.toString())) {
            let requiredMsg =
              schema[field][validator] === true
                ? "Please enter a value with numeric characters only"
                : schema[field][validator];

            errorObj[field].push(requiredMsg);
          }
        break;

        case "custom":
          // Should be a function that returns a string of any errors, or null otherwise.
          let customValidatorErrors = schema[field][validator]();

          if (customValidatorErrors) {
            errorObj[field].push(customValidatorErrors);
          }
          break;
      }
    });
  });

  // Default to no errors.
  let errorFree = true;

  Object.keys(errorObj).forEach(field => {
    let errorString = errorObj[field].join(" ");
    errorObj[field] = errorString;
    // If there are no errors present, remove it from the error object.
    if (!errorString) {
      delete errorObj[field];
      // Otherwise, set our indicator showing errors.
    } else {
      errorFree = false;
    }
  });

  return errorFree || errorObj;
}

export default validateSchema;
