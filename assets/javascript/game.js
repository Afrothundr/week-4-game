$(document).ready(function() {
	var Goku = 0;
	var Vegeta = 1;
	var Frieza = 2;
	var Piccolo = 3;
	var gokuElement = $("#goku");
	var vegetaElement = $("#vegeta");
	var friezaElement = $("#frieza");
	var piccoloElement = $("#piccolo");
	var gokuChosen = false;
	var vegetaChosen = false;
	var friezaChosen = false;
	var piccoloChosen = false;
	var gokuDefend = false;
	var vegetaDefend = false;
	var friezaDefend = false;
	var piccoloDefend = false;
	var attacker;
	var defender;
	var damage = 0;
	var counterAttack = 0;
	var enemyHealthLeft;
	var charHealthLeft = 0;
	var comboHits = 0;
	var combinedDamage = 0;


	var character = [	
	{  name: "Goku",
	   health: 120,
	   attack: 8,
	   counterAttack: 8,
	   alive: true,
	   normalMode: "assets/images/goku.jpg",
	   intenseMode: "assets/images/ssjGoku.jpg" },

	{  name: "Vegeta",
	   health: 100,
	   attack: 10,
	   counterAttack: 5,
	   alive: true,
	   normalMode: "assets/images/vegeta.png",
	   intenseMode: "assets/images/ssjVegeta.png" },

	{  name: "Frieza",
	   health: 180,
       attack: 6,
	   counterAttack: 25,
	   alive: true,
	   normalMode: "assets/images/frieza1.png",
	   intenseMode: "assets/images/frieza.png" },

	{  name: "Piccolo",
	   health: 150,
	   attack: 7,
	   counterAttack: 10,
	   alive: true,
	   normalMode: "assets/images/piccolo.jpg",
	   intenseMode: "assets/images/piccolomaskoff.png" }
	];

	$("#Goku-HP").html(character[Goku].health);
	$("#Vegeta-HP").html(character[Vegeta].health);
	$("#Frieza-HP").html(character[Frieza].health);
	$("#Piccolo-HP").html(character[Piccolo].health);

	function reset() {

	}

	gokuElement.on("click", function() {
		if ($("#chosen-char").is(":empty")) {
				$("#chosen-char").append(gokuElement);
				$("#enemies-avail").append(vegetaElement, friezaElement, piccoloElement);
				gokuChosen = true;
			}
		if (!gokuChosen && $("#defender").is(":empty")){
			$("#defender").append(gokuElement);
			gokuDefend = true;
		} 
	});

	vegetaElement.on("click", function() {
		if ($("#chosen-char").is(":empty")) {
				$("#chosen-char").append(vegetaElement);
				$("#enemies-avail").append(gokuElement, friezaElement, piccoloElement);
				vegetaChosen = true;
			}
		if (!vegetaChosen && $("#defender").is(":empty")){
			$("#defender").append(vegetaElement);
			vegetaDefend = true;
		}
	});

	friezaElement.on("click", function() {
		if ($("#chosen-char").is(":empty")) {
				$("#chosen-char").append(friezaElement);
				$("#enemies-avail").append(gokuElement, vegetaElement, piccoloElement);
				friezaChosen = true;
			}
		if (!friezaChosen && $("#defender").is(":empty")){
			$("#defender").append(friezaElement);
			friezaDefend = true;
		} 
	});

	piccoloElement.on("click", function() {
		if ($("#chosen-char").is(":empty")) {
				$("#chosen-char").append(piccoloElement);
				$("#enemies-avail").append(gokuElement, vegetaElement, friezaElement);
				piccoloChosen = true;
			}
		if (!piccoloChosen && $("#defender").is(":empty")){
			$("#defender").append(piccoloElement);
			piccoloDefend = true;
		} 
	});

	$("#attack").click(function() {
		comboHits++;
		findAttacker();
		findDefender();
		console.log(defender, attacker);
		switch (true) {
			case gokuDefend:
				enemyHealthLeft = parseInt($("#Goku-HP").html());
				enemyHealthLeft -= comboHits * attacker.attack;
				if (enemyHealthLeft > 0) {
					$("#Goku-HP").html(enemyHealthLeft);
				} else {
					defender.alive = false;
					$("#defeated-characters").append(gokuElement);
					gokuElement.attr("display", "none");
					gokuDefend = false;
				}
				break;
			case vegetaDefend:
				enemyHealthLeft = parseInt($("#Vegeta-HP").html());
				enemyHealthLeft -= comboHits * attacker.attack;
				if (enemyHealthLeft > 0) {
					$("#Vegeta-HP").html(enemyHealthLeft);
				} else {
					defender.alive = false;
					$("#defeated-characters").append(vegetaElement);
					vegetaElement.attr("display", "none");
					vegetaDefend = false;
				}
				break;
			case friezaDefend:
				enemyHealthLeft = parseInt($("#Frieza-HP").html());
				enemyHealthLeft -= comboHits * attacker.attack;
				if (enemyHealthLeft > 0) {
					$("#Frieza-HP").html(enemyHealthLeft);
				} else {
					defender.alive = false;
					$("#defeated-characters").append(friezaElement);
					friezaElement.attr("display", "none");
					friezaDefend = false;
				}
				break;
			case piccoloDefend:
				enemyHealthLeft = parseInt($("#Piccolo-HP").html());
				enemyHealthLeft -= comboHits * attacker.attack;
				if (enemyHealthLeft > 0) {
					$("#Piccolo-HP").html(enemyHealthLeft);
				} else {
					defender.alive = false;
					$("#defeated-characters").append(piccoloElement);
					piccoloElement.attr("display", "none");
					piccoloDefend = false;
				}
				break;
		}

		switch (true) {
			case gokuChosen:
				charHealthLeft = parseInt($("#Goku-HP").html());
				damage += attacker.attack;
				counterAttack = defender.counterAttack;
				if (defender.alive) {
					charHealthLeft -= counterAttack;
					$("#Goku-HP").html(charHealthLeft);
					if (charHealthLeft < 50) {
						$("#goku-img").attr("src", attacker.intenseMode);
					} if (charHealthLeft < 1) {
						alert("You Lost Play Again?")
						reset();
						$("#attackReadOut").empty();
						$("#defendReadOut").empty();
					}
					$("#attackReadOut").html("You attacked " + defender.name + " for " + damage + " damage!");
					$("#defendReadOut").html(defender.name + " attacked back for " + counterAttack + " damage!");
				} else {
					$("#attackReadOut").html("You have defeated " + defender.name + ". Choose another enemy! ");
					$("#defendReadOut").empty();
				}
				break;
			case vegetaChosen:
				charHealthLeft = parseInt($("#Vegeta-HP").html());
				damage += attacker.attack;
				counterAttack = defender.counterAttack;
				if (defender.alive) {
					charHealthLeft -= counterAttack;
					$("#Vegeta-HP").html(charHealthLeft);
					if (charHealthLeft < 50) {
						$("#vegeta-img").attr("src", attacker.intenseMode);
					} if (charHealthLeft < 1) {
						alert("You Lost Play Again?")
						reset();
						$("#attackReadOut").empty();
						$("#defendReadOut").empty();
					}
					$("#attackReadOut").html("You attacked " + defender.name + " for " + damage + " damage!");
					$("#defendReadOut").html(defender.name + " attacked back for " + counterAttack + " damage!");
				} else {
					$("#attackReadOut").html("You have defeated " + defender.name + ". Choose another enemy! ");
					$("#defendReadOut").empty();
				}
				break;
			case friezaChosen:
				charHealthLeft = parseInt($("#Frieza-HP").html());
				damage += attacker.attack;
				counterAttack = defender.counterAttack;
				if (defender.alive) {
					charHealthLeft -= counterAttack;
					if (charHealthLeft < 50) {
						$("#frieza-img").attr("src", attacker.intenseMode);
					} if (charHealthLeft < 1) {
						alert("You Lost Play Again?")
						reset();
						$("#attackReadOut").empty();
						$("#defendReadOut").empty();
					}
					$("#Frieza-HP").html(charHealthLeft);
					$("#attackReadOut").html("You attacked " + defender.name + " for " + damage + " damage!");
					$("#defendReadOut").html(defender.name + " attacked back for " + counterAttack + " damage!");
				} else {
					$("#attackReadOut").html("You have defeated " + defender.name + ". Choose another enemy! ");
					$("#defendReadOut").empty();
				}
				break;
			case piccoloChosen:
				charHealthLeft = parseInt($("#Piccolo-HP").html());
				damage += attacker.attack;
				counterAttack = defender.counterAttack;
				if (defender.alive) {
					charHealthLeft -= counterAttack;
					if (charHealthLeft < 50) {
						$("#piccolo-img").attr("src", attacker.intenseMode);
					} if (charHealthLeft < 1) {
						alert("You Lost Play Again?")
						reset();
						$("#attackReadOut").empty();
						$("#defendReadOut").empty();
					}
					$("#Piccolo-HP").html(charHealthLeft);
					$("#attackReadOut").html("You attacked " + defender.name + " for " + damage + " damage!");
					$("#defendReadOut").html(defender.name + " attacked back for " + counterAttack + " damage!");
				} else {
					$("#attackReadOut").html("You have defeated " + defender.name + ". Choose another enemy! ");
					$("#defendReadOut").empty();	
				}
				break;
			}

			if ($("#defeated-characters").children().length == 3) {
			$("#attackReadOut").html("You Won! Play Again?");
			$("#defendReadOut").empty();
			$("#play-again").css("display", "block");

		};

	});
		$("#play-again").click(function() {
			reset();
			$("#play-again").css("display", "none");
			$("#attackReadOut").empty();
			$("#defendReadOut").empty();

		});

		function findDefender() {
			switch (true) {
				case gokuDefend:
					defender = character[0];
					break;
				case vegetaDefend:
					defender = character[1];
					break;
				case friezaDefend:
					defender = character[2];
					break;
				case piccoloDefend:
					defender = character[3];
					break;
			}
		};

		function findAttacker() {
			switch (true) {
				case gokuChosen:
					attacker = character[0];
					break;
				case vegetaChosen:
					attacker = character[1];
					break;
				case friezaChosen:
					attacker = character[2];
					break;
				case piccoloChosen:
					attacker = character[3];
					break;
			}

		};
		

		function reset () {
		damage = 0;
		counterAttack = 0;
		enemyHealthLeft;
		charHealthLeft = null;
		comboHits = 0;
		combinedDamage = 0;
		gokuChosen = false;
		vegetaChosen = false;
		friezaChosen = false;
		piccoloChosen = false;
		gokuDefend = false;
		vegetaDefend = false;
		friezaDefend = false;
		piccoloDefend = false;
		$("#char-bank").append(gokuElement, vegetaElement, friezaElement, piccoloElement);
		character[0].alive = true;
		character[1].alive = true;
		character[2].alive = true;
		character[3].alive = true;
		$("#goku-img").attr("src", character[0].normalMode);
		$("#vegeta-img").attr("src", character[1].normalMode);
		$("#frieza-img").attr("src", character[2].normalMode);
		$("#piccolo-img").attr("src", character[3].normalMode);
		character[0].health = 120;
		character[1].health = 100;
		character[2].health = 180;
		character[3].health = 150;
		$("#Goku-HP").html(character[Goku].health);
		$("#Vegeta-HP").html(character[Vegeta].health);
		$("#Frieza-HP").html(character[Frieza].health);
		$("#Piccolo-HP").html(character[Piccolo].health);
		};

	});


