const USCAPITALS = {
	"footer": "Write the capital of the given US state.",
	"sets": [
    { "letter": "Alabama", "answers": ["Montgomery"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/1200px-Flag_of_Alabama.svg.png" },
    { "letter": "Alaska", "answers": ["Juneau"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Alaska.svg/1200px-Flag_of_Alaska.svg.png" },
    { "letter": "Arizona", "answers": ["Phoenix"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/1200px-Flag_of_Arizona.svg.png" },
    { "letter": "Arkansas", "answers": ["Little Rock"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arkansas.svg/1200px-Flag_of_Arkansas.svg.png" },
    { "letter": "California", "answers": ["Sacramento"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/1200px-Flag_of_California.svg.png" },
    { "letter": "Colorado", "answers": ["Denver"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/1200px-Flag_of_Colorado.svg.png" },
    { "letter": "Connecticut", "answers": ["Hartford"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_Connecticut.svg/1200px-Flag_of_Connecticut.svg.png" },
    { "letter": "Delaware", "answers": ["Dover"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Flag_of_Delaware.svg/1200px-Flag_of_Delaware.svg.png" },
    { "letter": "Florida", "answers": ["Tallahassee"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/1200px-Flag_of_Florida.svg.png" },
    { "letter": "Georgia", "answers": ["Atlanta"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1200px-Flag_of_Georgia_%28U.S._state%29.svg.png" },
    { "letter": "Hawaii", "answers": ["Honolulu"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Hawaii.svg/1200px-Flag_of_Hawaii.svg.png" },
    { "letter": "Idaho", "answers": ["Boise"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Idaho.svg/1200px-Flag_of_Idaho.svg.png" },
    { "letter": "Illinois", "answers": ["Springfield"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/1200px-Flag_of_Illinois.svg.png" },
    { "letter": "Indiana", "answers": ["Indianapolis"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Flag_of_Indiana.svg/1200px-Flag_of_Indiana.svg.png" },
    { "letter": "Iowa", "answers": ["Des Moines"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Iowa.svg/1200px-Flag_of_Iowa.svg.png" },
    { "letter": "Kansas", "answers": ["Topeka"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Kansas.svg/1200px-Flag_of_Kansas.svg.png" },
    { "letter": "Kentucky", "answers": ["Frankfort"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_Kentucky.svg/1200px-Flag_of_Kentucky.svg.png" },
    { "letter": "Louisiana", "answers": ["Baton Rouge"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_Louisiana.svg/1200px-Flag_of_Louisiana.svg.png" },
    { "letter": "Maine", "answers": ["Augusta"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Maine.svg/1200px-Flag_of_Maine.svg.png" },
    { "letter": "Maryland", "answers": ["Annapolis"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/1200px-Flag_of_Maryland.svg.png" },
    { "letter": "Massachusetts", "answers": ["Boston"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Massachusetts.svg/1200px-Flag_of_Massachusetts.svg.png" },
    { "letter": "Michigan", "answers": ["Lansing"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/1200px-Flag_of_Michigan.svg.png" },
    { "letter": "Minnesota", "answers": ["Saint Paul", "St. Paul", "St Paul"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Minnesota.svg/1200px-Flag_of_Minnesota.svg.png" },
    { "letter": "Mississippi", "answers": ["Jackson"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_Mississippi.svg/1200px-Flag_of_Mississippi.svg.png" },
    { "letter": "Missouri", "answers": ["Jefferson City"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/1200px-Flag_of_Missouri.svg.png" },
    { "letter": "Montana", "answers": ["Helena"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Montana.svg/1200px-Flag_of_Montana.svg.png" },
    { "letter": "Nebraska", "answers": ["Lincoln"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Nebraska.svg/1200px-Flag_of_Nebraska.svg.png" },
    { "letter": "Nevada", "answers": ["Carson City"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Nevada.svg/1200px-Flag_of_Nevada.svg.png" },
    { "letter": "New Hampshire", "answers": ["Concord"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_New_Hampshire.svg/1200px-Flag_of_New_Hampshire.svg.png" },
    { "letter": "New Jersey", "answers": ["Trenton"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_New_Jersey.svg/1200px-Flag_of_New_Jersey.svg.png" },
    { "letter": "New Mexico", "answers": ["Santa Fe"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_New_Mexico.svg/1200px-Flag_of_New_Mexico.svg.png" },
    { "letter": "New York", "answers": ["Albany"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/1200px-Flag_of_New_York.svg.png" },
    { "letter": "North Carolina", "answers": ["Raleigh"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/1200px-Flag_of_North_Carolina.svg.png" },
    { "letter": "North Dakota", "answers": ["Bismarck"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Flag_of_North_Dakota.svg/1200px-Flag_of_North_Dakota.svg.png" },
    { "letter": "Ohio", "answers": ["Columbus"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/1200px-Flag_of_Ohio.svg.png" },
    { "letter": "Oklahoma", "answers": ["Oklahoma City"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/1200px-Flag_of_Oklahoma.svg.png" },
    { "letter": "Oregon", "answers": ["Salem"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/1200px-Flag_of_Oregon.svg.png" },
    { "letter": "Pennsylvania", "answers": ["Harrisburg"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/1200px-Flag_of_Pennsylvania.svg.png" },
    { "letter": "Rhode Island", "answers": ["Providence"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/1200px-Flag_of_Rhode_Island.svg.png" },
    { "letter": "South Carolina", "answers": ["Columbia"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_South_Carolina.svg/1200px-Flag_of_South_Carolina.svg.png" },
    { "letter": "South Dakota", "answers": ["Pierre"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_South_Dakota.svg/1200px-Flag_of_South_Dakota.svg.png" },
    { "letter": "Tennessee", "answers": ["Nashville"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/1200px-Flag_of_Tennessee.svg.png" },
    { "letter": "Texas", "answers": ["Austin"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/1200px-Flag_of_Texas.svg.png" },
    { "letter": "Utah", "answers": ["Salt Lake City"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Utah.svg/1200px-Flag_of_Utah.svg.png" },
    { "letter": "Vermont", "answers": ["Montpelier"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Vermont.svg/1200px-Flag_of_Vermont.svg.png" },
    { "letter": "Virginia", "answers": ["Richmond"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Virginia.svg/1200px-Flag_of_Virginia.svg.png" },
    { "letter": "Washington", "answers": ["Olympia"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/1200px-Flag_of_Washington.svg.png" },
    { "letter": "West Virginia", "answers": ["Charleston"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_West_Virginia.svg/1200px-Flag_of_West_Virginia.svg.png" },
    { "letter": "Wisconsin", "answers": ["Madison"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_Wisconsin.svg/1200px-Flag_of_Wisconsin.svg.png" },
    { "letter": "Wyoming", "answers": ["Cheyenne"], "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/1200px-Flag_of_Wyoming.svg.png" },
  ]
};

module.exports = USCAPITALS;