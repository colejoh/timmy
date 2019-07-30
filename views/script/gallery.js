// (function() {
//   const gal = document.getElementById('gallery');
//   const len = 1000; // Length image stays
//   gal.style.backgroundImage="url('../img/group.jpg')";
//
//
//   var decodedJson = decodeURIComponent("{{{images}}}");
//   console.log(decodedJson);
//   var jsonObj = JSON.parse(decodedJson);
//
//   console.log(jsonObj);
//
//
//   loopGal(gal, [], 0);
// })()
//
// function loopGal(gal, images, i) {
//   console.log("hi");
//   setTimeout(function() {
//     gal.style.backgroundImage="url('../img/group.jpg')";
//     console.log(gal.style.backgroundImage);
//     loopGal(gal, images, 0);
//   }, 3000);
// }
