interface IImage {
  png: string
  webp: string
}

export default interface IUser {
  image: IImage
  username: string
}
