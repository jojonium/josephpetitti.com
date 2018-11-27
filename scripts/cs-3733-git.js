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

var clientSide = groupProject.branch("client-side");

clientSide.commit({
	sha1: "b4081ae",
	message: "added HTML stubs"
});

var featureAWS = groupProject.branch("feature-AWS");

featureAWS.commit({
	sha1: "2d35cf7",
	message: "Stubbed LambdaFunctionHandler class",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "18f2f66",
	message: "LambdaFunctionHandler updated with basic functionality",
	author: "Matthew Hagan"
});

gapi.commit({
	sha1: "c8855d4",
	message: "updated based on grade"
});

gapi.merge(master, {
	sha1: "a172002"
});

clientSide.commit({
	sha1: "bde0272",
	message: "added html index and weekly schedule page",
	author: "Andrew Levy"
});

clientSide.commit({
	sha1: "2aa5f62",
	message: "created index page"
});
