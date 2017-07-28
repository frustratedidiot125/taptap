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
var spinmessage = "Spinning.  ";
var HELP_MESSAGE = "You can give me an animal name, say spin the wheel, or stop to exit.";
var HELP_REPROMPT = "You can say, spin, the name of an animal, or stop to exit. Which would you like?";
var STOP_MESSAGE = "Goodbye!";


//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================/
//: = says or goes
var data = {
    'cow' : 'goes moo. Then it makes chomping noises.', // He was a good friend to many, but not me.",
    'rooster' : 'goes ah say ah say ah say ah say.',
    'rabbit' : 'says whats up doc. The rest of the rabbits stare silently.',
    'giraffe' : 'is usually too tall to hear.',
    'cat' : 'goes growl. It just sounds like meow.',
  //meow. That's usually an indication they want to eat their owner. ',
    'gerbil' : 'goes squeak. Then it bites your hand.',
    'dog' : 'goes grrr.',
    'goldfish' : 'goes in circles.',
    'capybara' : 'goes splash.',
    'PC' : 'goes ding!',
    'horse' : 'goes neigh, then goes and goes and gallops away.',
    'sheep' : 'goes baa! Then it votes republican.'
};

//var randomFact = function () {
//  var factArr = data;
//  var factIndex = Math.floor(Math.random() * factArr.length);
//  var nextFact = factArr[factIndex];
 // return nextFact;
//  };

var randomAnimalkey = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)]


//=========================================================================================================================================
//Editing anything below this line might break your skill.--  NVM just broke it.
//=========================================================================================================================================
// exports.handler = function(event, context, callback) {
 //   var alexa = Alexa.handler(event, context);
  //  alexa.APP_ID = APP_ID;
   // alexa.registerHandlers(handlers);
   // alexa.execute();
// };
// var handlers = {
   // 'LaunchRequest': function () {
     //   this.emit('GetNewFactIntent');
  //  },




alexaApp.launch(function(request, response) {
//var factArrA = data;
// var factIndexA = Math.floor(Math.random() * factArrA.length);
// var randomFactA = factArrA[factIndexA];
    response.say(HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
});

alexaApp.intent("Spin", {
  "slots": {},
                  "utterances": [
      "spin", "spin again", "spin the wheel"
    ]
  },
                function (request, response){
  response.say(spinmessage + "A " + randomAnimalkey + " " + data[randomAnimalkey]  ).shouldEndSession(true)});

alexaApp.intent("Animal", {
    slots: {Animalname: 'AMAZON.Animal'},
    utterances: ['{-|Animalname}', 'What sound does an {-|Animalname} make', 'What does an {-|Animalname} say', 'What does the {-|Animalname} say']
  },    
       function (request, response) {
                let color = request.slot('Animalname');

    let selectedColor = data[color];

    console.log('color:', color);

    if (selectedColor) {
      response.say(`The ${color} ${selectedColor}`);
      response.shouldEndSession(true);
    }
    else {
      response.say(`I don\'t know what sound a ${color} makes. As unlikely as it seems, I\'m not yet familiar with that species.`);
      response.shouldEndSession(true);
    }
  }
);

                
                
alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say(HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
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
