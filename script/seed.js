'use strict'

const db = require('../server/db')
const {User, Game, Round, Player, Vote} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const games = await Promise.all([
    Game.create({status: 'in play'}),
    Game.create()
  ])

  const players = await Promise.all([
    Player.create({name: 'Alex', gameId: 1, role: 'predator', status: 'alive'}),
    Player.create({name: 'Alan', gameId: 1, role: 'predator', status: 'dead'}),
    Player.create({name: 'Alia', gameId: 1, role: 'prey', status: 'alive'}),
    Player.create({name: 'Allegra', gameId: 1, role: 'prey', status: 'alive'}),
    Player.create({name: 'Avery', gameId: 1, role: 'prey', status: 'dead'}),
    Player.create({
      name: 'Bella',
      gameId: 2,
      role: 'prey',
      status: 'alive'
    }),
    Player.create({
      name: 'Betty',
      gameId: 2,
      role: 'prey',
      status: 'alive'
    }),
    Player.create({name: 'Brianne', gameId: 2, role: 'prey', status: 'alive'}),
    Player.create({name: 'Brock', gameId: 2, role: 'prey', status: 'alive'})
  ])

  const rounds = await Promise.all([
    Round.create({
      gameId: 1,
      chosenPlayerId: 5,
      roundType: 'kill',
      status: 'closed'
    }),
    Round.create({
      gameId: 1,
      chosenPlayerId: 2,
      roundType: 'guess',
      status: 'closed'
    })
  ])

  const votes = await Promise.all([
    //6 total = 2 type 'kill' + 4 type 'guess'
    //not 7 total bc one person is killed by the mafia in the beginning of the round
    //so total votes for quess = totel players at beginning of round minus 1
    Vote.create({
      playerId: 1,
      roundId: 1,
      chosenPlayerId: 5,
      voteType: 'kill'
    }),
    Vote.create({
      playerId: 2,
      roundId: 1,
      chosenPlayerId: 5,
      voteType: 'kill'
    }),
    Vote.create({
      playerId: 1,
      roundId: 2,
      chosenPlayerId: 4,
      voteType: 'guess'
    }),
    Vote.create({
      playerId: 2,
      roundId: 2,
      chosenPlayerId: 3,
      voteType: 'guess'
    }),
    Vote.create({
      playerId: 3,
      roundId: 2,
      chosenPlayerId: 2,
      voteType: 'guess'
    }),
    Vote.create({
      playerId: 4,
      roundId: 2,
      chosenPlayerId: 2,
      voteType: 'guess'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${games.length} games`)
  console.log(`seeded ${players.length} players`)
  console.log(`seeded ${rounds.length} rounds`)
  console.log(`seeded ${votes.length} votes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
