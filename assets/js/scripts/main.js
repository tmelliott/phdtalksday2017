$(document).ready(function() {
  // call functions etc here
  Reveal.initialize({
    math: {
      jax: ["output/CommonHTML"],
  		// mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js',
  		config: 'TeX-AMS_HTML-full'  // See http://docs.mathjax.org/en/latest/config-files.html
  	},
    dependencies: [
  		{ src: 'assets/revealjs/plugin/math/math.js', async: true }
  	]
  });

  // more functions?
  graphs();
});
