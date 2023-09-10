/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise40 = () => {
  const make_album = (
    artist_name: string,
    album_title: string,
    no_of_tracks?: number
  ) => {
    let music_album: Object;
    no_of_tracks == undefined
      ? (music_album = { artist_name, album_title })
      : (music_album = { artist_name, album_title, no_of_tracks });
    SpaceAround(() => {
      console.log(music_album);
    });
  };

  // Cant figure out artist name and album names to print
  make_album("Artist 01", "XYZ");
  make_album("Artist 02", "ABC");
  make_album("Artist 03", "DEF", 10);
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise40();

export default Exercise40;
