import { Injectable } from '@angular/core';

@Injectable()
export class DanceService {
  constructor() { }

  genDanceability(danceability: number) {
    const template = ['<img src="/assets/img/visualisation/', '.gif" alt="dancing animal">'];
    const danceabilityArr: string[] = [];
    let level = 'low';

    if (danceability >= 33 && danceability <= 66) {
      level = 'mid'
    } else if (danceability >= 66) {
      level = 'high'
    }

    for (let i = 0; i < 3; i++) {
      const file = `${template[0]}dance_${level}_${i}${template[1]}`;
      danceabilityArr.push(file);
    }

    return danceabilityArr;
  }

  bronnen_gifs = {
    low: {
      0: 'https://fuckyeah-pixels.tumblr.com/post/33842467769',
      1: 'https://tenor.com/en-GB/view/cute-hello-kitty-hearts-dance-gif-16314321',
      2: '',
    },
    mid: {
      0: 'https://knowyourmeme.com/memes/dancing-cat-gif',
      1: 'https://tenor.com/en-GB/view/cat-dance-groove-cute-dancing-gif-16231868',
      2: 'https://tenor.com/en-GB/view/cat-dancing-gif-26079394',
      extra: 'https://twitter.com/USBFIG/status/1115050915059335169'
    },
    high: {
      0: 'https://giphy.com/gifs/cat-dance-furry-BK1EfIsdkKZMY',
      1: '',
      2: '',
    }
  }
}
