function GetPluginSettings() {
	return {
		"name"       : "Electron",
		"id"         : "armaldio_electron",
		"version"    : "1.0",
		"description": "Run your game with the best performances inside Electron",
		"author"     : "Armaldio",
		"help url"   : "https://github.com/C2Electron/c2-plugin",
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

/**
 * NW.js
 */

AddStringParam("Path", "Enter a file path to test if exists.");
AddCondition(6, cf_none, "Path exists", "File system", "Path <i>{0}</i> exists", "Test if a file exists on disk.", "PathExists");

AddCondition(7, cf_trigger, "On file dropped", "File system", "On file dropped", "Triggered when the user drag-and-drops a file in to the window.", "OnFileDrop");

AddCondition(8, cf_trigger, "On open dialog OK", "File dialogs", "On open dialog OK", "Triggered after a file chosen from an open dialog.", "OnOpenDialogSuccess");
AddCondition(9, cf_trigger, "On open dialog Error", "File dialogs", "On open dialog Error", "Triggered after an error whilechoosing file from an open dialog.", "OnOpenDialogFail");

AddCondition(10, cf_trigger, "On save dialog OK", "File dialogs", "On save dialog OK", "Triggered after a file chosen from a save dialog.", "OnSaveDialogSuccess");
AddCondition(11, cf_trigger, "On save dialog Error", "File dialogs", "On save dialog Error", "Triggered after an error whilechoosing file from a save dialog.", "OnSaveDialogFail");

/**
 * Custom
 */

AddStringParam("Tag", "The unique tag", "");
AddCondition(0, cf_trigger, "On save success", "Save", "On save {0} success", "Trigger when a specific save action succeed", "OnSaveSuccess");

AddStringParam("Tag", "The unique tag", "");
AddCondition(1, cf_trigger, "On save fail", "Save", "On save {0} fail", "Trigger when a specific save action fail to save", "OnSaveFail");

AddStringParam("Tag", "The unique tag", "");
AddCondition(3, cf_trigger, "On read success", "Read", "On read {0} success", "Trigger when a specific read action succeed", "OnReadSuccess");

AddStringParam("Tag", "The unique tag", "");
AddCondition(4, cf_trigger, "On read fail", "Read", "On read {0} fail", "Trigger when a specific read action fail to read", "OnReadFail");

AddCondition(2, cf_none, "Is Electron", "Tests", "If the platform is Electron", "Test if the game is running on electron", "IsElectron");

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


AddCondition(11, cf_looping | cf_not_invertible, "For each dropped file", "Drop", "For each dropped file", "Repeat the event for each dropped file.", "ForEachDroppedFile");
AddCondition(12, cf_looping | cf_not_invertible, "For each opened file/folder", "Modal", "For each opened file/folder", "Repeat the event for each opened file/folder.", "ForEachOpenedFileFolder");
////////////////////////////////////////
// Actions

/**
 * NW.js
 */

AddStringParam("Existing file", "Enter the existing file path to be renamed.");
AddStringParam("New name", "Enter the new file path to rename to.");
AddAction(15, af_none, "Rename file", "File system", "Rename <i>{0}</i> to <i>{1}</i>", "Rename an existing file.", "RenameFile");

AddStringParam("Path", "Enter the folder path to create.");
AddAction(17, af_none, "Create folder", "File system", "Create folder <i>{0}</i>", "Create a new folder on disk.", "CreateFolder");

AddStringParam("Path", "Enter the file path to append to.", "");
AddStringParam("Contents", "Enter the text content to append to the file.");
AddAction(18, af_none, "Append file", "File system", "Append <b>{1}</b> to file <i>{0}</i>", "Add some text to the end of a file.", "AppendFile");

AddStringParam("Path", "Enter the file path to append to.", "");
AddStringParam("Contents", "Enter the text content to append to the file.");
AddAction(44, af_none, "Append file sync", "File system", "Append <b>{1}</b> to file <i>{0}</i> synchronously", "Add some text synchronously to the end of a file.", "AppendFileSync");

AddStringParam("Path", "Enter the folder path to list files from.");
AddAction(19, af_none, "List files", "File system", "List files from <i>{0}</i>", "Load a list of files in a given folder. Use expressions after this action to get the count and file names.", "ListFiles");

AddStringParam("Title", "The title of the window", "");
AddStringParam("Default path", "The preselected path", "");
AddStringParam("Confirmation text (optional)", "The text of the Confirm button", "");
AddStringParam("Filters (TODO)", "You can filter by filetype", "");
AddStringParam("Properties", "openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles (comma separated)", "");
AddAction(6, cf_none, "Show open dialog", "Dialog", "Open a dialog to chose a file", "Open a dialog to chose a file", "ShowOpenDialog");

AddStringParam("Title", "The title of the window", "");
AddStringParam("Default path", "The preselected path", "");
AddStringParam("Button label", "Custom label for the confirmation button, when left empty the default label will be used.", "");
AddStringParam("Filters (TODO)", "You can filter by filetype", "");
AddAction(22, af_none, "Show save dialog", "File dialogs", "Show save dialog (accept <i>{0}</i>)", "Show a save file dialog.", "ShowSaveDialog");

AddStringParam("Path", "Enter the file path to copy.");
AddStringParam("Destination", "Enter the file path to copy to.");
AddAction(23, af_none, "Copy file", "File system", "Copy <i>{0}</i> to <i>{1}</i>", "Make an identical copy of a file.", "CopyFile");

AddStringParam("Path", "Enter the file path to move.");
AddStringParam("Destination", "Enter the file path to move to.");
AddAction(24, af_none, "Move file", "File system", "Move <i>{0}</i> to <i>{1}</i>", "Copy a file then delete the original.", "MoveFile");


AddStringParam("Path", "Enter the path of the file to execute. This can also include space-separated arguments. To execute a path with spaces in it, wrap in double-quotes (e.g. \"\"\"C:\\Program Files\\file.exe\"\"\").");
AddStringParam("Parameters", "A semicolon separated list of arguments to pas to the file");
AddAction(25, af_none, "Run file", "File system", "Run <i>{0}</i> <b>{1}</b>", "Run a file, such as executing another program.", "RunFile");

AddNumberParam("X", "The X co-ordinate to move the window to on the screen.");
AddNumberParam("Y", "The Y co-ordinate to move the window to on the screen.");
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Animated", "Wether the change is animated or not (MacOS)", "Yes");
AddAction(27, af_none, "Set Position", "Window", "Set window position to <i>{0</i>;<i>{1}</i>", "Set the position of the window on the screen.", "SetWindowPosition");

AddNumberParam("Width", "The new width of the window.");
AddNumberParam("Height", "The new height of the window.");
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Animated", "Wether the change is animated or not (MacOS)", "Yes");
AddAction(29, af_none, "Set Size", "Window", "Set window size to <i>{0}</i>;<i>{1}</i>", "Set the size of the window.", "SetWindowSize");

AddStringParam("Title", "A string to display in the window title bar.");
AddAction(30, af_none, "Set title", "Window", "Set window title to <i>{0}</i>", "Set the text appearing in the window title bar.", "SetWindowTitle");

AddAction(31, af_none, "Minimize", "Window", "Minimize window", "Minimize the window.", "WindowMinimize");
AddAction(32, af_none, "Maximize", "Window", "Maximize window", "Maximize the window.", "WindowMaximize");
AddAction(33, af_none, "Unmaximize", "Window", "Unmaximize window", "Unmaximize the window (i.e. the reverse of maximizing).", "WindowUnmaximize");
AddAction(34, af_none, "Restore", "Window", "Restore window", "Restore the window (i.e. show again after minimizing).", "WindowRestore");

AddComboParamOption("Request attention");
AddComboParamOption("Stop requesting attention");
AddComboParam("Mode", "Whether to request attention or cancel a previous request for attention.");
AddAction(35, af_none, "Request attention", "Window", "Window: {0}", "Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS).", "WindowRequestAttention");

AddNumberParam("Max width", "The maximum window width to set, in pixels.");
AddNumberParam("Max height", "The maximum window height to set, in pixels.");
AddAction(36, af_none, "Set maximum size", "Window", "Set window maximum size to <i>{0}</i> x <i>{1}</i>", "Set the maximum size of the window.", "WindowSetMaxSize");

AddNumberParam("Min width", "The minimum window width to set, in pixels.");
AddNumberParam("Min height", "The minimum window height to set, in pixels.");
AddAction(37, af_none, "Set minimum size", "Window", "Set window minimum size to <i>{0}</i> x <i>{1}</i>", "Set the minimum size of the window.", "WindowSetMinSize");

AddComboParamOption("not resizable");
AddComboParamOption("resizable");
AddComboParam("Mode", "Whether to enable or disable resizing on the window.");
AddAction(38, af_none, "Set resizable", "Window", "Set window {0}", "Enable or disable resize controls on the window.", "WindowSetResizable");

/**
 * TODO https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetalwaysontopflag-level
 AddComboParamOption("");
 AddComboParamOption("");
 AddComboParam("Mode", "Whether to enable or disable the window always being on top.");
 */
AddComboParamOption("not always on top");
AddComboParamOption("always on top");
AddComboParam("Mode", "Whether to enable or disable the window always being on top.");
AddAction(39, af_none, "Set always on top", "Window", "Set window {0}", "Enable or disable the window always being on top of other windows.", "WindowSetAlwaysOnTop");

AddAction(40, af_none, "Show dev tools", "Window", "Show dev tools", "Display the web developer tools e.g. for Javascript debugging or inspecting console messages.", "ShowDevTools");

AddStringParam("Text", "Enter the text to copy to the clipboard.");
AddAction(41, af_none, "Set clipboard text", "Clipboard", "Set clipboard text to <i>{0}</i>", "Copy some text to the clipboard.", "SetClipboardText");

AddAction(42, af_none, "Clear clipboard", "Clipboard", "Clear clipboard", "Clear the clipboard so nothing is copied.", "ClearClipboard");

AddStringParam("URL", "The web address to open in a browser.");
AddAction(43, af_none, "Open browser", "File system", "Open browser to URL <i>{0}</i>", "Open the default browser to a given URL.", "OpenBrowser");


/**
 * Custom
 */
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

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Name", "The new name of the file", "");
AddStringParam("Path", "The path of the file to rename", "");
AddAction(14, cf_none, "Rename file", "Rename", "Rename {1} to {0}", "Rename a file asynchronously", "Rename");

AddStringParam("Name", "The new name of the file", "");
AddStringParam("Path", "The path of the file to rename", "");
AddAction(15, cf_none, "Rename synchronously a file", "Rename", "Rename {0} to {1}", "Rename a file synchronously", "RenameSync");

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

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Name", "The new path of the file", "");
AddStringParam("Path", "The path of the file to move", "");
AddAction(16, cf_none, "Move file", "Move", "Move {1} to {0}", "Move a file asynchronously", "Move");

AddStringParam("Name", "The new path of the file", "");
AddStringParam("Path", "The path of the file to move", "");
AddAction(17, cf_none, "Move synchronously a file", "Move", "Move {0} to {1}", "Move a file synchronously", "MoveSync");

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Name", "The new path of the file", "");
AddStringParam("Path", "The path of the file to copy", "");
AddAction(18, cf_none, "Copy file", "Copy", "Copy {1} to {0}", "Copy a file asynchronously", "Copy");

AddStringParam("Name", "The new path of the file", "");
AddStringParam("Path", "The path of the file to copy", "");
AddAction(19, cf_none, "Copy synchronously a file", "Copy", "Copy {0} to {1}", "Copy a file synchronously", "CopySync");

////////////////////////////////////////
// Expressions

/**
 * NW.js
 */

AddExpression(23, ef_return_string, "", "File system", "AppFolder", "Return the application's folder. Note it may not have write permission.");
AddExpression(24, ef_return_string, "", "File system", "UserFolder", "Return the current user's folder.");

AddStringParam("Path", "The file path to load.");
AddExpression(25, ef_return_string, "", "File system", "ReadFile", "Return the text content of a file on disk.");

AddStringParam("Path", "The file path to get the size of.");
AddExpression(26, ef_return_number, "", "File system", "FileSize", "Return the size of a file on disk, in bytes.");

AddExpression(27, ef_return_number, "", "File system", "ListCount", "Return the number of files after 'List files'.");

AddNumberParam("Index", "Zero-based index of file to retrieve.");
AddExpression(28, ef_return_string, "", "File system", "ListAt", "Return the filename at an index after 'List files'.");

AddExpression(29, ef_return_string, "", "File system", "DroppedFileName", "Return the filename of a file dropped in to the window.");
AddExpression(37, ef_return_string, "", "File system", "DroppedFileSize", "Return the size of a file dropped in to the window.");
AddExpression(38, ef_return_string, "", "File system", "DroppedFilePath", "Return the full path of a file dropped in to the window.");

AddExpression(30, ef_return_string, "", "File dialogs", "ChosenPath", "Return the chosen path after a file dialog.");

AddExpression(31, ef_return_number, "", "Window", "WindowX", "The X position of the window on the screen.");
AddExpression(32, ef_return_number, "", "Window", "WindowY", "The Y position of the window on the screen.");
AddExpression(33, ef_return_number, "", "Window", "WindowWidth", "The width of the UI window in the operating system.");
AddExpression(34, ef_return_number, "", "Window", "WindowHeight", "The height of the UI window in the operating system.");
AddExpression(35, ef_return_string, "", "Window", "WindowTitle", "The current window title bar text.");

AddExpression(36, ef_return_string, "", "Clipboard", "ClipboardText", "The current text copied to the clipboard, if any.");

/**
 * Custom
 */

AddExpression(0, ef_return_any, "Get app path", "App", "GetAppPath", "Returns the current application directory.");

AddExpression(2, ef_return_any, "Get Locale", "App", "GetLocale", "Get locale based on the system");

AddExpression(3, ef_return_any, "Get OS arch", "OS", "GetOSArch", "Returns a string identifying the operating system CPU architecture");
AddExpression(4, ef_return_any, "Get OS homedir", "OS", "GetOSHomedir", "Returns the home directory of the current user");
AddExpression(5, ef_return_any, "Get OS hostname", "OS", "GetOSHostname", "Returns the hostname of the operating system");
AddExpression(6, ef_return_any, "Get platform", "OS", "GetOSPlatform", "Returns the operating system platform");

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

AddExpression(19, ef_return_any, "Last read sync data", "Read", "LastReadSync", "Get the last data synced readed");
AddExpression(20, ef_return_any, "Last read async data", "Read", "LastReadAsync", "Get the last data asynced readed");
AddExpression(21, ef_return_any, "File exists", "Files", "Exists", "Check if file/folder exists");
AddExpression(22, ef_return_any, "The current file/folder in the loop", "Files", "CurrentFileFolder", "The current file/folder in the loop");

AddNumberParam("Folder", "The path to the folder");
AddExpression(37, ef_return_any, "The number of files/folders/both inside a folder", "Files", "FileFolderCount", "The number of files/folders/both inside a folder");

AddNumberParam("File", "The path to the file");
AddExpression(38, ef_return_any, "The size of a file", "Files", "FileSize", "The size of a file");
AddExpression(39, ef_return_any, "The current file/folder opened by the 'open' dialog", "Files", "CurrentOpenedFileFolder", "The current file/folder opened by the 'open' dialog");

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

function CreateIDEObjectType() {
	return new IDEObjectType();
}

function IDEObjectType() {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function (instance) {
	return new IDEInstance(instance);
};

function IDEInstance(instance, type) {
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	this.instance = instance;
	this.type     = type;

	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

IDEInstance.prototype.OnInserted = function () {
};

IDEInstance.prototype.OnDoubleClicked = function () {
};

IDEInstance.prototype.OnPropertyChanged = function (property_name) {
};

IDEInstance.prototype.OnRendererInit = function (renderer) {
};

IDEInstance.prototype.Draw = function (renderer) {
};

IDEInstance.prototype.OnRendererReleased = function (renderer) {
};
