// Import Axios (HTTP)
const axios = require('axios');

// Download works (JSON)
exports.works = async function(start, amount) {

    // Array of JSON elements
    var workList = new Array();

    // Make sure it's clear
    workList = [];

    // Get as many as 'amount'
    for (var i = 0; i < amount; i++) {

        // HTTP request to ISMLP API
        axios.get(`https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=${start}/retformat=json`)
            .then(function (response) {

                // New JSON object
                var obj = {};

                // Add data
                obj.id = response.data[i].id;
                obj.composer = response.data[i].intvals.composer;
                obj.title = response.data[i].intvals.worktitle;

                // Might as well have a sub-object for links
                obj.links = {};
                obj.links.work = response.data[i].permlink;
                obj.links.composer = `https://imslp.org/wiki/${response.data[i].parent}`.replace(/ /g, '_');

                // Push the object to the array
                workList.push(obj)

            })
            .catch(function (error) {
                return console.error(error)
            })
            .finally(() => {
                if (workList.length === amount) return workList
            })
    }
}

// Download composers (JSON)
exports.composers = async function(start, amount) {

    // Array of JSON elements
    var composerList = new Array();

    // Make sure it's clear
    composerList = [];

    // Get as many as 'amount'
    for (var i = 0; i < amount; i++) {

        // HTTP request to ISMLP API
        axios.get(`https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=1/start=${start+i}/retformat=json`)
            .then(function (response) {

                // New JSON object
                var obj = {};

                // Add data
                obj.id = response.data[0].id;
                obj.name = response.data[0].id.replace(/Category:/, '');
                obj.link = response.data[0].permlink;

                // Push the object to the array
                composerList.push(obj)

            })
            .catch(function (error) {
                return console.error(error)
            })
            .finally(() => {
                if (composerList.length === amount) return composerList
            })
    }
}