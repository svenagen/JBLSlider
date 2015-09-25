# JBLSlider
A light weight responsive jQuery slider

Unique features
---------------
* Super light-weight
* Fixed height until safe-area width is reached, only then does the height begin to scale.
* Fade animation

Usage example
-----

Live JBLSLider Demo: http://www.joellisenby.com/jblslider/

```
<main>

<div class="slider" id="jblslider">
<div class="slide" style="background-image: url('slide1.jpg');">
<span class="caption"><a href="#">Slide 1 Caption Text</a></span>
<a href="#"></a>
</div>
<div class="slide" style="background-image: url('slide2.jpg');">
<span class="caption"><a href="#">Slide 2 Caption Text</a></span>
<a href="#"></a>
</div>
<div class="slide" style="background-image: url('slide3.jpg');">
<span class="caption"><a href="#">Slide 3 Caption Text</a></span>
<a href="#"></a>
</div>
<div class="slide" style="background-image: url('slide4.jpg');">
<span class="caption"><a href="#">Slide 4 Caption Text</a></span>
<a href="#"></a>
</div>
<div class="slide" style="background-image: url('slide5.jpg');">
<span class="caption"><a href="#">Slide 5 Caption Text</a></span>
<a href="#"></a>
</div>
</div><!--#slider -->

</main>

<link type="text/css" rel="stylesheet" href="jquery.jblslider.css" />
<script src="jquery-1.11.3.min.js"></script>
<script src="jquery.jblslider.js"></script>
<script>
$("#jblslider").jblSlider({
	safe_area: 640,
	duration: 1000,
	delay: 5000,
	resume: 20000
});
</script>
```
