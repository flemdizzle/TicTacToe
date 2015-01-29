var containerDiv = document.createElement("DIV");
containerDiv.id = "container";
document.body.appendChild(containerDiv);

var Game = React.createClass({
    getInitialState: function() {
        return {
            tiles:[
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','',''],
              ['','','','','','','','','']
            ],
            gameStatus:[
              '','','',
              '','active','',
              '','',''
            ],
            turn: 'O',
            message: 'Your turn '
        };
    },
    checkWinner: function(arr){
        //need to just pass in the array that you want it to check
        //This checks for winners
        var winner = function(a,b,c){
          var line = a + b + c;
          if(line === "XXX" || line === "OOO") return true;
        };
        //Horizontal
        if(winner(arr[0], arr[1], arr[2])) return true;
        if(winner(arr[3], arr[4], arr[5])) return true;
        if(winner(arr[6], arr[7], arr[8])) return true;
        //Vertical
        if(winner(arr[0], arr[3], arr[6])) return true;
        if(winner(arr[1], arr[4], arr[7])) return true;
        if(winner(arr[2], arr[5], arr[8])) return true;
        //Diagonal
        if(winner(arr[0], arr[4], arr[8])) return true;
        if(winner(arr[2], arr[4], arr[6])) return true;
        //Draw
        if(arr.join('').length === 9){
          return "Draw";
        };
      return false;
    },
    replaceAll: function(tileArray, letter){
      //this needs to be replaced with logic for new nested tiles
      var tiles = this.state.tiles;
      var gameStatus = this.state.gameStatus;
      for(var i = tiles[tileArray].length; i--;){
            tiles[tileArray][i] = letter;
          }
      gameStatus[tileArray] = letter;
      this.setState({tiles: tiles, gameStatus: gameStatus});
    },
    newGame: function(){
      this.setState(this.getInitialState());
    },
    activeControl: function(tileArray, position){
      //check if game status is already occupied
      var gameStatus = this.state.gameStatus;
      if (gameStatus[position] !== "") return;
      gameStatus[tileArray] = "";
      gameStatus[position] = "active";
      this.setState({gameStatus: gameStatus});
    },
    tileClick: function(tileArray, position, player) {
      if(this.state.gameStatus[tileArray] !== "active") return;
      var tiles = this.state.tiles;
      if(tiles[tileArray][position] !== '') return;
      tiles[tileArray][position] = player;
      this.setState({tiles: tiles});
      this.activeControl(tileArray, position);
      if(!this.checkWinner(this.state.tiles[tileArray])){
        this.setState({turn: player === 'O' ? 'X' : 'O'});
      }else if(this.checkWinner(this.state.tiles[tileArray]) === "Draw"){        
        this.replaceAll(tileArray, "D");
      }else{
        this.replaceAll(tileArray, player);
        if(this.checkWinner(this.state.gameStatus)){
          var message = player + ' WINS!';
          this.setState({turn: '', message: message});
        }else{
          this.setState({turn: player === 'O' ? 'X' : 'O'});
        }
      }
    },
    render: function() {
      return (
        <div>
          <Display newGame={this.newGame} turn={this.state.turn} message={this.state.message} />
          <div>
          { 
            this.state.tiles.map(function(tile,position,array){
              tileArray = [];
              for (var i = 0; i < tile.length; i++) {
                gameClass = "game" + position;
                tileArray.push(<Tile tileArray={position} status={tile[i]} position={i} turn={this.state.turn} tileClick={this.tileClick} />);
              };
              return (
                <div id="game" className={this.state.gameStatus[position]} >
                  {tileArray}
                </div>
              );
            }, this) 
          }
          </div>
        </div>
      );
    }
});
var Tile = React.createClass({
    clickHandler: function() {
        this.props.tileClick(this.props.tileArray, this.props.position, this.props.turn);
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