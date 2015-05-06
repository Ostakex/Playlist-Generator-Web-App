<?php
$artist_name = array();
$playlist = array();

if (isset($_POST['artist'])) {
getArtist();
printPlaylist();
}





function printPlaylist() {
	global $playlist;
	shuffle($playlist);
	$x = 1;
	
	foreach($playlist as $artistname) {
		$songname = explode(":", $artistname);
		echo "<a href='https://musicbrainz.org/artist/'" . urlencode($songname[3]) . "><tr>
			<th scope='row'> " . $x . " </th>
		";
		echo "<td> " . $songname[0] . " </td>
		";
		echo "<td> " . $songname[1] . " </td>
		";
		echo "</tr></a>
		";
		$x++;
	}
}

function getArtist() {
	global $playlist, $artist_name, $playlist_artist, $playlist_song;

	$xmlartistdata = simplexml_load_file('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='.
		urlencode($_POST['artist']) . '&limit=8&autocorrect=1&api_key=5f64776005b0b9fbd3b7e374b8073083');

	foreach($xmlartistdata->similarartists->artist as $artist) {
		array_push($artist_name, $artist->name);
	}

	foreach($artist_name as $name) {
		$xmlsongdata = simplexml_load_file('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' .
			urlencode($name) . '&limit=10&api_key=5f64776005b0b9fbd3b7e374b8073083');

		foreach($xmlsongdata->toptracks->track as $track) {
			array_push($playlist, $name . ":" . $track->name . ":" . $track->mbid);
		}
	}	
}


?>