// display images
// use when images are in src/assets folder
export const getImage = (path) => {
  console.log(path)
  return new URL(`../assets/images/${path}`, import.meta.url).href
}
