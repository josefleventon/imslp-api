[![npm version](https://badge.fury.io/js/imslp-api.svg)](https://badge.fury.io/js/imslp-api)
[![GitHub release](https://img.shields.io/github/release/Naereen/StrapDown.js.svg)](https://GitHub.com/josefleventon/imslp-api/releases)
[![Github all releases](https://img.shields.io/github/downloads/Naereen/StrapDown.js/total.svg)](https://GitHub.com/josefleventon/imslp-api/release)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/josefleventon/imslp-api/graphs/commit-activity)
[![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://GitHub.com/josefleventon/imslp-api/issues)
![Node.js CI](https://github.com/josefleventon/imslp-api/workflows/Node.js%20CI/badge.svg)

# IMSLP API

Get data from the [IMSLP API](https://imslp.org/wiki/IMSLP:API) without having to deal with their horrible JSON format yourself! Get easy access to a massive list of composers and works, along with all the linked metadata and links related to them.

## Information

The International Music Score Library Project, also known as the Petrucci Music Library after publisher Ottaviano Petrucci, is a subscription-based project for the creation of a virtual library of public-domain music scores.<br> As of May 21, 2020 at 9:46 AM Eastern Standard Time, ISMLP stands at an index of:<br>
**159,144 works · 18,825 composers · 539 performers**<br>
**515,993 scores · 10,474,167+ pages · 61,121 recordings**<br>

## Tutorial

### GET Composers

To get the JSON list of composers, you need to run the `composers(<start>, <amount>)` function.<br>
_Note that `amount` should stay a relatively reasonable number due to JavaScript's throttling._<br>
Example:

```js
// Import API
const api = require("imslp-api");

// GET Composers
// Here are two examples
api.composers(6, 1);
// This will return index 6 on the list
api.composers(0, 2);
// This will return 2 composers starting from index 0
```

Let's take a look at what `api.composers(1, 5)` returns:

```js
[
  {
    id: "Category:A",
    name: "A",
    link: "https://imslp.org/wiki/Category:A",
  },
  {
    id: "Category:A Far Cry",
    name: "A Far Cry",
    link: "https://imslp.org/wiki/Category:A_Far_Cry",
  },
  {
    id: "Category:.q, Wulfi",
    name: ".q, Wulfi",
    link: "https://imslp.org/wiki/Category:.q,_Wulfi",
  },
  {
    id: "Category:(van Luiken) Bakker, Jeroen",
    name: "(van Luiken) Bakker, Jeroen",
    link: "https://imslp.org/wiki/Category:(van_Luiken)_Bakker,_Jeroen",
  },
  {
    id: "Category:A Fary Cry",
    name: "A Fary Cry",
    link: "https://imslp.org/wiki/Category:A_Fary_Cry",
  },
];
```

### GET Works

To get the JSON list of works, you need to run the `works(<start>, <amount>)` function.<br>
_Note that `amount` should stay a relatively reasonable number due to JavaScript's throttling._<br>
Example:

```js
// Import API
const api = require("imslp-api");

// GET Works
// Here are two examples
api.works(4, 1);
// This will return index 4 on the list
api.works(8, 3);
// This will return 2 works starting from index 8
```

Let's take a look at what `api.works(8, 3)` returns:

```js
[
  {
    id: "'A calamita (Von Calged, Kosta)",
    composer: "Von Calged, Kosta",
    title: "'A calamita",
    links: {
      work: "https://imslp.org/wiki/'A_calamita_(Von_Calged,_Kosta)",
      composer: "https://imslp.org/wiki/Category:Von_Calged,_Kosta",
    },
  },
  {
    id: "'A calamita (Von Calged, Kosta)",
    composer: "Von Calged, Kosta",
    title: "'A calamita",
    links: {
      work: "https://imslp.org/wiki/'A_calamita_(Von_Calged,_Kosta)",
      composer: "https://imslp.org/wiki/Category:Von_Calged,_Kosta",
    },
  },
  {
    id: "'A calamita (Von Calged, Kosta)",
    composer: "Von Calged, Kosta",
    title: "'A calamita",
    links: {
      work: "https://imslp.org/wiki/'A_calamita_(Von_Calged,_Kosta)",
      composer: "https://imslp.org/wiki/Category:Von_Calged,_Kosta",
    },
  },
];
```

## API Structure

The following tables contain the tags for the API and Package JSON.<br>
**API Object ID** is the ID corresponding to certain information served directly from ISMLP. You'll probably never have to use it, unless you're trying to tweak this package.<br>
**Package Object ID** is the ID corresponding to the information that the package will return to you based on the function you're using. You can check what kind of data they return in the return codeembeds up in the GET Works section.<br>
**Use / Value** is the description of what the data is used for in the API.<br>

### Composers

| API Object ID | Package Object ID | Use / Value                                                                 |
| ------------- | ----------------- | --------------------------------------------------------------------------- |
| data.id       | id                | Category name of the composer.<br>Used in the IMSLP link.                   |
| data.type     | -                 | Type of the data. Can be either composer<br>or work. (1 and 2 respectively) |
| data.parent   | -                 | Parent of the composer category.<br>Is empty.                               |
| data.intvals  | -                 | Extra data, only used in works.<br>Is empty.                                |
| data.permlink | link              | Link to the composer category.                                              |

### Works

| API Object ID | Package Object ID     | Use / Value                                                                                         |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| data.id       | id                    | Category name of the work.<br>Used in the IMSLP link.                                               |
| data.type     | -                     | Type of the data. Can be either composer<br>or work. (1 and 2 respectively)                         |
| data.parent   | composer              | Parent of the composer category.<br>Is empty.                                                       |
| data.intvals  | links.<work/composer> | Subcategory containing work name and<br>composer name in the API.<br>Contains links in the package. |
| data.permlink | -                     | Link to the composer category.                                                                      |
