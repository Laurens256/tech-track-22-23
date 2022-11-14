export interface UserPlaylistData {
  items: [{
    track: {
      album: {
        name: string,
        images: [{
          height: number
          url: string
          width: number
        }]
      }
      artists: [{
        id: string
        name: string
      }]
      disc_number: number
      duration_ms: number
      id: string
      name: string
      preview_url: string
      track: true
      track_number: 1
      uri: string
      video_thumbnail: { url: null | string }
    }
  }]
}
