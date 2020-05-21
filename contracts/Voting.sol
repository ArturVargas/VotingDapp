pragma solidity >=0.4.12 <0.7.0;

contract Voting {

    struct Voter {
        bool voted;
        address addr;
    }

    struct Proposal {
        uint256 proposalId;
        uint256[] proposalVotes;
    }

  // El admin es el creador de la votación.
    address public admin;
    uint256 voterCount = 0;
  // Para que la votación termine en un tiempo determinado usaré dos variables
    uint public votingEnd;
    bool public ended;

  // Creamos dos opciones a elegir en este caso podria ser: SI / NO
    Proposal[2] public Options;

  // Tomo el addres de cada votante
    mapping(address => Voter) public voters;

    constructor() public {
      // inicializo a admin con la direccion del usuario que deploya el contrato
        admin = msg.sender;

      // Creo un array vacio para guardar los votos que va teniendo cada opcion
        uint256[] memory emptyArray;

      // Inicializo mis dos opciones
        Options[0] = Proposal({ proposalId: 0, proposalVotes: emptyArray });
        Options[1] = Proposal({ proposalId: 1, proposalVotes: emptyArray });
    }

    // Creo la funcion para emitir el voto de cada votante
    // Al no estar lista la funcion de los resultados voy a retornar el numero de votos dentro de esta funcion de forma provicional
    function vote(uint256 _proposalId) public returns(uint){
      // El votante actual puede votar una sola vez y esta es la validación
        if(voters[msg.sender].voted) {
            revert('Solo se permite votar una vez por persona');
        }
        voters[msg.sender].voted = true;

      // Tomo el id de la opción por la que el usuario voto
      // Y en ese Id agrego un elemento al arreglo
        Proposal storage propItem = Options[_proposalId];
        propItem.proposalVotes.push(1);

      //Retorno el numero de votos que se han emitido a favor de esa opción
        return propItem.proposalVotes.length;
    }

// Los modifiers nos ayudaran a condicionar cuando una funcion puede ser ejecutada
// En este caso si el tiempo de la votación(15 días a partir de que se crea el contrato) a finalizado ya no se podrán emitir votos
  modifier onlyBefore(uint _time) {
    require(now < _time, 'El periodo de votación ha finalizado');
    _;
  }
}