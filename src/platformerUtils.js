export function loadColissionMap(map) {
  map.setCollisionBetween(771, 786);
  map.setCollisionBetween(691,700);
  map.setCollisionBetween(579,583);
  map.setCollisionBetween(456,470);
  map.setCollisionBetween(211,220);
  map.setCollision([146,147,181,182]);
  map.setCollision([299,300,301,334,335,336,369,370,371]);
  map.setCollision([71,72,106,107])
}

export function collideLadder(game, hero, ladder) {
    const isCollide = game.physics.arcade.overlap(hero, ladder, hero.climbLadder, null, hero);
    if(!isCollide && hero.isClimbing == true) {
      hero.leaveLadder();
    }
}