(function() {
	function fire() {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//dsideblog.disqus.com/embed.js';
    var thing = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    console.log(thing);
    thing.appendChild(dsq);
  };
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fire);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'interactive')
        fire();
    });
  }
})();