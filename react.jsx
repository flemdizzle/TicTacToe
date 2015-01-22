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
    checkWinner: function(){
      var t = this.state.tiles;
      var winner = function(a,b,c){
        var line = a + b + c;
        if(line === "XXX" || line === "OOO") return true;
      };
      //Horizontal
      if(winner(t[0], t[1], t[2])) return t[0];
      if(winner(t[3], t[4], t[5])) return t[3];
      if(winner(t[6], t[7], t[8])) return t[6];
      //Vertical
      if(winner(t[0], t[3], t[6])) return t[0];
      if(winner(t[1], t[4], t[7])) return t[1];
      if(winner(t[2], t[5], t[8])) return t[2];
      //Diagonal
      if(winner(t[0], t[4], t[8])) return t[0];
      if(winner(t[2], t[4], t[6])) return t[2];
      //Draw
      if(t.join('').length === 9) return "DRAW! Nobody";
      return false;

    },
    reset: function(){
      this.setState(this.getInitialState());
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
          <Display reset={this.reset} turn={this.state.turn} />
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

var Display = React.createClass({
  render: function(){
    return(
      <div className="display">
        <h1>Tic Tac Toe</h1>
        <button onClick={this.props.reset}>Reset Game</button>
        <h3>Your turn {this.props.turn}</h3>
      </div>
    );
  }
})
React.render(
  <Game />,
  document.getElementById('container')
);