# Discofy
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
 ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Table of Contents
* [Over dit project](#over-dit-project)
* [Installatie](#installatie)
* [Wiki](#wiki)
* [License](#license)

## Over dit project
Discofy is een webapplicatie die jouw Spotify playlists visualiseert. Dit gebeurt aan de hand van data geleverd door de Spotify api. De applicatie is gemaakt in Angular en heeft een kleine Vercel backend. De applicatie is gemaakt voor de minor Information Design van de Hogeschool van Amsterdam.

## Installatie
Hieronder volgt een stappenplan om de applicatie te installeren en te draaien. Voor een volledige uitleg van de installatie, zie de [wiki](https://github.com/Laurens256/tech-track-22-23/wiki/Installatie).

### Clone deze repository
* Via de command line met ssh: 
```
$ git clone git@github.com:Laurens256/tech-track-22-23.git
```

### Spotify for Developers
Om zelf een project te maken met de Spotify api, start je via [Spotify for Developers](https://developer.spotify.com/dashboard/login) een project. Dit is gratis en vereist niet veel werk. In deze developer portal krijg je ook je environment variables die je in de volgende stap nodig zal hebben.

In deze developer portal voeg je bij de instellingen ook een `redirect url` in. Deze url moet overeen komen met de `API_URI` die we straks bij de environment variables in gaan vullen.

### Environment variables
* `CLIENT_ID=` de client id, ontvangen in de Spotify for developers dashboard.
* `CLIENT_SECRET=` de client secret, ontvangen in de Spotify for developers dashboard.
* `API_URI=` de url waar de gebruiker naartoe wordt gestuurd tijdens Spotify authorisatie.
* `REDIRECT_URI_DECODED=` de url waar de gebruiker naartoe wordt gestuurd na de oAuth authorisatie flow. Deze variabele is geen onderdeel van de Spotify authorization flow, maar onderdeel van mijn eigen projectstructuur.

### Installeer de dependencies
Via de terminal, in de root van de projectfolder:
```npm install```

### De development server starten
Via de terminal, in de root van de project folder: `npm run devstart`. Deze command start via Vercel een lokale server op port 3000.

Na deze stappen te volgen, kan je de webapplicatie vinden op `http://localhost:3000`.


## Wiki
Tijdens dit project, heb ik mijn proces gedocumenteerd in de Github [wiki](https://github.com/Laurens256/tech-track-22-23/wiki/). In deze wiki is te lezen over mijn proces en de keuzes die ik heb gemaakt. Ook zijn mijn onderzoeken en aantekeningen van colleges hier te vinden.

## License
Deze repository is gelicenseerd onder de MIT license. Dit houdt in dat iedereen mijn werk vrij kan gebruiken, verspreiden of aanpassen. Dit geldt ook voor commercieel gebruik. Voor meer informatie over deze license, zie: [choosealicense](https://choosealicense.com/licenses/mit/).
MIT License

Copyright (c) 2022 Laurens Duin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
