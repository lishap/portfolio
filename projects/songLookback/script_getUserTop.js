var app = {
	initialize: function() {
		app.requestAuthorization();
	},

	requestAuthorization: function(word){
		const hash = window.location.hash
		.substring(1)
		.split('&')
		.reduce(function (initial, item) {
			if (item) {
				var parts = item.split('=');
				initial[parts[0]] = decodeURIComponent(parts[1]);
			}
			return initial;
		}, {});
		window.location.hash = '';

		// Set token
		let _token = hash.access_token;

		const authEndpoint = 'https://accounts.spotify.com/authorize';

		// Replace with your app's client ID, redirect URI and desired scopes
		const clientId = '773495bcb32e481793e8419ec2eafc25';
		const redirectUri = 'https://lishap.github.io/song-lookback/';
		const scopes = [
			'user-top-read'
		];

		// If there is no token, redirect to Spotify authorization
		if (!_token) {
			window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
		}

		app.getUserTopTracks(_token);
	},

	getUserTopTracks: function(token){

		$.ajax({
			method: "GET",
			url: "https://api.spotify.com/v1/me/top/tracks",
			headers: {
				'Authorization': 'Bearer ' + token,
			},
			data: {
				'limit': '50',
                //'offset':'0',
				'time_range':'short_term',
			},

			success: function(data){

				var trackName = data.items[0].name;
				var artistsName = data.items[0].artists["0"].name;
				window.albumCoverURL = data.items["0"].album["images"][1].url;
				var trackLink = data.items["0"].external_urls["spotify"];
				var previewURL = data.items[0].preview_url;
				window.songId = data.items["0"].id;

				console.log("song ID = " + window.songId);

				const monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"];
				var date = new Date ();
				window.month = monthNames[date.getMonth()];
				window.year = date.getFullYear();

				$('.track-artist-name').html("My favorite song as of " + month + ", " + year + " is <a href=" + trackLink + ">" + trackName + " by " + artistsName + "</a> !");

				window.songText = ("My favorite song as of " + month + ", " + year + " is " + trackName + " by " + artistsName + "!");
				console.log(window.songText);

				var audioElement = document.createElement('audio');
				audioElement.src = previewURL;
				audioElement.autoplay = 'true';
				console.log("sound play");

				app.getBPM(token);
			},
		})
	},

	getBPM: function(token){
		var url = "https://api.spotify.com/v1/audio-analysis/" + window.songId;
		console.log(url);

		$.ajax({
			method: "GET",
			url: url,
			headers: {
				'Authorization': 'Bearer ' + token,
			},

			success: function(data){
				window.bpm = data.track.tempo;
				//$('.bpm').html("The bpm is: " + window.bpm);
			},
		});
	}
}
