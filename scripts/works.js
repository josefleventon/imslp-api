// Imports Axios
const axios = require("axios");

// Downloads works (JSON)
exports.works = async function (start, amount) {
  // Creates array of JSON elements
  var workList = [];

  // Gets as many as 'amount'
  for (var i = 0; i < amount; i++) {
    // Creates HTTP request to ISMLP API
    axios
      .get(
        `https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=${start}/retformat=json`
      )
      .then(function (response) {
        // Creates a new JSON object
        var obj = {
          id: "",
          composer: "",
          title: "",
          links: {
            work: "",
            composer: "",
          },
        };

        // Adds data
        obj.id = response.data[i].id;
        obj.composer = response.data[i].intvals.composer;
        obj.title = response.data[i].intvals.worktitle;

        // Might as well have a sub-object for links!
        obj.links = {};
        obj.links.work = response.data[i].permlink;
        obj.links.composer = `https://imslp.org/wiki/${response.data[i].parent}`.replace(
          / /g,
          "_"
        );

        // Pushes the object to the array
        workList.push(obj);
      })
      .catch(function (error) {
        return console.error(error);
      })
      .finally(() => {
        // Returns the array when done
        if (workList.length === amount) return workList;
      });
  }
};
