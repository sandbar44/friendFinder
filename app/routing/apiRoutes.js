// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// FUNCTION
// ===============================================================================

var abs = function (x, y) { return Math.abs(x - y); }

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    // Display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
        console.log(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------


    // Handle incoming survey results. Handle the compatibility logic.
    app.post("/api/friends", function (req, res) {
        // req.body is available since we're using the body-parser middleware
        var currentUser = req.body;

        var friendDiffs = [];
        var closestMatch = '';
        var closestMatchDiff = '';

        // compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
        for (var i = 0; i < friendsData.length; i++) {
            // Reset total diff for each friend
            var currentDiff = 0;
            // Calculate diff for each friend
            for (var j = 0; j < 4; j++) {
                currentDiff += abs(currentUser.scores[j], friendsData[i].scores[j])
            }
            // Create array of differences of each friend
            friendDiffs.push(currentDiff);
        };
        console.log(friendDiffs);

        // The closest match will be the user with the least amount of difference.
        closestMatchDiff = Math.min(...friendDiffs);
        for (var i = 0; i < friendDiffs.length; i++) {
            if (closestMatchDiff === friendDiffs[i]) {
                closestMatch = friendsData[i];
            }
        };
        console.log(closestMatch);
        friendsData.push(req.body);
        res.json(closestMatch);
    });
}


