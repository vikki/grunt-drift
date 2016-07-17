Proof of Concept Grunt plugin for [Drifting](http://pacificrim.wikia.com/wiki/Drift), using a [LeapMotion](https://www.leapmotion.com/) to drift and set up a Grunt deploy. 
=====

tl;dr I made a grunt plug-in, that uses browser-based [LeapMotion](https://www.leapmotion.com/) code to detect that 2 connected parties have made a gesture, indicating that a deploy should proceed. The gesture is the same gesture used in Pacific Rim to enter the Drift. It's not super useful but it was fun to make and made a good tech talk for Open Tech School :)

After seeing [Pacific Rim](http://www.imdb.com/title/tt1663662/) we realised that [pairing](http://www.extremeprogramming.org/rules/pair.html) is really a lot like [drifting](http://pacificrim.wikia.com/wiki/Drift), so I thought it would be fun to see if we can implement some of the drift mechanics in our deploy process.

In pair programming, we work together to ensure code is ready for deployment before it's released. When both people agree that code is ready, we start the deploy process. When entering a drift, a specific gesture is made by two people to begin the process. I basically combined these concepts to make the plugin.

## But how does it work?
It's a standard grunt plugin that extends the [connect](https://www.npmjs.com/package/grunt-contrib-connect) plugin to start up a webserver listening for web socket connections. When the grunt task runs it blocks until it receives 2 'drift joined' events from clients, indicating that 2 clients have accepted the deploy and entered the drift, meaning that the deploy should proceed.

The connect webserver also serves up the client HTML. This includes code that uses the Leap Motion API to watch for the appropriate gesture. The client connects to the websocket server, and in response to the gesture, the 'drift joined' event is emitted.

## How do I use it?
Either way you'll need to globally install grunt-cli and bower with npm, like `npm install grunt-cli bower`, and then install the dependencies with 
    
    bower install
    npm install

### To test it out in this project
Just type in
`grunt`
and the task will run. Once you head to the URL provided, if you make the gesture with a leap motion in 2 tabs, the task will complete, and the next task will run.

## To use it in another project

- Pull in the package with npm
- Register the task with 
    `grunt.loadNpmTasks('grunt-drift');`
- Setup grunt config like 
 `  grunt.initConfig({
    drift: {
      stuff: {}
    }
  });`
- Call the task wherever you want the task to block until 2 people join the drift! See [grunt docs](http://gruntjs.com/getting-started) for details

## To test it out without a LeapMotion
I exposed the function that is called when the gesture is matched as `window.drift` so you can try out the web sockets bits without a leapmotion, but it's not as cool this way.

## What next?
Well it doesn't check that both drift events are from different clients, which is half the point, we should check that. It would also be good to provide a link to the code that is supposed to be being accepted. Finally we could also announce that people need to join the drift, via a slackbot or similar.