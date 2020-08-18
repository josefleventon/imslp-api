// Imports Axios
const axios = require("axios");

// Downloads composers (JSON)
exports.composers = async function (start, amount) {
  // Creates array of JSON elements
  var composerList = [];

  // Gets as many as 'amount'
  for (var i = 0; i < amount; i++) {
    // Creates HTTP request to ISMLP API
    axios
      .get(
        `https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=1/start=${
          start + i
        }/retformat=json`
      )
      .then(function (response) {
        // Creates a new JSON object
        var obj = {
          id: "",
          name: "",
          link: "",
        };

        // Adds data
        obj.id = response.data[0].id;
        obj.name = response.data[0].id.replace(/Category:/, "");
        obj.link = response.data[0].permlink;

        // Pushes the object to the array
        composerList.push(obj);
      })
      .catch(function (error) {
        return console.error(error);
      })
      .finally(() => {
        // Returns the array when done
        if (composerList.length === amount) return composerList;
      });
  }
};
