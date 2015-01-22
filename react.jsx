var containerDiv = document.createElement("DIV");
containerDiv.id = "container";
document.body.appendChild(containerDiv);

var Game = React.createClass({
    getInitialState: function() {
        return {
            //Initial state of the game board.
            tiles:  [
                '', '', '',
                '', '', '',
                '', '', ''
            ],
            //Noughts always have the first go.
            turn: 'O'
        };
    },
    //Tile click method to modify the state of the tiles array
    tileClick: function(position, player) {
        var tiles = this.state.tiles;
        if(tiles[position] !== '') return;
        tiles[position] = player;
        this.setState({tiles: tiles, turn: player === 'O' ? 'X' : 'O'});

    },
    render: function() {
      return (
        <div>
          <h1>Tic Tac Toe</h1>
          <TurnDisplay turn={this.state.turn} />
          <div id='game'>
              { this.state.tiles.map(function(tile,position){
                  return (
                      <Tile status={tile} position={position} turn={this.state.turn} tileClick={this.tileClick} />
                      );
              }, this) }
          </div>
        </div>
      );
    }
});
var Tile = React.createClass({
    //The method to handle when a user clicks on the tile, calls the tileClick method on the parent component that is referenced in the props object.
    clickHandler: function() {
        this.props.tileClick(this.props.position, this.props.turn);
    },
    render: function() {
        return <div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status} onClick={this.clickHandler}>{this.props.status}</div>;
    }
});

var TurnDisplay = React.createClass({
  render: function(){
    return (
      <h3>Your turn {this.props.turn}</h3>
    );
  }
})

React.render(
  <Game />,
  document.getElementById('container')
);