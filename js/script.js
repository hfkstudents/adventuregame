/**
 * Created by h205p2 on 11/30/16.
 */

$(document).ready(function() {
    $(".personalID, #opt2, #opt1, #secondMessage, #spacing, #showFollowers, #secret, #timer, #practiceStart, #courtTable").hide();
    $(".userSelect, #opt2, #opt1").mouseenter(function() {
        $(this).css({opacity: 1});
    }).mouseleave(function() {
        $(this).css({opacity: 0.5})
    });
    // document.getElementById("message").innerHTML = "Select Player: Choose wisely!";
    $(".userSelect").css({opacity: 0.5}).click(function() {
        document.getElementById("secret").innerHTML = document.getElementById($(this).attr('id') + "PID").innerHTML;
        document.getElementById("message").innerHTML = "Nice Choice! Step into " + document.getElementById($(this).attr('id') + "name").innerHTML + "'s shoes for the season!";
        $(".userSelect").hide();
        $("#opt2, #opt1, #spacing").show();
        document.getElementById("opt1").innerHTML = "START";
        document.getElementById("opt2").innerHTML = "Go back";
    });
    $(".basketball").click(function() {
       selectedPlayer.items.push(this.id.toString());
        $("#" + this.id).hide();
    });
});

//OBJECT CONSTRUCTORS//
function Person(firstName, lastName, personalid) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalid = personalid;
    this.account = '';
    this.items = [];
}

function Coach(team, firstName, lastName, personalid) {
    this.team = team;
    Person.call(this, firstName, lastName, personalid);
}

function Player(team, jersey, year, FG, FT, position, tendencyToFoul, attemptedShotsPerGame, firstName, lastName, personalid) {
    this.team = team;
    this.jersey = jersey;
    this.year = year;
    this.FG = FG;
    this.FT = FT;
    this.position = position;
    this.fouling = tendencyToFoul;
    this.attemptedShots = attemptedShotsPerGame;
    Person.call(this,firstName,lastName,personalid);
}

function Team(school, ranking, players, coach, totalStats, currentBracket, winLossRecord, mascot) {
    this.school = school;
    this.ranking = ranking;
    this.players = players;
    this.coach = coach;
    this.totalStats = totalStats;
    this.currentBracket = currentBracket;
    this.winLossRecord = winLossRecord;
    this.mascot = mascot;
    this.nextBracket = function(outcome) {
        var hoa = "";
        if(this.currentBracket.homeTeam == this) {
            hoa = 0;
        } else if (this.currentBracket.awayTeam == this) {
            hoa = 1;
        } else {
            console.log("something's wrong with home and away identification")
        }
        var newBracketId = this.currentBracket.connectionArray[hoa];
        this.currentBracket = getObject(allBrackets, newBracketId);
        if(outcome == "w") {
            this.winLossRecord[0] += 1;
        } else if (outcome == "l") {
            this.winLossRecord[1] += 1;
        }
    };
}

function Item(name, id, description) {
    this.name = name;
    this.id = id;
    this.description = description;
}

function Account(handle, followers, picture) {
    this.handle = handle;
    this.followers = followers;
    this.picture = picture;
    this.changePic = function(newPicSrc) {
        this.picture = newPicSrc
    };
    this.changeHandle = function(newHandle) {
        this.handle = newHandle;
    };
    this.addFollowers = function(number) {
        this.followers += number;
    };
    this.loseFollowers = function(number) {
        this.followers -= number;
    };
}

function Bracket(connectionArray, homeTeam, awayTeam, id) {
    this.connectionArray = connectionArray;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.id = id;
    this.fillHomeTeam = function(newHome) {
        this.homeTeam = newHome;
    };
    this.fillAwayTeam = function(newAway) {
        this.awayTeam = newAway;
    };
}
//OBJECT CONSTRUCTORS//

var selectedPlayer = "";
var selectedTeam = "";
var allPlayers = [];
var allTeams = [];
var allCoaches = [];
var allBrackets = [];
var allChoices = [];

Coach.prototype = new Person();
Player.prototype = new Person();

//DEFINING VARIABLES//
var UConn = new Team("UConn", 1, [], "", [], "", [0,0], "Huskies");
var Cal = new Team("Cal", 20, [], "", [], "", [0,0], "Bears");
var Michigan = new Team("Michigan", 33, [], "", [], "", [0,0], "Wolverines");
var OregonState = new Team("Oregon State", 16, [], "", [], "", [0,0], "Beavers");


allTeams.push(UConn, Cal, Michigan, OregonState);

var calMichBracket1 = new Bracket([2, 2], Cal, Michigan, 1);
var calMichBracket2 = new Bracket([5, 7], Michigan, Cal, 2);
var oregonUConnBracket1 = new Bracket([4, 4], OregonState, UConn, 3);
var oregonUConnBracket2 = new Bracket([7, 5], UConn, OregonState, 4);
var michOregonBracket1 = new Bracket([6, 6], Michigan, OregonState, 5);
var michOregonBracket2 = new Bracket([9, 11], OregonState, Michigan, 6);
var UConnCalBracket1 = new Bracket([8, 8], UConn, Cal, 7);
var UConnCalBracket2 = new Bracket([9, 11], Cal, UConn, 8);
var calOregonBracket1 = new Bracket([10, 10], Cal, OregonState, 9);
var calOregonBracket2 = new Bracket(['', ''], OregonState, Cal, 10);
var UConnMichBracket1 = new Bracket([12, 12], UConn, Michigan, 11);
var UConnMichBracket2 = new Bracket(['', ''], Michigan, UConn, 12);
var finalsBracket = new Bracket([], '', '', 13);

UConn.currentBracket = oregonUConnBracket1;
Cal.currentBracket = calMichBracket1;
Michigan.currentBracket = calMichBracket1;
OregonState.currentBracket = oregonUConnBracket1;
allBrackets.push(calMichBracket1, calMichBracket2, oregonUConnBracket1, oregonUConnBracket2, michOregonBracket1, michOregonBracket2, UConnCalBracket1, UConnCalBracket2, calOregonBracket1, calOregonBracket2, UConnMichBracket1, UConnMichBracket2, finalsBracket);

var CD = new Player(UConn, 5, 1, 42.3, 66.7, "G", 2, 6, "Crystal", "Dangerfield", 40);
var NC = new Player(UConn, 24, 2, 64.9, 81.1, "C", 2, 12, "Napheesa", "Collier", 41);
var KN = new Player(UConn, 11, 4, 44.7, 85.7, "G", 2, 9, "Kia", "Nurse", 42);
var KLS = new Player(UConn, 33, 2, 48.5, 81.6, "G", 2, 14, "Katie Lou", "Samuelson", 43);
var GW = new Player(UConn, 15, 3, 53.5, 66.7, "G", 2, 9, "Gabby", "Williams", 44);

var KA = new Player(Cal, 31, 2, 65.7, 75.4, "C", 4, 14, "Kristine", "Anigwe", 50);
var MC = new Player(Cal, 3, 3, 48.6, 78.6, "G", 3, 8, "Mikayla", "Cowling", 51);
var PD = new Player(Cal, 12, 3, 50.0, 56.3, "C", 2, 6, "Penina", "Davidson", 52);
var CR = new Player(Cal, 24, 4, 39.5, 54.6, "C", 2, 7, "Courtney", "Range", 53);
var AT = new Player(Cal, 1, 2, 44.2, 74.1, "G", 1, 12, "Asha", "Thomas", 54);

var KF = new Player(Michigan, 3, 3, 43.5, 87.8, "G", 2, 16, "Katelynn", "Flaherty", 60);
var JD = new Player(Michigan, 11, 3, 50.0, 55.6, "G", 2, 5, "Jillian", "Dunston", 61);
var KG = new Player(Michigan, 1, 1, 42.7, 63.5, "G", 2, 11, "Kysre", "Gondrezick", 62);
var HT = new Player(Michigan, 30, 2, 64.7, 70.2, "C", 3, 10, "Hallie", "Thome", 63);
var ST = new Player(Michigan, 2, 4, 40.3, 88.9, "G", 2, 9, "Sierra", "Thompson", 64);

var SW = new Player(OregonState, 24, 4, 44.1, 79.8, "G", 1, 11, "Sydney", "Wiese", 70);
var BB = new Player(OregonState, 4, 3, 57.6, 55.2, "C", 3, 7, "Breanna", "Brown", 71);
var MG = new Player(OregonState, 21, 3, 50.0, 71.1, "C", 2, 9, "Marie", "Gülich", 72);
var GH = new Player(OregonState, 11, 4, 32.3, 50.0, "G", 1, 7, "Gabby", "Hanson", 73);
var MP = new Player(OregonState, 0, 1, 43.2, 70.3, "G", 1, 6, "Mikayla", "Pivec", 74);


var GA = new Coach(UConn, "Geno", "Auriemma", 1);
var LG = new Coach(Cal, "Lindsay", "Gottlieb", 2);
var KBA = new Coach(Michigan, "Kim", "Barnes Arico", 3);
var SR = new Coach(OregonState, "Scott", "Rueck", 4);

Cal.players.push(KA, CR, MC, PD, AT);
OregonState.players.push(SW, BB, MG, GH, MP);
Michigan.players.push(KF, JD, KG, HT, ST);
UConn.players.push(CD, NC, KLS, KN, GW);
allPlayers.push(KA, CR, MC, PD, AT, SW, BB, MG, GH, MP, KF, JD, KG, HT, ST, CD, NC, KLS, KN, GW);

Cal.coach = LG;
OregonState.coach = SR;
Michigan.coach = KBA;
UConn.coach = GA;
allCoaches.push(LG, SR, KBA, GA);

CD.account = new Account('crystald5', 7100, 'img/lskdfhals.jpg');
KA.account = new Account('kristine_31', 8700, 'img/lskdfhals.jpg');
KF.account = new Account('katelynnflaherty', 8900, 'img/lskdfhals.jpg');
SW.account = new Account('swiesebaby24', 3500, 'img/lskdfhals.jpg');
//DEFINING VARIABLES//


function reloadPage() {
    location.reload();
}

function getObject(array, property) {
    // console.log(array + property);
    for(var i=0; i<array.length;i++) {
        var object = array[i];
        for(prop in object) {
            if(object[prop] == property) {
                return object
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function probability(percentChanceOfEvent) {
    var guess = getRandomInt(0,100);
    if(guess < percentChanceOfEvent || guess == percentChanceOfEvent) {
        return 0;
    } else {
        return 1;
    }
}

function showFollowers() {
    document.getElementById("followerCount").innerHTML = selectedPlayer.account.followers + " followers";
    $(document).mouseup(function (e) {
        var container = $("#showFollowers");
        if (!container.is(e.target)) {
            document.getElementById("followerCount").innerHTML = "";
        }
    });
}

function startGame() {
    selectedPlayer = getObject(allPlayers, document.getElementById("secret").innerHTML);
    selectedTeam = selectedPlayer.team;
    document.getElementById("message").innerHTML = "Congrats! Your " + selectedTeam.school + " basketball team is ready to start the season."
    document.getElementById("opt1").innerHTML = "Let's GO!";
    if(selectedTeam !== Michigan) {
        document.getElementById("opt2").innerHTML = "Go " + selectedTeam.mascot + "!";
    } else {
        document.getElementById("opt2").innerHTML = "Go Blue!";
    }
    document.getElementById("opt1").setAttribute('onclick','toPhotoshoot()');
    document.getElementById("opt2").setAttribute('onclick','toPhotoshoot()');
}

function toPhotoshoot() {
    document.getElementById("message").innerHTML = "Your first challenge: navigate through the photoshoot. (Remember, these photos will be used to personalize your social media accounts for maximizing followers)";
    document.getElementById("opt1").innerHTML = "Continue";
    document.getElementById("opt2").innerHTML = "(Like I have a choice)";
    document.getElementById("opt1").setAttribute('onclick','chooseBackground()');
    document.getElementById("opt2").setAttribute('onclick','chooseBackground()');
}

function chooseBackground() {
    document.getElementById("message").innerHTML = "Blue or green background?";
    document.getElementById("opt1").innerHTML = "Blue";
    document.getElementById("opt2").innerHTML = "Green";
    document.getElementById("opt1").setAttribute('onclick','blue()');
    document.getElementById("opt2").setAttribute('onclick','green()');
}

function blue() {
    allChoices.push("blue");
    chooseFlash();
}

function green() {
    allChoices.push("green");
    chooseFlash();
}

function chooseFlash() {
    document.getElementById("message").innerHTML = "Flash or no flash?";
    document.getElementById("opt1").innerHTML = "Flash";
    document.getElementById("opt2").innerHTML = "No Flash";
    document.getElementById("opt1").setAttribute('onclick','flash()');
    document.getElementById("opt2").setAttribute('onclick','noFlash()');
}

function flash() {
    allChoices.push("flash");
    chooseFace();
}

function noFlash() {
    allChoices.push("no flash");
    chooseFace();
}

function chooseFace() {
    document.getElementById("message").innerHTML = "Smile or look fierce?";
    document.getElementById("opt1").innerHTML = "Smile :)";
    document.getElementById("opt2").innerHTML = "Glaring all the way!";
    document.getElementById("opt1").setAttribute('onclick','smile()');
    document.getElementById("opt2").setAttribute('onclick','fierce()');
}

function smile() {
    allChoices.push("smile");
    showPic();
}

function fierce() {
    allChoices.push("fierce");
    showPic();
}


//notes to self: build in chances mechanism
function showPic() {
    document.getElementById("message").innerHTML = "Here it is! I've attached your final picture to the message";
    var firstTwoChoices = allChoices.slice(0,2);
    var whichPic = "img/" + selectedPlayer.personalid.toString() + firstTwoChoices.join("") + ".jpg";
    document.getElementById("image").src = whichPic;
    selectedPlayer.account.changePic(whichPic);
    document.getElementById("opt1").innerHTML = "Call me photogenic ;)";
    document.getElementById("opt2").innerHTML = "Uggh. That's me?";
    document.getElementById("opt1").setAttribute('onclick','followercheck1()');
    document.getElementById("opt2").setAttribute('onclick','followercheck1()');
}

function followercheck1() {
    //show followerCount
    var firstAdj = "";
    var secondAdj = "";
    $("#secondMessage").show();
    // $("#messenger").css({height:170px});
    $("#image").hide();
    if(allChoices[1] == "flash") {
        firstAdj = "flashy";
    } else if(allChoices[1] == "no flash") {
        firstAdj = "bright";
    }
    if(allChoices[2] == "smile") {
        secondAdj = "peppy";
    } else if(allChoices[2] == "fierce") {
        secondAdj = "fierce";
    }
    if(allChoices[0] == "blue") {
        selectedPlayer.account.addFollowers(1000);
        document.getElementById("message").innerHTML = "Blue's classic and you're looking " + firstAdj + " and " + secondAdj + ". Your follower count went up 1K! (to " + selectedPlayer.account.followers + ")";
    } else if (allChoices[0] == "green") {
        var winOrLose = probability(50);
        if(winOrLose == 0) {
            selectedPlayer.account.addFollowers(1500);
            document.getElementById("message").innerHTML = "Taking advantage of that green screen and looking " + firstAdj + " and " + secondAdj + " has your follower count up 1.5K! (to " + selectedPlayer.account.followers + ")";
        } else if (winOrLose == 1) {
            selectedPlayer.account.addFollowers(500);
            document.getElementById("message").innerHTML = "Yikes, they didn't appreciate the photoshopping but you're still looking " + firstAdj + " and " + secondAdj + ". Your follower count went up 500! (to " + selectedPlayer.account.followers + ")";
        }
    }
    document.getElementById("secondMessage").innerHTML = "You can check your follower count any time with the new button below";
    $("#showFollowers").show();
    document.getElementById("opt1").innerHTML = "Can we move on?";
    document.getElementById("opt2").innerHTML = "Let's get to the court!";
    document.getElementById("opt1").setAttribute('onclick','toPractice()');
    document.getElementById("opt2").setAttribute('onclick','toPractice()');
}

function toPractice() {
    document.getElementById("message").innerHTML = "Ok time to practice! Your team is ranked Number " + selectedTeam.ranking;
    if(selectedPlayer.position == "C") {
        document.getElementById("secondMessage").innerHTML = "You should work on rebounds! Collect as many boards as you can";
        document.getElementById("opt1").innerHTML = "Okay";
        document.getElementById("opt2").innerHTML = "I'm ready";
        document.getElementById("opt1").setAttribute('onclick','rebounds()');
        document.getElementById("opt2").setAttribute('onclick','rebounds()');
    } else if(selectedPlayer.position == "G") {
        document.getElementById("secondMessage").innerHTML = "Practice your shot! The shots you make here will determine your starting FG%";
        document.getElementById("opt1").innerHTML = "Okay";
        document.getElementById("opt2").innerHTML = "I'm ready";
        document.getElementById("opt1").setAttribute('onclick','shooting()');
        document.getElementById("opt2").setAttribute('onclick','shooting()');
    }
}

var count = 15;

function countDown() {
    if(count > 1) {
        count -= 1;
        document.getElementById("timer").innerHTML = count.toString();
    } else {
        document.getElementById("timer").innerHTML = "TIME'S UP!";
    }

}

function rebounds() {
    $("#messenger, #spacing, #showFollowers, .basketball").hide();
    $("#timer, #practiceStart, #courtTable").show();
    document.getElementById("timer").innerHTML = count.toString();
    document.getElementById("practiceStart").setAttribute('onclick', 'startRebounding()');
}

function getFive() {
    $(".basketball").hide();
    var visibleBBs = "#BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25);
    $(visibleBBs).show();
}

//work on timer
function startRebounding() {
    $("#practiceStart").hide();
    setTimeout(finishPractice, 20000);
    var countInterval = setInterval(countDown, 1000);
    var fiveInterval = setInterval(getFive, 1250);
    setTimeout(function() { clearInterval(fiveInterval); clearInterval(countInterval); $(".basketball").hide() }, 15000);
    setTimeout(function() { var number = selectedPlayer.items.length; document.getElementById("timer").innerHTML = "You caught " + number + " of those suckers" }, 17000);
}


function finishPractice() {
    console.log(selectedPlayer.items.join(""));
    $("#messenger, #showFollowers").show();
    $("#courtTable, #timer, #secondMessage").hide();
    document.getElementById("message").innerHTML = "Nice work! Hit the showers and we’ll check in on your coach, " + selectedTeam.coach.firstName + " " + selectedTeam.coach.lastName
}

function shooting() {
    $("#messenger, #spacing").hide()

}

