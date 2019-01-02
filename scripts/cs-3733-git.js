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

clientSide.commit({
	sha1: "2b1cf78",
	message: "added error page"
});

clientSide.commit({
	sha1: "f06eeaa",
	message: "added weekly schedule view"
});

master.commit({
	sha1: "fb13d1c",
	message: "added license"
});

master.merge(clientSide, {
	sha1: "20d780d"
});

clientSide.commit({
	sha1: "871ac75c",
	message: "added styling and started JS"
});

clientSide.merge(master, {
	sha1: "89e5400",
	author: "Andrew Levy"
});

featureAWS.commit({
	sha1: "5bfe1a4",
	message: "Delete LambdaFunctionHandler.java",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "0a3e518",
	message: "Add files via upload",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "3d5faa4",
	message: "Add files via upload",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "7588844",
	message: "Delete ScheduleDAO.java",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "d3f602c",
	message: "Add files via upload",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "283fb76",
	message: "Update CreateScheduleHandler.java",
	author: "Matthew Hagan"
});

featureAWS.merge(master, {
	sha1: "f89ef48"
});

clientSide.commit({
	sha1: "5b16b3f",
	message: "added easter egg and more scripts"
});

clientSide.commit({
	sha1: "661bc77",
	message: "added more scripts and style"
});

featureAWS.commit({
	sha1: "c18da56",
	message: "staging",
	author: "Matthew Hagan"
});

featureAWS.commit({
	sha1: "d0f8d62",
	message: "Created Schedule, TimeSlot Entity and DAO classes",
	author: "Justin Cheng"
});

clientSide.commit({
	sha1: "47e6a8e",
	message: "further styling"
});


featureAWS.merge(master, {
	sha1: "0ef3683",
	author: "Justin Cheng"
});

clientSide.merge(featureAWS, {
	sha1: "86581c8",
});


featureAWS.commit({
	sha1: "6fc9510",
	message: "Fixed TimeSlot & DAO, Schedule timeslots under construction",
	author: "Justin Cheng"
});
