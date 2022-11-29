import { Injectable } from '@angular/core';

@Injectable()
export class DanceService {
  constructor() { }

  genDanceability(danceability: number) {
    const template = ['<img src="/assets/img/visualisation/', '.gif" alt="dancing animal">'];
    const danceabilityArr: string[] = [];
    let level: 'low' | 'mid' | 'high' = 'low';

    if (danceability >= 33 && danceability <= 66) {
      level = 'mid'
    } else if (danceability >= 66) {
      level = 'high'
    }

    for (let i = 0; i < 3; i++) {
      const file = `${template[0]}dance_${level}_${i}${template[1]}`;
      danceabilityArr.push(file);
    }

    return { gifs: danceabilityArr, source: this.sourceGifs[level] };
  }

  sourceGifs = {
    low: [
      { name: 'Milk Mocha Dance Sticker', source: 'https://tenor.com/view/milk-mocha-dance-cute-dancing-grooves-gif-16875359' },
      { name: 'Cute Hello Kitty Sticker', source: 'https://tenor.com/en-GB/view/cute-hello-kitty-hearts-dance-gif-16314321' },
      { name: 'Happy Dancing Sticker', source: 'https://tenor.com/view/happy-dancing-cute-cat-delighted-gif-16286608' },
    ],
    mid: [
      { name: 'Love Mochi Sticker', source: 'https://tenor.com/view/love-mochi-cute-cat-gif-14105323' },
      { name: 'Distracton Dance Cats Sticker', source: 'https://tenor.com/view/distracton-dance-cats-eric-the-cat-humor-just-like-giolaboman-gif-21537298' },
      { name: 'Mocha Sticker', source: 'https://tenor.com/view/mocha-gif-20253967' },
    ],
    high: [
      { name: 'Dancing Sticker', source: 'https://tenor.com/view/dancing-gif-24393094' },
      { name: 'Bear Dance Sticker', source: 'https://tenor.com/view/bear-dance-gif-21364988' },
      { name: 'Mocha Bear Sticker', source: 'https://tenor.com/view/mocha-bear-dance-happy-smile-gif-14783170' },
    ]
  }
}
