<?php

$host = 'http://' . $_SERVER['HTTP_HOST'];
$title = 'Emissions Comparison Widget v1.0 Documentation'
?><!DOCTYPE html>
<html>
<head>
    <title><?=$title?></title>
    <style type="text/css">
        body {
            font-family: sans-serif;
        }
        code {
            display: block;
            background-color: #232323;
            color: #b5b5b5;
            padding: 1em 2em;
        }
        .indent-1 {
            display: block;
            padding-left: 3em;
        }
    </style>
</head>
<body>

<h1><?=$title?></h1>

<h2>Implementation</h2>

<p>Include a reference to the CSS in the head of your page:</p>

<code>
    <span class=indent-1>
        <p>...</p>
        <p>&lt;link rel=&quot;stylesheet&quot; href=&quot;<?=$host?>/emissions-comparison-widget.min.css&quot;&gt;</p>
    </span>
    &lt;/head&gt;
</code>

<p>Make an empty div with a unique id to house the widget's interface. Just before the closing body tag include the JavaScript file and a snippet that initialises the widget as follows:</p>

<code>
    <span class=indent-1>
        <p>...</p>

        <p>&lt;div id=ecw-container&gt;&lt;/div&gt;</p>

        <p>...</p>

        <p>&lt;script src=&quot;<?=$host?>/emissions-comparison-widget.min.js&quot;&gt;&lt;/script&gt;</p>
        
        <p>&lt;script&gt;<br>
            <span class=indent-1>emissionsComparisonWidget = new EmissionsComparisonWidget({<br>
                <span class=indent-1>container: 'ecw-container'</span>
            });<br>
            </span>
        &lt;/script&gt;</p>
    </span>

    <p>&lt;/body&gt;<br>
    &lt;/html&gt;</p>
</code>

<h2>Customisable Options</h2>

<p>TODO: Write what options can be included</p>

<footer>
    <p>The Emissions Comparison Widget is a product of <strong>Real World Visuals</strong> <a href="http://www.realworldvisuals.com/">www.realworldvisuals.com</a></p>
</footer>

</body>
</html>
