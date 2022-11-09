export interface UserPlaylistData {
  href: string
  items: [
    {
      track: {
        id: string
      }
    }
  ]
  limit: number
  next: null | string
  offset: number
  previous: null | string
  total: number
}
