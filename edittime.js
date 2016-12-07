function GetPluginSettings() {
	return {
		"name"       : "Electron",
		"id"         : "armaldio_electron",
		"version"    : "1.0",
		"description": "Run your game with the best performances inside Electron",
		"author"     : "Armaldio",
		"help url"   : "https://github.com/armaldio/c2-electron-plugin",
		"category"   : "General",
		"type"       : "object",
		"rotatable"  : false,
		"flags"      : 0 |
		pf_singleglobal
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

AddStringParam("Tag", "The unique tag", "");
AddCondition(0, cf_trigger, "On save success", "Save", "On save {0} success", "Trigger when a specific save action succeed", "OnSaveSuccess");

AddStringParam("Tag", "The unique tag", "");
AddCondition(1, cf_trigger, "On save fail", "Save", "On save {0} fail", "Trigger when a specific save action fail to save", "OnSaveFail");

AddStringParam("Tag", "The unique tag", "");
AddCondition(3, cf_trigger, "On read success", "Read", "On read {0} success", "Trigger when a specific read action succeed", "OnReadSuccess");

AddStringParam("Tag", "The unique tag", "");
AddCondition(4, cf_trigger, "On read fail", "Read", "On read {0} fail", "Trigger when a specific read action fail to read", "OnReadFail");

AddCondition(2, cf_none, "Is Electron", "Test", "If the platform is Electron", "Test if the game is running on electron", "IsElectron");

AddStringParam("Path", "Path to loop through", '""');
AddComboParamOption("Folders");
AddComboParamOption("Files");
AddComboParamOption("Files/Folders");
AddComboParam("Files/Folders", "Wether to include files, folders or both in the loop");
AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Recursive", "Wether the query is recursive or not (TODO)");
AddCondition(5, cf_looping | cf_not_invertible, "For each file/folder", "For Each",
	"For each <i>{1}</i> in <i>{0}</i> (recursively = {2})", "Repeat the event for each file/folder in path.", "ForEachFileFolder");
////////////////////////////////////////
// Actions

AddAction(1, cf_none, "Exit", "App", "Close electron windows", "Close electron windows", "Exit");
AddAction(2, cf_none, "Restart", "App", "Restart electron windows", "Restart electron windows", "Restart");
AddAction(3, cf_none, "Focus", "App", "Focuses on the application’s first window", "focuses on the application’s first window", "Focus");
AddAction(4, cf_none, "Hide", "App", "Hide app window", "Hide app window", "Hide");
AddAction(5, cf_none, "Show", "App", "Show app window", "Show app window", "Show");
AddAction(7, cf_none, "Maximize", "App", "Maximize window", "Maximize window", "Maximize");

AddComboParamOption("Fullscreen");
AddComboParamOption("Not fullscreen");
AddComboParam("State", "Fullscreen state", "Set fullscreen"); // a dropdown list parameter
AddAction(8, cf_none, "Set Fullscreen", "App", "Set {0}", "Toggle fullscreen", "Fullscreen");

AddStringParam("Title", "The title of the window", "");
AddStringParam("Fefault path", "The preselected path", "");
AddStringParam("Confirmation text (optional)", "The text of the Confirm button", "");
AddStringParam("Filters (TODO)", "You can filter by filetype", "");
AddStringParam("Properties", "openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles (comma separated)", "");
AddAction(6, cf_none, "Show open dialog", "Dialog", "Open a dialog to chose a file", "Open a dialog to chose a file", "ShowOpenDialog");

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Path", "The path of the file to write", "");
AddStringParam("Data", "The data to write", "");
AddAction(0, cf_none, "Write asynchronous", "Write", "Write {2} to {1} ({0})", "Write data to a specific file asynchronously", "Write");

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Path", "The file to read", "");
AddStringParam("Encoding", "The encoding of the file", "utf8");
AddAction(9, cf_none, "Read file", "Read", "Read {1} ({0})", "Read a file asynchronously", "Read");

AddStringParam("Path", "The path of the file to read", "");
AddAction(10, cf_none, "Read synchronously a file", "Read", "Read {0}", "Read a file synchronously", "ReadSync");

AddStringParam("Path", "The path of the file to read", "");
AddAction(11, cf_none, "Delete synchronously a file", "Delete", "Delete {0}", "Delete a file synchronously", "DeleteSync");

AddStringParam("Path", "The path of the file to read", "");
AddAction(12, cf_none, "Create synchronously a file", "Create", "Create {0}", "Create a file synchronously", "CreateSync");

AddStringParam("Path", "The path of the file to write", "");
AddStringParam("Data", "The data to write", "");
AddStringParam("Encoding", "The encoding of the file", "utf8");
AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Overwrite", "Overwrite the file if it already exists", "No");
AddAction(13, cf_none, "Write synchronous", "Write", "Write {1} to {0} ({2})", "Write data to a specific file synchronously", "WriteSync");


////////////////////////////////////////
// Expressions

AddExpression(0, ef_return_any, "Get app path", "App", "GetAppPath", "Returns the current application directory.");

AddExpression(2, ef_return_any, "Get Locale", "App", "GetLocale", "Get locale based on the system");

AddExpression(3, ef_return_any, "Get OS arch", "OS", "GetOSArch", "Returns a string identifying the operating system CPU architecture");
AddExpression(4, ef_return_any, "Get OS homedir", "OS", "GetOSHomedir", "Returns the home directory of the current user");
AddExpression(5, ef_return_any, "Get OS hostname", "OS", "GetOSHostname", "Returns the hostname of the operating system");
AddExpression(6, ef_return_any, "Get platform", "OS", "GetOSPlatform", "Returns the operating system platform");

AddExpression(7, ef_return_any, "Get user's home path", "Path", "GetHomePath", "User’s home directory");
AddExpression(8, ef_return_any, "Get appdata path", "Path", "GetAppDataPath", "%APPDATA% (Win), $XDG_CONFIG_HOME or ~/.config (linux), ~/Library/Application (Mac)");
AddExpression(9, ef_return_any, "Get user data path", "Path", "GetUserDataPath", "By default it is the appData directory appended with your app’s name");
AddExpression(10, ef_return_any, "Get current executable file path", "Path", "GetExePath", "The current executable file");
AddExpression(11, ef_return_any, "Get desktop path", "Path", "GetDesktopPath", "The current user’s Desktop directory");
AddExpression(12, ef_return_any, "Get documents path", "Path", "GetDocumentsPath", "User’s document directory");
AddExpression(13, ef_return_any, "Get downloads path", "Path", "GetDownloadsPath", "User’s download directory");
AddExpression(14, ef_return_any, "Get music path", "Path", "GetMusicPath", "User’s music directory");
AddExpression(15, ef_return_any, "Get pictures path", "Path", "GetPicturesPath", "User’s picture directory");
AddExpression(16, ef_return_any, "Get videos path", "Path", "GetVideoPath", "User’s video directory");
AddExpression(17, ef_return_any, "Get temp path", "Path", "GetTempPath", "Temporary folder path");
AddExpression(18, ef_return_any, "Get app path", "Path", "GetAppPathFolder", "Current App folder path");

AddExpression(19, ef_return_any, "Last read sync data", "Read", "LastReadSync", "Get the last data synced readed");
AddExpression(20, ef_return_any, "Last read async data", "Read", "LastReadAsync", "Get the last data asynced readed");
AddExpression(21, ef_return_any, "File exists", "Files", "Exists", "Check if file/folder exixts");
AddExpression(22, ef_return_any, "The current file/folder in the loop", "Files", "CurrentFileFolder", "The current file/folder in the loop");
////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	// Save the constructor parameters
	this.instance = instance;
	this.type     = type;

	// Set the default property values from the property table
	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function (renderer) {
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function (renderer) {
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function (renderer) {
}
