var express = require("express");
var alexa = require("alexa-app");
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("moo");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: true,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: false
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================
var steps = {
  'step 1' : 'to begin, you\'ll need to collect the following supplies. A cardboard box, could be a cereal box, white copy paper, scissors, 


alexaApp.launch(function(req, res) {

  
  res.session('step', 0);
  var prompt = "Hi there! I can tell you how to build an eclipse projection box. Just say begin, or say the number of the step you wish to resume. Say continue or next step to go on to the next step, or Say stop at any time to exit. ";
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

alexaApp.intent('StepIntent', {
    "slots": {"stepno" : "NUMBER" },
    "utterances": ["continue", "next step", "begin", "{stepno}", "step {stepno}", "go to {stepno}", "go to step {stepno}", "read step {stepno}", "begin with step {stepno}" "start at step {stepno}"]
  },
  function(req, res) {
  var slotstep = req.slot('stepno');
  
if (!isNaN(slotstep) && slotstep > 0 && slotstep < 8 && Number.isInteger(slotstep)){
  var step = slotstep; 
  } else if (!isNaN(slotstep) && slotstep == 0){
    var step = 1;
    
    } else if (slotstep > 7 && !isNaN(slotstep)){
      res.say("Whoa there, there are only 7 steps. Please choose a step between 1 and 7, or say next and I'll start from where I think you are.").shouldEndSession(false);
      } else if (slotstep < 0 && !isNaN(slotstep)){
        res.say("Really? Negative numbers? You must be messing with me  C'mon, let's try again, but this time, use positive integers between 1 and 7. Or say next.").shouldEndSession(false);
        } else {
  
      
      
  var step = (+req.session('step')) + 1;
          }
 //  var slotstep = req.slot('stepno');
   
 // var step = +req.session('stepno');
  //// Now I just have to figure out how to assign steps 1 through 7 and how to go to them and whether or not to use goto or some sort of array or use if statements
  // We have to head in if step = 8 with the auto increment, then say either you're all doned exit, or reset the counter and go to zero on the res.session. 
  // Have you considered a repeat function? Like to repeat the step? Because that doesn't work in the current structure.
  
    if (!step) { //rewrite if step equals 1, do this, else if step equals 2, res say this, if step doesn't make any sense, Rez say I'm sorry I didn't understand what you said there. Do you want to start over? And on the last one you should say something like stepwise session should end.
      res.say("I'm Sorry, I didn't hear you right. Please try again");
    } else if (guess == number) {
      res.say("Congratulations, you guessed the number in " + guesses + (guesses == 1 ? " try" : " tries"));
    } else {
      if (guess > number) {
        res.say("Guess lower");
      } else if (guess < number) {
        res.say("Guess higher");
      } else if (guess = "??") { 
        res.say("I'm sorry, that didn't sound like an actual number. Please try again, but this time, use just your integers!");
        } else if (isNaN(guess)) {
                  res.say("I'm sorry, I didn't hear you say a number. Please try again.");
          }
      res.reprompt("I didn't hear a number. Please try again.");
      res.session('guesses', guesses);
      res.shouldEndSession(false);
    }
  }
);
alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
  function(request, response) {
    
var HELP_MESSAGE = "Follow the guessing prompts or say stop to exit at any time.";
    response.say(HELP_MESSAGE).shouldEndSession(false);
  }
 );


 //   'AMAZON.HelpIntent': function () {
 //       var speechOutput = HELP_MESSAGE;
  //      var reprompt = HELP_REPROMPT;
  //      this.emit(':ask', speechOutput, reprompt);
  //  },
  //  'AMAZON.CancelIntent': function () {
    //    this.emit(':tell', STOP_MESSAGE);
 //   },
  //  'AMAZON.StopIntent': function () {
   //     this.emit(':tell', STOP_MESSAGE);
 //   }
// };


alexaApp.intent("AMAZON.StopIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok, Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Cancelling. Goodbye!").shouldEndSession(true);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
