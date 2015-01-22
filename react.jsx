var containerDiv = document.createElement("DIV");
containerDiv.id = "container";
document.body.appendChild(containerDiv);

var Game = React.createClass({
  getInitialState: function(){
    return {
      tiles: [
        "", "", "",
        "", "", "",
        "", "", ""
      ]
    };
  },
  render: function(){
    return(
      <div>
        <div id="game">
          Tiles will go here
          <Tile />
        </div>
      </div>
    );
  }
});

var Tile = React.createClass({
  render: function(){
    return (
      <div className='tile'>
        Tile
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('container')
);