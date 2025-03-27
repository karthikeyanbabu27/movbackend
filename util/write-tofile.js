const fs = require("fs");
const path = require("path");
module.exports = (data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "movies.json"),
      JSON.stringify(data),
      "utf-8"
    ); //..one level above to move another file
  } catch (err) {
    console.log(err);
  }
};
