var groupProject = new GitGraph({
	template: "metro",
	reverseArrow: false,
	orientation: "vertical",
	author: "Joseph Petitti"
});

var master = groupProject.branch("master");
master.commit({
	sha1: "fc084fe",
	message: "initial commit"
});

master.commit({
	sha1: "f816117",
	message: "Updated README"
});

var gapi = groupProject.branch("G.API");
gapi.commit({
	sha1: "c08c2b9",
	message: "added G.API"
});

gapi.commit({
	sha1: "31f3177",
	message: "updated README"
});

gapi.merge(master, {sha1: "f2208ee"});

gapi.commit({
	sha1: "bdbb432",
	message: "made edits with advice from TA"
});

gapi.commit({
	sha1: "843e4df",
	message: "changed status code"
});

gapi.merge(master, {sha1: "a479d1e"});

var workspaceSetup = groupProject.branch("workspace-setup");

workspaceSetup.commit({
	sha1: "2ce9b72",
	message: "Set up eclipse project"
});

workspaceSetup.merge(master, {
	sha1: "448b08b",
	author: "Justin Cheng"
});
