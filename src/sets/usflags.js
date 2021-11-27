const USFLAGS = {
  "title": "Guess the state",
	"footer": "Write the US state whose flag this is.",
	"sets": [
    { "answers": ["Alabama"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/1200px-Flag_of_Alabama.svg.png" },
    { "answers": ["Alaska"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Alaska.svg/1200px-Flag_of_Alaska.svg.png" },
    { "answers": ["Arizona"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/1200px-Flag_of_Arizona.svg.png" },
    { "answers": ["Arkansas"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arkansas.svg/1200px-Flag_of_Arkansas.svg.png" },
    { "answers": ["California"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/1200px-Flag_of_California.svg.png" },
    { "answers": ["Colorado"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/1200px-Flag_of_Colorado.svg.png" },
    { "answers": ["Connecticut"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_Connecticut.svg/1200px-Flag_of_Connecticut.svg.png" },
    { "answers": ["Delaware"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Flag_of_Delaware.svg/1200px-Flag_of_Delaware.svg.png" },
    { "answers": ["Florida"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/1200px-Flag_of_Florida.svg.png" },
    { "answers": ["Georgia"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1200px-Flag_of_Georgia_%28U.S._state%29.svg.png" },
    { "answers": ["Hawaii"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Hawaii.svg/1200px-Flag_of_Hawaii.svg.png" },
    { "answers": ["Idaho"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Idaho.svg/1200px-Flag_of_Idaho.svg.png" },
    { "answers": ["Illinois"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/1200px-Flag_of_Illinois.svg.png" },
    { "answers": ["Indiana"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Flag_of_Indiana.svg/1200px-Flag_of_Indiana.svg.png" },
    { "answers": ["Iowa"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Iowa.svg/1200px-Flag_of_Iowa.svg.png" },
    { "answers": ["Kansas"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Kansas.svg/1200px-Flag_of_Kansas.svg.png" },
    { "answers": ["Kentucky"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_Kentucky.svg/1200px-Flag_of_Kentucky.svg.png" },
    { "answers": ["Louisiana"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_Louisiana.svg/1200px-Flag_of_Louisiana.svg.png" },
    { "answers": ["Maine"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Maine.svg/1200px-Flag_of_Maine.svg.png" },
    { "answers": ["Maryland"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/1200px-Flag_of_Maryland.svg.png" },
    { "answers": ["Massachusetts"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Massachusetts.svg/1200px-Flag_of_Massachusetts.svg.png" },
    { "answers": ["Michigan"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/1200px-Flag_of_Michigan.svg.png" },
    { "answers": ["Minnesota"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Minnesota.svg/1200px-Flag_of_Minnesota.svg.png" },
    { "answers": ["Mississippi"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_Mississippi.svg/1200px-Flag_of_Mississippi.svg.png" },
    { "answers": ["Missouri"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/1200px-Flag_of_Missouri.svg.png" },
    { "answers": ["Montana"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Montana.svg/1200px-Flag_of_Montana.svg.png" },
    { "answers": ["Nebraska"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Nebraska.svg/1200px-Flag_of_Nebraska.svg.png" },
    { "answers": ["Nevada"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Nevada.svg/1200px-Flag_of_Nevada.svg.png" },
    { "answers": ["New Hampshire"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_New_Hampshire.svg/1200px-Flag_of_New_Hampshire.svg.png" },
    { "answers": ["New Jersey"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_New_Jersey.svg/1200px-Flag_of_New_Jersey.svg.png" },
    { "answers": ["New Mexico"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_New_Mexico.svg/1200px-Flag_of_New_Mexico.svg.png" },
    { "answers": ["New York"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/1200px-Flag_of_New_York.svg.png" },
    { "answers": ["North Carolina"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/1200px-Flag_of_North_Carolina.svg.png" },
    { "answers": ["North Dakota"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Flag_of_North_Dakota.svg/1200px-Flag_of_North_Dakota.svg.png" },
    { "answers": ["Ohio"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/1200px-Flag_of_Ohio.svg.png" },
    { "answers": ["Oklahoma"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/1200px-Flag_of_Oklahoma.svg.png" },
    { "answers": ["Oregon"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/1200px-Flag_of_Oregon.svg.png" },
    { "answers": ["Pennsylvania"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/1200px-Flag_of_Pennsylvania.svg.png" },
    { "answers": ["Rhode Island"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/1200px-Flag_of_Rhode_Island.svg.png" },
    { "answers": ["South Carolina"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_South_Carolina.svg/1200px-Flag_of_South_Carolina.svg.png" },
    { "answers": ["South Dakota"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_South_Dakota.svg/1200px-Flag_of_South_Dakota.svg.png" },
    { "answers": ["Tennessee"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/1200px-Flag_of_Tennessee.svg.png" },
    { "answers": ["Texas"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/1200px-Flag_of_Texas.svg.png" },
    { "answers": ["Utah"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Utah.svg/1200px-Flag_of_Utah.svg.png" },
    { "answers": ["Vermont"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Vermont.svg/1200px-Flag_of_Vermont.svg.png" },
    { "answers": ["Virginia"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Virginia.svg/1200px-Flag_of_Virginia.svg.png" },
    { "answers": ["Washington"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/1200px-Flag_of_Washington.svg.png" },
    { "answers": ["West Virginia"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_West_Virginia.svg/1200px-Flag_of_West_Virginia.svg.png" },
    { "answers": ["Wisconsin"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_Wisconsin.svg/1200px-Flag_of_Wisconsin.svg.png" },
    { "answers": ["Wyoming"], "letter": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/1200px-Flag_of_Wyoming.svg.png" },
  ]
};

module.exports = USFLAGS;