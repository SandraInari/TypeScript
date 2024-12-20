class Move {
    name: string;
    damage: number;

    constructor(name: string, damage: number) {
        this.name = name;
        this.damage = damage;
    }

    use() {
        return this.damage;
    }
}

class Pokemon {
    name: string;
    hp: number;
    moves: Move[];

    constructor(name: string, hp: number, moves: Move[]) {
        this.name = name;
        this.hp = hp;
        this.moves = moves;
    }

    attack(move: Move, target: Pokemon) {
        target.hp -= move.use();
    }

    isFainted() {
        return this.hp <= 0;
    }
}

class Battle {
    player: Pokemon;
    enemy: Pokemon;

    constructor(player: Pokemon, enemy: Pokemon) {
        this.player = player;
        this.enemy = enemy;
    }

    playerAttack(moveIndex: number) {
        const move = this.player.moves[moveIndex];
        this.player.attack(move, this.enemy);

        if (this.enemy.isFainted()) {
            alert(`${this.enemy.name} foi derrotado!`);
        } else {
            this.enemyTurn();
        }
    }

    enemyTurn() {
        const randomMove = Math.floor(Math.random() * this.enemy.moves.length);
        const move = this.enemy.moves[randomMove];
        this.enemy.attack(move, this.player);

        if (this.player.isFainted()) {
            alert(`${this.player.name} foi derrotado!`);
        }
    }
}

// Criando os golpes
const thunderbolt = new Move("Thunderbolt", 25);
const quickAttack = new Move("Quick Attack", 10);
const ironTail = new Move("Iron Tail", 15);
const electroBall = new Move("Electro Ball", 20);

const ember = new Move("Ember", 20);
const scratch = new Move("Scratch", 10)
const growl = new Move("Growl", 0)
const flamethrower = new Move("Flamethrower", 30)

// Criando os Pokémon
const pikachu = new Pokemon("Pikachu", 100, [thunderbolt, quickAttack, ironTail, electroBall]);
const charmander = new Pokemon("Charmander", 100, [ember, scratch, growl, flamethrower]);

// Inicializando a batalha
const battle = new Battle(pikachu, charmander);

// Renderizando golpes no DOM
const playerMovesDiv = document.getElementById("player-moves")!;
pikachu.moves.forEach((move, index) => {
    const moveButton = document.createElement("button");
    moveButton.textContent = move.name;
    moveButton.addEventListener("click", () => battle.playerAttack(index));
    playerMovesDiv.appendChild(moveButton);
});
