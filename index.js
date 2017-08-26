var express = require("express");
var alexa = require("alexa-app");
var bodyParser = require('body-parser');
var morsehash = require("./morse.json);
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
var steps = {
  8 : 'Hi there! I can tell you how to build an eclipse projection box so you can safely view a solar eclipse without ever staring directly at the sun! Just say begin to begin, Or say stop to exit.',
  1 : 'to begin, you\'ll need to collect the following supplies. A cardboard box, could be a cereal box, white copy paper, scissors, tape, aluminum foil, and a thumbtack or other sharp thin pin-like object.',
  2 : 'Cut a strip of white paper the size of the end of your box and tape it inside. ',
  3 : 'seal all the seams with strips of tape and aluminum foil to make it light tight. ',
  4 : 'Use the scissors to cut two holes on the far left and right sides of the box panel opposite the white paper.',
  5 : 'Cover one of the holes with foil and tape it in place. ',
  6 : 'Use the thumbtack, or similar thin, pointy ended object to Punch a pinhole through the foil.',
  7 : 'At this stage, the projector you\'ve built should be ready to use! You can wait for a solar eclipse, or you can test it out on any sunny day. Just go outside with your trusty contraption, turn your back to the Sun, line up the box with your shadow, and look through the big hole.  You should be able to see a very small, moderately bright, inverted image of the sun, in sharp focus, projected on the white paper screen on the other end of the inside of the box. If you don\'t see anything,  try moving the box or yourself around, and once you are properly lined up, the image should appear. Cool, eh? Happy sciencing!'
  };
  


alexaApp.launch(function(req, res) {

  
 // res.session('persstep', 0); //maybe we want to put that or some variation of this somewhere else like in the intent. We also never  figured out the repeat function but the hell with that.
  var prompt = "Hi there! I'm a rudimentary one-way morse code translator. Say what's morse for, followed by the single letter or number you'd like to translate. Say stop at any time to exit.";
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

alexaApp.intent('Whatsmorse', {
    "slots": {"character" : "chars" },
    "utterances": ["continue", "next step", "begin", "{stepno}", "step {stepno}", "go to {stepno}", "go to step {stepno}", "read step {stepno}", "begin with step {stepno}", "start at step {stepno}"]
  },
  function(req, res) {
  var slotchar = req.slot('character');
 // validate character, if good, then go, if no good, then say dont understand or dont kmow. for what youve entered. orrr just evaluate as morsehash[slotchar] and if no result, then whatever. 
  
  
  
      
   
        res.say("Step " + step + ". " + steps[step] + " When you're ready for the next step, say continue, or say step and the step number you wish to jump to.").shouldEndSession(false);
//step += 1;
      //  res.session('step', step);
        }
  
                //}
                );
  
  

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
  function(request, response) {
    
var HELP_MESSAGE = "Say continue to proceed to the next instructive step, or specify a step by sayibg saying step followed by a step number between 1 and 7.  Follow the instructions and further prompts or say stop to exit at any time. And remember, do NOT look directly at the sun!";
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
