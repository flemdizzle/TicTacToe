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
            turn: 'O',
            message: 'Your turn '
        };
    },
    checkWinner: function(){
      var t = this.state.tiles;
      var winner = function(a,b,c){
        var line = a + b + c;
        if(line === "XXX" || line === "OOO") return true;
      };
      //Horizontal
      if(winner(t[0], t[1], t[2])) return true;
      if(winner(t[3], t[4], t[5])) return true;
      if(winner(t[6], t[7], t[8])) return true;
      //Vertical
      if(winner(t[0], t[3], t[6])) return true;
      if(winner(t[1], t[4], t[7])) return true;
      if(winner(t[2], t[5], t[8])) return true;
      //Diagonal
      if(winner(t[0], t[4], t[8])) return true;
      if(winner(t[2], t[4], t[6])) return true;
      //Draw
      if(t.join('').length === 9){
        return "Draw";
      };
      return false;

    },
    replaceAll: function(letter, message){
      var tiles = this.state.tiles
      for(var i = tiles.length; i--;){
            tiles[i] = letter;
          }
      this.setState({turn: '', tiles: tiles, message: message});
    },
    newGame: function(){
      this.setState(this.getInitialState());
    },
    //Tile click method to modify the state of the tiles array
    tileClick: function(position, player) {
        var tiles = this.state.tiles;
        if(tiles[position] !== '') return;
        tiles[position] = player;
        this.setState({tiles: tiles});
        if(!this.checkWinner()){
          this.setState({turn: player === 'O' ? 'X' : 'O'});
        }else if(this.checkWinner() === "Draw"){        
          this.replaceAll("D","DRAW! Nobody Wins.");
        }else{
          var message = player + " WINS!"
          this.replaceAll(player, message);
        }


    },
    render: function() {
      return (
        <div>
          <Display newGame={this.newGame} turn={this.state.turn} message={this.state.message} />
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
        <button onClick={this.props.newGame}>New Game</button>
        <h3>{this.props.message}{this.props.turn}</h3>
      </div>
    );
  }
})
React.render(
  <Game />,
  document.getElementById('container')
);