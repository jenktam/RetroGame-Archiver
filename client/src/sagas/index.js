import { watchGetGames, watchDeleteGame } from './games';

export default function* rootSaga () {
// We start all the sagas in parallel
  yield* [
    watchGetGames(),
    watchDeleteGame() //must be run in parallel
  ];
}
