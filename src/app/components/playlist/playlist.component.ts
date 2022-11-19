import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FastAverageColor } from 'fast-average-color';

import { Track, AudioFeatures, HighlightedTrack, Playlist } from 'src/app/core/models';

import { UserDataService } from 'src/app/core/services/userData.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  loading: boolean = true;
  hasPlaylist: boolean = false;
  visualisationOpen: boolean = false;

  playlist!: Playlist;

  playlistTracks: Track[] = [];
  playlistTrackIds: string[] = [];
  playlistTotal: number = 0;
  playlistDuration: number = 0;

  average = {
    valence: 0,
    danceability: 0,
    energy: 0,
    acousticness: 0,
    instrumentalness: 0,
  }

  highlights = {
    valence: {
      id_low: '',
      id_high: '',
      low: 2,
      high: -1,
    },
    danceability: {
      id_low: '',
      id_high: '',
      low: 2,
      high: -1,
    }
  }

  visualisationData = {
    averages: this.average,
    highlights: this.highlights,
  }


  ngOnInit(): void {
    //check of playlist uit route change wordt meegegeven zodat we die later niet hoeven requesten
    //history state is niet beschikbaar na reload
    if (history.state.data) {
      this.playlist = history.state.data;
      this.hasPlaylist = true;
    }
    const id: string = this.route.snapshot.queryParamMap.get('id')!;
    this.getPlaylistTracks(id);
    this.playlistTotal = parseInt(id.split(';')[1]);
  }

  async getPlaylistTracks(id: string) {
    //hasplaylist boolean geeft aan of extra info playlist nog moet worden aangevraagd (name, img etc.)
    const data = await this.userDataService.getPlaylistTracks(id, this.hasPlaylist);
    //als hasplaylist false wordt meegegeven, wordt in data .playlist extra meegegeven
    if (data.playlist != null) this.playlist = data.playlist;
    this.playlistTracks = data.alltracks;
    this.playlistTrackIds = data.allTrackIds;
    data.alltracks.forEach(item => {
      this.playlistDuration += item.duration_ms;
    })
    this.loading = false;
    this.getPlaylistColor(this.playlist.images[0].url);
  }

  getPlaylistColor(url: string) {
    const fac = new FastAverageColor();
    fac.getColorAsync(url)
      .then(color => {
        const header = document.querySelector('header');
        if (header != null) {
          header.style.background = `linear-gradient(${color.hex}, var(--bg-color))`;
        }
      })
  }



  async toggleVisualisation() {
    this.visualisationOpen = !this.visualisationOpen;

    if (this.visualisationOpen) {
      // 272px is de hoogte van de info section waar we voorbij willen scrollen
      //delay zodat playlists met weinig nummers ook scrollen en ziet er wel geinig uit
      setTimeout(() => window.scrollTo({ top: 272, behavior: 'smooth' }), 800)
    } else {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 800)
    }

    //check of highlights al is ingevuld met juiste data, 2 is een onmogelijke waarde nadat de functie een keer is uitgevoerd
    if (this.visualisationData.highlights.valence.low === 2) {
      const audioFeatures: AudioFeatures[] = await this.userDataService.getAudioFeatures(this.playlistTrackIds);
      this.averageAudioFeatures(audioFeatures)
      this.getHighlights(audioFeatures);
    }
  }

  averageAudioFeatures(arr: AudioFeatures[]) {
    //geef aan dat avgKey een sleutel is uit het average obj
    type avgKey = keyof typeof this.average;
    //loop over alle audio features en alle keys die we willen en tel ze bij elkaar op
    arr.forEach(item => {
      Object.keys(this.average).forEach(key => {
        this.average[key as avgKey] += item[key as avgKey]
      })
    })

    //maak een gemiddelde van alle audio features en doe het keer 100 zodat het 0-100 is ipv 0-1
    Object.keys(this.average).forEach(key => {
      this.average[key as avgKey] = this.average[key as avgKey] / arr.length * 100;
    });
  }

  getHighlights(arr: AudioFeatures[]) {
    //geef aan dat highlightKey een sleutel is uit het hightlights obj
    type highlightKey = keyof typeof this.highlights;

    //dit is echt de coolste code die ik ooit heb geschreven
    //loop over alle audio features waarvan we de highlights willen hebben
    Object.keys(this.highlights).forEach(key => {
      //loop door array met alle audio features
      arr.forEach(item => {
        //als een key van een item uit audio features array lager is dan de huidige laagste highlight: vervang de lage highlight. else check of die hoger is dan de hoogste highlight en vervang die
        if (item[key as highlightKey] < this.highlights[key as highlightKey].low) {
          this.highlights[key as highlightKey].low = item[key as highlightKey];
          this.highlights[key as highlightKey].id_low = item.id;
        }
        //losse if statement ipv else if omdat playlists met 1 nummer zowel de hoogste als laagste waarde hebben in 1 liedje
        if (item[key as highlightKey] > this.highlights[key as highlightKey].high) {
          this.highlights[key as highlightKey].high = item[key as highlightKey];
          this.highlights[key as highlightKey].id_high = item.id;
        }
      })
    });
  };

  backPage() {
    this.router.navigate(['home']);
  }
}
