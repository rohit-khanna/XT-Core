/**
 *  FIRST APPROACH
 * */
const video = {
  genre: "sci-fi",
  list: ["a", "b", "c"],
  findMovies() {
    var self = this;
    this.list.forEach(function(movie, index) {
      console.log(self.genre + " " + movie);
    });
  }
};
video.findMovies();

/**
 *  SECOND APPROACH
 * */
const video1 = {
  genre: "sci-fi",
  list: ["a", "b", "c"],
  findMovies() {
    this.list.forEach(movie => {
      console.log(this.genre + " " + movie);
    });
  }
};
video1.findMovies();
