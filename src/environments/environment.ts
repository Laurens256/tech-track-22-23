// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: '176a1a3e2d5a4065983995129a9b96bf',
  apiUrl: 'http://localhost:3000/api/authorize/',
  otherSources: [
    {
      name: 'Disco Ball',
      source: 'https://codepen.io/YusukeNakaya/pen/WNoWzxX'
    },
    {
      name: 'Searchlights',
      source: 'https://codepen.io/bennettfeely/pen/OJqBgL?editors=1100'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
