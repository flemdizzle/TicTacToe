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
            turn: 'o'
        };
    },
    //Tile click method to modify the state of the tiles array
    tileClick: function(position, player) {
        var tiles = this.state.tiles;
        if(tiles[position] !== '') return;
        tiles[position] = player;
        this.setState({tiles: tiles, turn: player === 'o' ? 'x' : 'o'});

    },
    render: function() {
        return <div>
            <div id='game'>
                { this.state.tiles.map(function(tile,position){
                    return (
                        <Tile status={tile} position={position} turn={this.state.turn} tileClick={this.tileClick} />
                        );
                }, this) }
            </div>
        </div>;
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

React.render(
  <Game />,
  document.getElementById('container')
);