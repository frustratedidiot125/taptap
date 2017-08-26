var express = require("express");
var alexa = require("alexa-app");
var bodyParser = require('body-parser');
var morsehash = require("./morse.json");
var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("alexa");

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

  


alexaApp.launch(function(req, res) {

  
 // res.session('persstep', 0); //maybe we want to put that or some variation of this somewhere else like in the intent. We also never  figured out the repeat function but the hell with that.
  var prompt = "Hi there! I'm a rudimentary english character to morse code translator. Say what's morse for, followed by the single letter or number you'd like to translate. Say stop at any time to exit.";
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

alexaApp.intent('Whatsmorse', {
    "slots": {"character" : "chars" },
    "utterances": ["continue", "next step", "begin", "{stepno}", "step {stepno}", "go to {stepno}", "go to step {stepno}", "read step {stepno}", "begin with step {stepno}", "start at step {stepno}"]
  },
  function(req, res) {
  var slotchar = req.slot('character');
 // validate character, if good, then go, if no good, then say dont understand or dont kmow. for what youve entered. orrr just evaluate as morsehash[slotchar] and if no result, then whatever. 
  if (!slotchar){
    res.say("I'm sorry, I didn't catch that. Please try again. Say what's morse for, followed by the single character you'd like to translate. Say stop to exit.").shouldEndSession(false);
  } else if (!morsehash[slotchar]){
    res.say("I'm sorry, I don't know the morse code sequence for " + slotchar + ". Please try again, and make sure to supply a single character only, or say stop to exit.").shouldEndSession(false);
  } else if (morsehash[slotchar]){
    res.say("The morse code for <say-as interpret-as=\"spell-out\">" + slotchar + "</say-as> is <say-as interpret-as=\"spell-out\">" + morsehash[slotchar] + "</say-as>. Say what's morse for and give a letter or number, or say stop to exit.").shouldEndSession(false);  
  } else {
    res.say("I'm sorry, I either didn't catch that or don't know the morse code for what you said. Please try again. Say what's morse for, followed by the single character you'd like to translate.").shouldEndSession(false);
  }
    });
  
  alexaApp.intent('oneofftrans', {
    "slots": {"character" : "chars" },
    "utterances": ["continue", "next step", "begin", "{stepno}", "step {stepno}", "go to {stepno}", "go to step {stepno}", "read step {stepno}", "begin with step {stepno}", "start at step {stepno}"]
  },
  function(req, res) {
  var slotchar = req.slot('character');
 // validate character, if good, then go, if no good, then say dont understand or dont kmow. for what youve entered. orrr just evaluate as morsehash[slotchar] and if no result, then whatever. 
  if (!slotchar){
    res.say("I'm sorry, I didn't catch that. Please try again. Say what's morse for, followed by the single character you'd like to translate. Say stop to exit.").shouldEndSession(false);
  } else if (!morsehash[slotchar]){
    res.say("I'm sorry, I don't know the morse code sequence for " + slotchar + ". Please try again, and make sure to supply a single character only, or say stop to exit.").shouldEndSession(false);
  } else if (morsehash[slotchar]){
    res.say("The morse code for <say-as interpret-as=\"spell-out\">" + slotchar + "</say-as> is <say-as interpret-as=\"spell-out\">" + morsehash[slotchar] + "</say-as>.").shouldEndSession(true);  
  } else {
    res.say("I'm sorry, I either didn't catch that or don't know the morse code for what you said. Please try again. Say what's morse for, followed by the single character you'd like to translate.").shouldEndSession(false);
  }
    });
  
  

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
  function(request, response) {
    
var HELP_MESSAGE = "Say what's morse for, followed by the single character you'd like to translate. Say stop to exit.";
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
