const mongoose = require("mongoose")

const leaderboards = new mongoose.Schema({

    dbID: { type: String, default: "" },
    leaderboard: [],
    maps: []
})

module.exports = mongoose.model("leaderboards", leaderboards)

// {
//     name: "bio-lab",
//     leaderboard: [],
//     img: ""

// },

// {
//     name: "candyland",
//     leaderboard: [],
//     img: ""

// },

// {
//     name: "castle",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/1/1f/Castle.png/revision/latest?cb=20180513181234"
// },

// {
//     name: "catacombs",
//     leaderboard: [],
//     img: ""

// },

// {
//     name: "cave",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/4/46/Cave.png/revision/latest?cb=20180513181235"

// },

// {
//     name: "cemetery",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/4/46/Cave.png/revision/latest?cb=20180513181235"

// },

// {
//     name: "corrosion",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/1/16/Corrosion.png/revision/latest?cb=20180513181345"
// },

// {
//     name: "depot",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/f/ff/Depot.png/revision/latest?cb=20180513181346"
// },

// {
//     name: "facility",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/8/8a/Facility.png/revision/latest?cb=20180513181344"
// },

// {
//     name: "farm",
//     leaderboard: [],
//     img: ""
// },

// {
//     name: "forest",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/c/c1/Forest.png/revision/latest?cb=20180513181349"
// },

// {
//     name: "forest-2",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/c/c1/Forest.png/revision/latest?cb=20180513181349"
// },

// {
//     name: "galactic-prison",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/d/d5/Graveyard.png/revision/latest?cb=20180513181348"
// },

// {
//     name: "graveyard-old",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/d/d5/Graveyard.png/revision/latest?cb=20180513181348"
// },

// {
//     name: "hospital",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/6/66/Hospital.png/revision/latest?cb=20180513181350"
// },

// {
//     name: "liandri",
//     leaderboard: [],
//     img: ""
// },

// {
//     name: "mars-habitat",
//     leaderboard: [],
//     img: ""
// },

// {
//     name: "morpheus",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/c/c6/Morpheus.png/revision/latest?cb=20180513181347"
// },

// {
//     name: "snow-lodge",
//     leaderboard: [],
//     img: ""

// },

// {
//     name: "space-nox",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/a/ad/Space_Noxx.png/revision/latest?cb=20180513181047"
// },

// {
//     name: "space-ship",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/3/31/Space_Ship.png/revision/latest?cb=20180513181047"
// },

// {
//     name: "spacestation-2",
//     leaderboard: [],
//     img: ""
// },

// {
//     name: "volcano-lab",
//     leaderboard: [],
//     img: "https://vignette.wikia.nocookie.net/zombie-rush/images/7/74/Volcano_Lab.png/revision/latest?cb=20180513181046"
// }