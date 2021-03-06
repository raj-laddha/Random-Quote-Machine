const colors = [
"#001f3f",
"#0074D9",
"#39CCCC",
"#B10DC9",
"#F012BE",
"#85144b",
"#FF4136",
"#FF851B",
"#3D9970",
"#2ECC40",
"#01FF70"];


let color = 0;
let currentQuote;
let currentAuthor;

const changeQuote = () => {
  $("#quote-box").animate(
  {
    opacity: 0,
    left: "+=50",
    height: "toggle" },

  1000,
  async () => {
    await $.getJSON("https://api.quotable.io/random", function (data) {
      $("#text").text(data.content);
      $("#author").text(data.author);
      currentQuote = data.content;
      currentAuthor = data.author;
    });

    await changeColors();

    $("#quote-box").animate(
    {
      opacity: 1,
      left: "+=50",
      height: "toggle" },

    1000,
    () => {
      $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

    });

  });

};

const changeColors = () => {
  $("body").css("background-color", colors[color]);

  $(".open-quote, .close-quote, .fa-twitter").css("color", colors[color]);

  color = (color + 1) % colors.length;
};

$(document).ready(() => {
  changeQuote();
});