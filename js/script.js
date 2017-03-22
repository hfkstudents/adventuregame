/**
 * Created by h205p2 on 11/30/16.
 */

$(document).ready(function() {
    $(".personalID, #opt2, #opt1, #secondMessage, #spacing, #showFollowers, #secret, #timer, #practiceStart, #courtTable, #practiceSkip, #directions, #picsToPost, #image").hide();
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
        $("#opt2, #opt1, #spacing, #secondMessage").show();
        $("#messenger").css("height", "230px");
        document.getElementById("secondMessage").innerHTML = "You can use 1 and 2 on your keyboard to select the first or second option";
        document.getElementById("opt1").innerHTML = "START";
        document.getElementById("opt2").innerHTML = "Go back";
    });
}).keyup(function(event) {
    if(document.getElementById("secret").innerHTML !== '') {
        if (event.keyCode == 49) {
            $("#opt1").click();
        } else if (event.keyCode == 50) {
            $("#opt2").click();
        }
    }
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

function Team(school, ranking, players, coach, currentBracket, mascot) {
    this.school = school;
    this.ranking = ranking;
    this.players = players;
    this.coach = coach;
    this.currentBracket = currentBracket;
    this.winLossRecord = [0,0];
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
var jokePoints = 0;

Coach.prototype = new Person();
Player.prototype = new Person();

//DEFINING VARIABLES school, ranking, players, coach, currentBracket, mascot//
var UConn = new Team("UConn", 1, [], "", [], "Huskies");
var Cal = new Team("Cal", 20, [], "", [], "Bears");
var Michigan = new Team("Michigan", 33, [], "", [], "Wolverines");
var OregonState = new Team("Oregon State", 16, [], "", [], "Beavers");


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
GA.account = new Account('THEnoAuriemma', 1000, 'img/GA.png');
LG.account = new Account('CalCoachG', 1000, 'img/LG.png');
KBA.account = new Account('KBA_GoBlue', 1000, 'img/KBA.png');
SR.account = new Account('CoachRueck', 1000, 'img/SR.png');
//DEFINING VARIABLES//


function reloadPage() {
    location.reload();
}

function resetButtons(name1, name2, func1, func2) {
    document.getElementById("opt1").setAttribute('onclick', func1);
    document.getElementById("opt2").setAttribute('onclick', func2);
    document.getElementById("opt1").innerHTML = name1;
    document.getElementById("opt2").innerHTML = name2;
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

var keepTrack = 0;

function showFollowers() {
    if(keepTrack%2 == 0) {
        document.getElementById("followerCount").innerHTML = selectedPlayer.account.followers + " followers";
        document.getElementById("showFollowers").innerHTML = "HIDE FOLLOWERS"
    } else {
        document.getElementById("followerCount").innerHTML = "";
        document.getElementById("showFollowers").innerHTML = "SHOW FOLLOWERS"
    }
    keepTrack++
}

function startGame() {
    $("#secondMessage").hide();
    $("#messenger").css("height", "180px");
    selectedPlayer = getObject(allPlayers, document.getElementById("secret").innerHTML);
    selectedTeam = selectedPlayer.team;
    document.getElementById("message").innerHTML = "Congrats! Your " + selectedTeam.school + " basketball team is ready to start the season."
    document.getElementById("opt1").innerHTML = "Let's GO!";
    console.log(selectedTeam.mascot);
    if(selectedTeam !== Michigan) {
        document.getElementById("opt2").innerHTML = "Go " + selectedTeam.mascot + "!";
    } else {
        document.getElementById("opt2").innerHTML = "Go Blue!";
    }
    document.getElementById("opt1").setAttribute('onclick','toPhotoshoot()');
    document.getElementById("opt2").setAttribute('onclick','toPhotoshoot()');
}

function toPhotoshoot() {
    $("#secondMessage").show();
    $("#messenger").css("height", "250px");
    document.getElementById("secondMessage").innerHTML = "(Remember, these photos will be used to personalize your social media accounts for maximizing followers)"
    document.getElementById("message").innerHTML = "Your first challenge: navigate through the photoshoot.";
    resetButtons("Continue", "(Like I have a choice)", 'chooseBackground()', 'chooseBackground()');
}

function chooseBackground() {
    $("#secondMessage").hide();
    $("#messenger").css("height", "180px");
    document.getElementById("message").innerHTML = "Blue or green background?";
    resetButtons("Blue", "Green", 'blue()', 'green()');
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
    resetButtons("Flash", "No Flash", 'flash()', 'noFlash()');
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
    document.getElementById("message").innerHTML = "Smile or Smize?";
    resetButtons("Smile :)", "Glaring all the way!", 'smile()', 'fierce()');
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
    $("#image").show();
    $("#caption").hide();
    document.getElementById("message").innerHTML = "Here it is! I've attached your final picture to the message";
    var firstTwoChoices = allChoices.slice(0,2);
    var whichPic = "img/" + selectedPlayer.personalid.toString() + firstTwoChoices.join("") + ".jpg";
    document.getElementById("imageFile").src = whichPic;
    selectedPlayer.account.changePic(whichPic);
    resetButtons("Call me photogenic ;)", "Uggh. That's me?", 'followercheck1()', 'followercheck1()');
}

function followercheck1() {
    //show followerCount
    var firstAdj = "";
    var secondAdj = "";
    $("#secondMessage").show();
    $("#messenger").css("height", "230px");
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
    resetButtons("Can we move on?", "Let's get to the court!", 'toPractice()', 'toPractice()');
}

function toPractice() {
    document.getElementById("message").innerHTML = "Ok time to practice! Your team is ranked Number " + selectedTeam.ranking;
    if(selectedPlayer.position == "C") {
        document.getElementById("secondMessage").innerHTML = "You should work on rebounds! Collect as many boards as you can";
        resetButtons("Okay", "I'm ready", 'rebounds(15, true)', 'rebounds(15, true)');
    } else if(selectedPlayer.position == "G") {
        document.getElementById("secondMessage").innerHTML = "Practice your shot! The shots you make here will determine your starting FG%";
        resetButtons("Okay", "I'm ready", 'shooting(15, true)', 'shooting(15, true)');
    }
}

var count = 15;

function countDown() {
    if(count > 1) {
        count -= 1;
        document.getElementById("timer").innerHTML = count.toString();
    } else {
        document.getElementById("timer").innerHTML = "TIME'S UP!";
        $("#practiceSkip").hide()
    }

}

function rebounds(seconds, initialBoolean) {
    count = seconds;
    $("#messenger, #spacing, #showFollowers, .basketball").hide();
    document.getElementById("timer").innerHTML = count.toString();
    // document.getElementById("practiceStart").setAttribute('onclick', 'startRebounding(' + initialBoolean + ')');
    document.getElementById("directions").innerHTML = "Click on as many B-balls as you can to pick them up";
    if(initialBoolean == true) {
        $("#timer, #practiceStart, #courtTable, #practiceSkip, #directions").show();
    } else {
        $("#timer, #practiceStart, #courtTable").show();
    }
    document.getElementById("practiceStart").setAttribute('onclick', 'startRebounding(' + initialBoolean + ')');
}

function getFive() {
    $(".basketball").hide();
    var visibleBBs = "#BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25) + ", #BB" + getRandomInt(1,25);
    $(visibleBBs).show();
}

var whichShot = 0;
var practiceShotCount = 0;

function getShot() {
    whichShot = getRandomInt(1,10);
    document.getElementById('courtTable').setAttribute('background', 'img/' + selectedTeam.school + " Shots/" + selectedTeam.school + whichShot + ".png")
}

//work on timer
function startRebounding(initialBoolean) {
    document.getElementById("practiceStart").setAttribute('onclick', '');
    $("#practiceStart, #directions, #practiceSkip").hide();
    $(".basketball").click(function() {
        selectedPlayer.items.push(this.id.toString());
        $("#" + this.id).hide();
    });
    var countInterval = setInterval(countDown, 1000);
    var fiveInterval = setInterval(getFive, 1250);
    setTimeout(function() { clearInterval(fiveInterval); clearInterval(countInterval); $(".basketball").hide() }, count*1000);
    setTimeout(function() { var number = selectedPlayer.items.length; document.getElementById("timer").innerHTML = "You caught " + number + " of those suckers" }, count*1000 + 2000);
    if(initialBoolean == true) {
        setTimeout(finishPractice, 20000);
    } else {
        setTimeout(finishPrep, count*1000 + 5000);
    }
}

function skipPractice() {
    $("#messenger, #showFollowers").show();
    $("#courtTable, #timer, #secondMessage, #practiceStart, #practiceSkip, #directions").hide();
    $("#messenger").css("height", "180px");
    document.getElementById("message").innerHTML = "Hmm, laziness is one strategy. Let's check in on your coach, " + selectedTeam.coach.firstName + " " + selectedTeam.coach.lastName
    resetButtons("Go ahead", "I'm gone", 'coachTalk()', 'coachTalk()');
    selectedPlayer.FG += Math.round(practiceShotCount/.15)/10;
    practiceShotCount = -1;
}

function finishPractice() {
    // console.log(selectedPlayer.items.join(""));
    $("#messenger, #showFollowers").show();
    $("#courtTable, #timer, #secondMessage, #practiceSkip").hide();
    $("#messenger").css("height", "180px");
    document.getElementById("message").innerHTML = "Nice work! Hit the showers and then we’ll check in on your coach, " + selectedTeam.coach.firstName + " " + selectedTeam.coach.lastName
    resetButtons("Go ahead", "I'm gone", 'coachTalk()', 'coachTalk()');
    selectedPlayer.FG += Math.round(practiceShotCount/.15)/10;
}

function shooting(seconds, initialBoolean) {
    count = seconds;
    $("#messenger, #spacing, #showFollowers, .basketball").hide();
    $(function () {
        $("#BB13").draggable({containment: "#courtTable", scroll: false});
    });
    document.getElementById("courtTable").setAttribute('background', 'img/' + selectedTeam.school + 'Court.png');
    document.getElementById("timer").innerHTML = count.toString();
    document.getElementById("practiceStart").setAttribute('onclick', 'startShooting(' + initialBoolean + ')');
    document.getElementById("directions").innerHTML = "Accuracy is the key here. Drag your shots to the mark and make sure you can see the whole width of the court"
    if(initialBoolean == true) {
        $("#timer, #practiceStart, #courtTable, #practiceSkip, #BB13, #directions").show();
    } else {
        $("#timer, #practiceStart, #courtTable, #BB13").show();
    }
}

var shotTopLB = 0;
var shotTopUB = 0;
var shotLeftLB = 0;
var shotLeftUB = 0;

function defineShotLocation() {
    switch(whichShot) {
        case 1:
            shotTopLB = 13;
            shotTopUB = 25;
            shotLeftLB = 315;
            shotLeftUB = 327;
            break;
        case 2:
            shotTopLB = 111;
            shotTopUB = 123;
            shotLeftLB = 312;
            shotLeftUB = 324;
            break;
        case 3:
            shotTopLB = 256;
            shotTopUB = 268;
            shotLeftLB = 312;
            shotLeftUB = 324;
            break;
        case 4:
            shotTopLB = 351;
            shotTopUB = 363;
            shotLeftLB = 310;
            shotLeftUB = 322;
            break;
        case 5:
            shotTopLB = 110;
            shotTopUB = 122;
            shotLeftLB = 177;
            shotLeftUB = 189;
            break;
        case 6:
            shotTopLB = 108;
            shotTopUB = 120;
            shotLeftLB = 447;
            shotLeftUB = 459;
            break;
        case 7:
            shotTopLB = 34;
            shotTopUB = 46;
            shotLeftLB = 18;
            shotLeftUB = 30;
            break;
        case 8:
            shotTopLB = 36;
            shotTopUB = 48;
            shotLeftLB = 605;
            shotLeftUB = 617;
            break;
        case 9:
            shotTopLB = 234;
            shotTopUB = 246;
            shotLeftLB = 62;
            shotLeftUB = 74;
            break;
        case 10:
            shotTopLB = 224;
            shotTopUB = 236;
            shotLeftLB = 561;
            shotLeftUB = 573;
            break;
        default:
            break;
    }
}

function startShooting(initialBoolean) {
    $("#practiceStart, #directions").hide();
    getShot();
    defineShotLocation();
    var countInterval = setInterval(countDown, 1000);
    setTimeout(function () {
        clearInterval(countInterval)
    }, count*1000);
    setTimeout(function () {
        var number = (practiceShotCount / 1.5).toFixed(1);
        document.getElementById("timer").innerHTML = "Your FG% went up " + number + "%"
    }, count*1000 + 2000);
    $("#courtTable").mouseup(function () {
        if (count > 1) {
            var obj = $("#BB13");
            var parent = $("#courtTable");
            var childPos = obj.offset();
            var parentPos = parent.offset();
            var childOffset = {
                top: childPos.top - parentPos.top,
                left: childPos.left - parentPos.left
            };
            if ((childOffset.top < shotTopUB && childOffset.top > shotTopLB) && (childOffset.left < shotLeftUB && childOffset.left > shotLeftLB)) {
                console.log("bottom");
                practiceShotCount++;
                getShot();
                defineShotLocation();
            }
        }
    });
    if(initialBoolean == true) {
        setTimeout(finishPractice, 20000);
    } else {
        setTimeout(finishPrep, count*1000 + 5000)
    }
}

function coachTalk() {
    document.getElementById("messageIMG").setAttribute('src', selectedTeam.coach.account.picture);
    document.getElementById("whoMessage").innerHTML = "Coach " + selectedTeam.coach.lastName;
    document.getElementById("message").innerHTML = "...";
    resetButtons("Hey Coach!", "How's it going?", 'hey()', 'hows()');
}

function hey() {
    var reaction = "";
    if(practiceShotCount <0) {
        reaction = "-";
    } else if(selectedPlayer.position == "C") {
        if(selectedPlayer.items.length > 10) {
            reaction = "+";
        } else {
            var probs = probability(40);
            if(probs==0) {
                reaction = "-";
            } else {
                reaction = "+";
            }
        }
    } else {
        if(practiceShotCount > 8) {
            reaction = "+";
        } else if(practiceShotCount <0) {
            reaction = "-";
        } else {
            var probs = probability(40);
            if(probs==0) {
                reaction = "-";
            } else {
                reaction = "+";
            }
        }
    }
    if(reaction == "+") {
        document.getElementById("message").innerHTML = "Hey " + selectedPlayer.firstName + ", I'm liking the effort"
    } else if (reaction == "-") {
        document.getElementById("message").innerHTML = "Hey yourself " + selectedPlayer.firstName + ". You need to step it up in practice";
    }
    allChoices.push(reaction);
    resetButtons("Thanks", "I'll do better", 'thanks()', 'youBetter()');
}

function hows() {
    var reaction = "";
    resetButtons("Thanks", "I'll do better", 'thanks()', 'youBetter()');
    if(practiceShotCount < 0) {
        document.getElementById("message").innerHTML = "bad";
        reaction = "-";
    } else if(practiceShotCount < 8 && selectedPlayer.position == "G") {
        var probs = probability(30);
        if(probs==0) {
            reaction = "-";
            document.getElementById("message").innerHTML = "It was alright till I noticed my players were slacking during practice";
        } else {
            reaction = "+";
            document.getElementById("message").innerHTML = "Alright";
        }
    } else if (selectedPlayer.position == "G") {
        reaction = "+";
        document.getElementById("message").innerHTML = "Pretty well given your performance";
    } else {
        if(selectedPlayer.items.length > 10) {
            reaction = "+";
            document.getElementById("message").innerHTML = "Pretty well given your performance";
        } else {
            var probs = probability(40);
            if(probs==0) {
                reaction = "-";
                document.getElementById("message").innerHTML = "It was alright till I noticed my players were slacking during practice";
            } else {
                reaction = "+";
                document.getElementById("message").innerHTML = "Alright";
            }
        }
    }
    allChoices.push(reaction);
}

function thanks() {
    if(allChoices[3] == "-") {
        document.getElementById("message").innerHTML = "Now is not the time for sarcasm. You're lucky to still be starting tomorrow";
        resetButtons("See you then", "You won't regret it", 'gameDay()', 'gameDay()');
    } else {
        document.getElementById("message").innerHTML = "You earned the praise. Now get some rest, you're starting tomorrow!";
        resetButtons("See you then", "Can't wait!", 'gameDay()', 'gameDay()');
    }
}

function youBetter() {
    if(allChoices[3] == "-") {
        document.getElementById("message").innerHTML = "You better. You're lucky to be starting tomorrow"; 
        resetButtons("See you then", "You won't regret it", 'gameDay()', 'gameDay()');
    } else {
        document.getElementById("message").innerHTML = "Don't beat yourself up, you earned the praise. You're starting tomorrow!";
        resetButtons("See you then", "Thanks", 'gameDay()', 'gameDay()');
    }
}

function gameDay() {
    $("#secondMessage").show();
    $("#messenger").css("height", "230px");
    document.getElementById("messageIMG").setAttribute('src', "img/Basketball%20orange.png");
    document.getElementById("whoMessage").innerHTML = "New Message: BB Messenger";
    document.getElementById("message").innerHTML = "Game Day! GO! GO! GO!";
    document.getElementById("secondMessage").innerHTML = "... or post about it first";
    resetButtons("Post", "Warm-Up", 'post()', 'warmUp()');
}

function post() {
    if(selectedPlayer.position == "G") {
        selectedPlayer.FG -= 3;
    } else {
        selectedPlayer.FT -= 3;
    }
    document.getElementById("A").src = "img/picsToPost/" + selectedPlayer.personalid.toString() + "/A.jpg";
    document.getElementById("F").src = "img/picsToPost/" + selectedPlayer.personalid.toString() + "/F.jpg";
    document.getElementById("FT").src = "img/picsToPost/" + selectedPlayer.personalid.toString() + "/FT.jpg";
    $("#messenger").hide();
    $("#picsToPost").show().accordion({heightStyle: "content"});
    $(".postImg").click(function() {
        var shot = $(this).attr('id');
        if(shot !== "foot") {
            selectedPlayer.account.changePic("img/picsToPost/" + selectedPlayer.personalid.toString() + "/" + shot + ".jpg");
        } else {
            selectedPlayer.account.changePic("img/picsToPost/foot.jpg");
        }
        $("#picsToPost, #post").hide();
        $("#image, #caption").show();
        document.getElementById("imageFile").src = selectedPlayer.account.picture;
        allChoices.push(shot);
    });
    resetButtons("Worth it!", "Waste of time", '', '');
}

var hashCount = 0;

function enterCaption() {
    $("#writingCaption, #enterCaption").hide();
    $("#imgCaption, #post").show();
    document.getElementById("imgCaption").innerHTML = document.getElementById("writingCaption").value;
}

function firstPostFollowerCheck() {
    $("#messenger").show();
    $("#post, #showFollowers").hide();
    document.getElementById("message").innerHTML = "Okay, your gameday pic is posted!";
    console.log(allChoices.join(', '));
    if(allChoices[4] == "A") {
        selectedPlayer.account.addFollowers(1000);
        document.getElementById("secondMessage").innerHTML = "Your follower count went up a steady 1K! (to " + selectedPlayer.account.followers + ")";
        document.getElementById("A").setAttribute('src', 'img/picsToPost/' + selectedPlayer.personalid + '/A2.jpg')
    } else if(allChoices[4] == "F") {
        jokePoints += 5;
        var chance = 50 + jokePoints;
        var winOrLose = probability(chance);
        if(winOrLose == 0) {
            selectedPlayer.account.addFollowers(1500);
            document.getElementById("secondMessage").innerHTML = "Your follower count went up 1.5K! (to " + selectedPlayer.account.followers + ")";
        } else if (winOrLose == 1) {
            selectedPlayer.account.addFollowers(500);
            document.getElementById("secondMessage").innerHTML = "Your follower count went up 500! (to " + selectedPlayer.account.followers + ")";
        }
        document.getElementById("F").setAttribute('src', 'img/picsToPost/' + selectedPlayer.personalid + '/F2.jpg')
    } else if(allChoices[4] == "FT") {
        var winOrLose = probability(selectedPlayer.FT - 5);
        if(winOrLose == 0) {
            selectedPlayer.account.addFollowers(1500);
            document.getElementById("secondMessage").innerHTML = "Your follower count went up 1.5K! (to " + selectedPlayer.account.followers + ")";
        } else if (winOrLose == 1) {
            selectedPlayer.account.addFollowers(500);
            document.getElementById("secondMessage").innerHTML = " Your follower count went up 500! (to " + selectedPlayer.account.followers + ")";
        }
        document.getElementById("FT").setAttribute('src', 'img/picsToPost/' + selectedPlayer.personalid + '/FT2.jpg')
    } else if(allChoices[4] == "foot") {
        jokePoints += 25;
        var winOrLose = probability(50);
        if(winOrLose == 0) {
            selectedPlayer.account.addFollowers(2500);
            document.getElementById("secondMessage").innerHTML = "Your follower count went up 2.5K! (to " + selectedPlayer.account.followers + ")";
        } else if (winOrLose == 1) {
            selectedPlayer.account.loseFollowers(1000);
            document.getElementById("secondMessage").innerHTML = "Yikes! Your follower count went down 1K (to " + selectedPlayer.account.followers + ")";
        }
        document.getElementById("foot").setAttribute('src', 'img/picsToPost/potato.jpg')
    }
    document.getElementById("FTh3").innerHTML = "Concentration";
    resetButtons("Worth it!", "Waste of time", 'playBall()', 'playBall()');
}

var warmUpCountF = 0;
var warmUpCountJ = 0;

function warmUp() {
    document.getElementById("message").innerHTML = "Get those feet moving! Press 'F' and 'J' as fast as you can but try to stay balanced!";
    document.getElementById("secondMessage").innerHTML = "If you trend a little to the right or left it will throw off your shooting";
    $("#showFollowers").hide();
    resetButtons('F', 'J', '', '');
    setTimeout(function() {
        console.log(warmUpCountF);
        if(warmUpCountF < 35 || warmUpCountJ < 35) {
            document.getElementById("message").innerHTML = "Looks like the hustle wasn't there";
            document.getElementById("secondMessage").innerHTML = "Your FG% hasn't changed today";
            resetButtons("No pain, no gain", "Rats!", "playBall()", "playBall()")
        } else if(warmUpCountJ - warmUpCountF > 3 || warmUpCountF - warmUpCountJ > 3){
            var leftOrRight = "";
            if(warmUpCountF > warmUpCountJ) {
                leftOrRight = "left"
            } else {
                leftOrRight = "right"
            }
            document.getElementById("message").innerHTML = "Woah there, you're a little too far to the " + leftOrRight;
            document.getElementById("secondMessage").innerHTML = "You're gonna be off by 5% today";
            selectedPlayer.FG -= 5;
            resetButtons("Okay", "Rats!", "playBall()", "playBall()")
        } else {
            document.getElementById("message").innerHTML = "You got a nice balance there";
            document.getElementById("secondMessage").innerHTML = "Your FG% is gonna be up 5% today";
            selectedPlayer.FG += 5;
            resetButtons("Okay", "Easy-Peasy", "playBall()", "playBall()")
        }}, 10000);
    $(document).keyup(function() {
        if(event.keyCode == 70) {
            warmUpCountF++;
        } else if (event.keyCode == 74) {
            warmUpCountJ++;
        }
    })
}

function playBall() {
    $("#picsToPost, #image").hide();
    document.getElementById("message").innerHTML = "Okay, they're announcing the starting line-ups. You better get out there";
    document.getElementById("secondMessage").innerHTML = "I'll post updates as the game goes on";
    resetButtons('Who runs this house?', 'GO TIME!!!', 'initiateBracket1()', 'initiateBracket1()');
}

function initiateBracket1() {
    otherTeamsBracket(selectedTeam.currentBracket.id);
    document.getElementById("message").innerHTML = selectedTeam.currentBracket.homeTeam.school + " wins the tip!";
    document.getElementById("secondMessage").innerHTML = "Both " + selectedTeam.currentBracket.homeTeam.school + " and " + selectedTeam.currentBracket.awayTeam.school + " are both playing for the 'W'";
    document.getElementById("whoMessage").innerHTML = "The MEDIA";
    document.getElementById("messageIMG").src = "img/press+cartoon.png";
    resetButtons('next', 'next', 'firstHalfBracket(' + selectedTeam.currentBracket.id.toString() + ')', 'firstHalfBracket(' + selectedTeam.currentBracket.id.toString() + ')');
}

function otherTeamsBracket(bracketID) {
    var remainder = -1;
    for(var i = 0; i <4; i++) {
        var foured = bracketID + i;
        if(foured%4 == 0) {
            remainder = i;
        }
    }
    var otherBracket = "";
    if(remainder > 1) {
        otherBracket = getObject(allBrackets, bracketID + 2)
    } else {
        otherBracket = getObject(allBrackets, bracketID - 2)
    }
    console.log(otherBracket.homeTeam.school);
    runBracket(otherBracket);
}

function runBracket(bracket) {
    var teamOne = bracket.homeTeam;
    var teamTwo = bracket.awayTeam;
    var teamOneScore = 0;
    var teamTwoScore = 0;
    var teamOneFouls = 0;
    var teamTwoFouls = 0;
    var teamOneFT = 0;
    var teamTwoFT = 0;
    for(var i = 0; i <teamOne.players.length; i++) {
        teamOneScore += (teamOne.players[i].FG * teamOne.players[i].attemptedShots);
        teamOneFouls += (teamOne.players[i].fouling);
        teamOneFT += (teamOne.players[i].FT / 5);
    }
    for(var i = 0; i <teamTwo.players.length; i++) {
        teamTwoScore += (teamTwo.players[i].FG * teamTwo.players[i].attemptedShots);
        teamTwoFouls += (teamTwo.players[i].fouling);
        teamTwoFT += (teamTwo.players[i].FT / 5);
    }
    teamOneScore += (teamTwoFouls*teamOneFT);
    teamTwoScore += (teamOneFouls*teamTwoFT);
    if((teamTwoScore/100).toFixed() > (teamOneScore/100).toFixed()){
        teamTwo.nextBracket("w");
        teamOne.nextBracket("l");
    } else if ((teamTwoScore/100).toFixed() < (teamOneScore/100).toFixed()) {
        teamTwo.nextBracket("l");
        teamOne.nextBracket("w");
    } else {
        teamTwo.nextBracket("l");
        teamOne.nextBracket("w");
    }
}

var homeScore = 0;
var awayScore = 0;
var homeFT = 0;
var awayFT = 0;
var homeFouls = 0;
var awayFouls = 0;

var whichCommentary = "";

function firstHalfBracket(bracketID) {
    if(bracketID%2 !== 0) {
        if(bracketID/4 <= 1) {
            whichCommentary = 1;
        } else if (bracketID/4 <= 2) {
            whichCommentary = 3;
        } else {
            whichCommentary = 5;
        }
    } else {
        if(bracketID/4 <= 1) {
            whichCommentary = 2;
        } else if (bracketID/4 <= 2) {
            whichCommentary = 4;
        } else {
            whichCommentary = 6;
        }
    }
    for(var i = 0; i <selectedTeam.currentBracket.homeTeam.players.length; i++) {
        homeScore += (selectedTeam.currentBracket.homeTeam.players[i].FG * 0.5 * selectedTeam.currentBracket.homeTeam.players[i].attemptedShots);
        homeFouls += (selectedTeam.currentBracket.homeTeam.players[i].fouling * 0.5);
        homeFT += (selectedTeam.currentBracket.homeTeam.players[i].FT / 5);
    }
    for(var i = 0; i <selectedTeam.currentBracket.awayTeam.players.length; i++) {
        awayScore += (selectedTeam.currentBracket.awayTeam.players[i].FG * 0.5 * selectedTeam.currentBracket.awayTeam.players[i].attemptedShots);
        awayFouls += (selectedTeam.currentBracket.awayTeam.players[i].fouling*0.5);
        awayFT += (selectedTeam.currentBracket.awayTeam.players[i].FT / 5);
    }
    console.log(homeScore + " " + awayScore);
    homeScore += (awayFouls*homeFT);
    awayScore += (homeFouls*awayFT);
    console.log(homeScore + " " + awayScore);
    var timeOutFunction = "timeOutsBracket" + whichCommentary + "()";
    var activeFunction = "activeBracket" + whichCommentary + "()";
    var FTFunction = "FTBracket" + whichCommentary + "()";
    document.getElementById("message").innerHTML = "Your halftime score is " + selectedTeam.currentBracket.homeTeam.school + ": " + (homeScore/100).toFixed().toString() + ", " + selectedTeam.currentBracket.awayTeam.school + ": " + (awayScore/100).toFixed().toString()
    if(selectedPlayer.position == "G") {
        document.getElementById("secondMessage").innerHTML = "Take more time in the huddle or keep warm?";
        resetButtons("Time Outs", "Stay active", timeOutFunction, activeFunction);
    } else {
        document.getElementById("secondMessage").innerHTML = "Take more time in the huddle or shoot some free throws?";
        resetButtons("Time Outs", "FTs", timeOutFunction, FTFunction);
    }
}

function timeOutsBracket1() {
    if(selectedTeam == selectedTeam.currentBracket.homeTeam) {
        homeFT += 12;
    } else {
        awayFT += 10;
    }
    document.getElementById("message").innerHTML = "Coach " + selectedTeam.coach.lastName + " is going at it with the gameplan";
    document.getElementById("secondMessage").innerHTML = "Resting will do wonders for the free throw shooting";
    resetButtons("To the Court!", "15 min already?", 'secondHalfBracket()', 'secondHalfBracket()');
}

function activeBracket1() {
    if(selectedTeam == selectedTeam.currentBracket.homeTeam) {
        homeFouls *= 1.5;
        homeScore += (selectedPlayer.attemptedShots*2.7);
    } else {
        awayFouls *= 1.5;
        awayScore += (selectedPlayer.attemptedShots*2.5);
    }
    document.getElementById("message").innerHTML = "Coach " + selectedTeam.coach.lastName + " is going at it with the gameplan";
    document.getElementById("secondMessage").innerHTML = "I think staying active will boost your score";
    resetButtons("To the Court!", "15 min already?", 'secondHalfBracket()', 'secondHalfBracket()');
}

function FTBracket1() {
    if(selectedTeam == selectedTeam.currentBracket.homeTeam) {
        homeScore += selectedPlayer.items.length*47;
    } else {
        awayScore += selectedPlayer.items.length*45;
    }
    selectedPlayer.items = [];
    document.getElementById("message").innerHTML = "Coach " + selectedTeam.coach.lastName + " is going at it with the gameplan";
    document.getElementById("secondMessage").innerHTML = "Your practice picking up boards can really make a difference here";
    resetButtons("To the Court!", "15 min already?", 'secondHalfBracket()', 'secondHalfBracket()');
}

function secondHalfBracket() {
    for(var i = 0; i <selectedTeam.currentBracket.homeTeam.players.length; i++) {
        homeScore += (selectedTeam.currentBracket.homeTeam.players[i].FG * 0.5 * selectedTeam.currentBracket.homeTeam.players[i].attemptedShots);
        homeFT += (selectedTeam.currentBracket.homeTeam.players[i].FT / 5);
    }
    for(var i = 0; i <selectedTeam.currentBracket.awayTeam.players.length; i++) {
        awayScore += (selectedTeam.currentBracket.awayTeam.players[i].FG * 0.5 * selectedTeam.currentBracket.awayTeam.players[i].attemptedShots);
        awayFT += (selectedTeam.currentBracket.awayTeam.players[i].FT / 5);
    }
    homeScore += (awayFouls*homeFT);
    awayScore += (homeFouls*awayFT);
    if((homeScore/100).toFixed() > (awayScore/100).toFixed()) {
        console.log("A");
        document.getElementById("message").innerHTML = "Final score - " + selectedTeam.currentBracket.homeTeam.school + ": " + (homeScore/100).toFixed().toString() + ", " + selectedTeam.currentBracket.awayTeam.school + ": " + (awayScore/100).toFixed().toString();
        if(selectedTeam == selectedTeam.currentBracket.homeTeam) {
            selectedTeam.currentBracket.awayTeam.nextBracket("l");
            selectedTeam.currentBracket.homeTeam.nextBracket("w");
            document.getElementById("secondMessage").innerHTML = "Congrats! You move to " + selectedTeam.winLossRecord[0].toString()+ "-"+selectedTeam.winLossRecord[1].toString();
        } else {
            if(whichCommentary%2 !== 0) {
                document.getElementById("secondMessage").innerHTML = "Tough loss, but you get another crack at them later";
            } else {
                document.getElementById("secondMessage").innerHTML = "New game, new opponent looking forward";
            }
            selectedTeam.currentBracket.homeTeam.nextBracket("w");
            selectedTeam.currentBracket.awayTeam.nextBracket("l");
        }
    } else if((homeScore/100).toFixed() < (awayScore/100).toFixed()) {
        console.log("B");
        document.getElementById("message").innerHTML = "Final score - " + selectedTeam.currentBracket.homeTeam.school + ": " + (homeScore/100).toFixed().toString() + ", " + selectedTeam.currentBracket.awayTeam.school + ": " + (awayScore/100).toFixed().toString();
        if(selectedTeam == selectedTeam.currentBracket.homeTeam) {
            if(whichCommentary%2 !== 0) {
                document.getElementById("secondMessage").innerHTML = "Tough loss, but you get another crack at them later";
            } else {
                document.getElementById("secondMessage").innerHTML = "New game, new opponent looking forward";
            }
            selectedTeam.currentBracket.awayTeam.nextBracket("w");
            selectedTeam.currentBracket.homeTeam.nextBracket("l");
        } else {
            selectedTeam.currentBracket.homeTeam.nextBracket("l");
            selectedTeam.currentBracket.awayTeam.nextBracket("w");
            document.getElementById("secondMessage").innerHTML = "Congrats! You move to " + selectedTeam.winLossRecord[0].toString()+ "-"+selectedTeam.winLossRecord[1].toString();
        }
    } else {
        console.log("C");
        homeScore += 100;
        document.getElementById("message").innerHTML = "Final score - " + selectedTeam.currentBracket.homeTeam.school + ": " + ((homeScore/100).toFixed()).toString() + ", " + selectedTeam.currentBracket.awayTeam.school + ": " + (awayScore/100).toFixed().toString()
        if(selectedTeam == selectedTeam.currentBracket.homeTeam) {
            selectedTeam.currentBracket.awayTeam.nextBracket("l");
            selectedTeam.currentBracket.homeTeam.nextBracket("w");
            document.getElementById("secondMessage").innerHTML = "Congrats! You move to " + selectedTeam.winLossRecord[0].toString()+ "-"+selectedTeam.winLossRecord[1].toString();
        } else {
            if(whichCommentary%2 !== 0) {
                document.getElementById("secondMessage").innerHTML = "Tough loss, but you get another crack at them later";
            } else {
                document.getElementById("secondMessage").innerHTML = "New game, new opponent looking forward";
            }
            selectedTeam.currentBracket.homeTeam.nextBracket("w");
            selectedTeam.currentBracket.awayTeam.nextBracket("l");
        }
    }
    resetButtons('I should rest', 'I need to practice', 'rest()', 'prep()');
}

function rest() {
    document.getElementById("message").innerHTML = "";
    $("#picsToPost").show()
}

function prep() {
    if(selectedPlayer.position == "G") {
        shooting(10, false);
        console.log("guard")
    } else {
        rebounds(10, false);
        console.log("center")
    }
}

function finishPrep() {
    $("#messenger, #showFollowers").show();
    $("#courtTable, #timer, #secondMessage").hide();
    $("#messenger").css("height", "180px");
    document.getElementById("message").innerHTML = "Okay, time for a rematch!";
    resetButtons("Yay", "Noooo!", 'firstHalfBracket(' + selectedTeam.currentBracket.id.toString() + ')', 'firstHalfBracket(' + selectedTeam.currentBracket.id.toString() + ')');
    selectedPlayer.FG += Math.round(practiceShotCount/.15)/10;
}


//then play another game