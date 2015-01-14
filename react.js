
// document.addEventListener("DOMContentLoaded", function(event){
//   document.createElement("DIV");

// });

// document.body.onload = function();

// var newdiv = document.createElement("DIV");
// newdiv.id = "example";
// document.body.appendChild(newdiv);



// var demoDiv = document.createElement("DIV");
// demoDiv.id = "demo";
// document.body.appendChild(demoDiv);

// var container = document.getElementById("demo");

// var Hello = React.createClass({
//   render: function(){
//     return React.DOM.h1({}, "Hello, " + this.props.name);
//   }
// });

// var helloWorld = Hello({name: "Stephen"});

// React.render(helloWorld, container);

// setTimeout(function(){
//   helloWorld.setProps({
//     name: "Steven",
//     topics: ["React"]
//   });
// }, 2000);

var containerDiv = document.createElement("DIV");
containerDiv.id = "container";
document.body.appendChild(containerDiv);

(function(){

  var Game = React.createClass({displayName: "Game",
    getInitialState: function(){
      return {
        tiles: [
          '', '', '',
          '', '', '',
          '', '', ''
        ]
      };
    },
    render: function(){
      return React.createElement("div", null,
        React.createElement("div", {id: "game"},
            this.state.tiles.map(function(){
              return (
                  React.createElement(Tile, null)
                );
            }, this)
          ),
          React.createElement(Menu, null)
        );
    }

  });

  var Tile = React.createClass({displayName: "Tile",
    render: function() {
      return React.createElement("div", {className: "tile"});
    }
  });

  var Menu = React.createClass({displayName: "Menu",
    render: function(){
      return React.createElement("div", {className: "menu"});
    }
  });

  React.render(
    React.createElement(Game, null),
    document.getElementById("container")
    );
})();
  