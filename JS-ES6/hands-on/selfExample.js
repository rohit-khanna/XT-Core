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
