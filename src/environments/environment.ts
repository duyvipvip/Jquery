// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBPECgJPQXoUgTBMeSb4rfHxkP5G4cnsVw',
    authDomain: 'todo-app-499dc.firebaseapp.com',
    databaseURL: 'https://todo-app-499dc.firebaseio.com',
    projectId: 'todo-app-499dc',
    storageBucket: 'todo-app-499dc.appspot.com',
    messagingSenderId: '554485517061'
  }
};
