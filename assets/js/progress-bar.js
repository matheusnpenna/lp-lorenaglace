$(document).ready(function() {
  var $progressBar = $(".progress-bar");
  var goal = $progressBar.data("goal");
  for(var i = 0; i <= parseInt(goal); i++) {
    (function(i) {
      setTimeout(() => {
        $progressBar.css("width", i + "%");
        $progressBar.html(i + "%");
      }, 10 * i);
    })(i);
  }
});