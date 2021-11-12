/**
 * "Bang" Google Chrome Extension.
 * 
 * I have changed this to suit my use-cases
 * 
 */
commands = {
	"!a": {
		"name": "Amazon",
		"target": "https://www.amazon.co.uk",
	},
	"!w": {
		"name": "Wikipedia",
		"target": "https://en.wikipedia.org",
	},
	"!gh": {
		"name": "Github",
		"target": "https://github.com",
	},
	"!so": {
		"name": "StackOverflow",
		"target": "https://stackoverflow.com",
	},
	"!tw": {
		"name": "Twitter",
		"target": "https://twitter.com",
	},
	"!li": {
		"name": "LinkedIn",
		"target": "https://www.linkedin.com",
	},
	"!yt": {
		"name": "Youtube",
		"target": "https://www.youtube.com",
	},
	"!aws": {
		"name": "Amazon Web Services",
		"target": "https://aws.amazon.com"
	}
};

/**
 * Check if the request was a google search request, and if it is, return it's search params
 * @param {*} url Full URL String of the Google Search
 */
const parseGoogleURL = url => {

	// check if the hostname is google
	if (!url.includes('google.')) {
		return null;
	}

	// Get Google search query
	try {
		const q = url.split('q=')[1].split('&')[0];
		if (q.startsWith('!')) {
			return q;
		}
	} catch (e) {}

	return null;
};

const bang = url => {
	debugger;
	// parse the google search query (if it even is a google search)
	const qRes = parseGoogleURL(url);

	// if the request is a google search request and the query started with a ! symbol
	if (qRes !== null && qRes[0] === "!") {
		var target = commands[qRes].target;
		chrome.tabs.update({ url: target });
	}
};

// Create a listener for all navigation changes
chrome.webNavigation.onCommitted.addListener(_ => {
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
		// call bang function with the domain
		if (tabs[0] && tabs[0].url) {
			bang(tabs[0].url);
		}
	});
});
