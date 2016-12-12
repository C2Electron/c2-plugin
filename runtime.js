"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var runningElectron         = false;
var lastReadedSyncData      = "";
var lastReadedAsyncData     = "";
var currentFileFolder       = "";
var droppedFiles            = [];
var currectDroppedFile      = "";
var currentOpenedFileFolder = "";
var filesFolders            = [];
var chosenpath              = "";
var currentArg              = "";

/////////////////////////////////////
// Plugin class
cr.plugins_.armaldio_electron = function (runtime) {
	this.runtime = runtime;
};

function isElectron() {
	if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
		return true;
	}
	if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
		return true;
	}
	return false;
}

if (isElectron()) {

//https://github.com/jprichardson/node-fs-extra
	var fs            = require('fs-extra'),
		jQuery        = require("jquery"),
		electron      = require('electron'),
		process       = require('process'),
		epath         = require("path"),
		os            = require('os'),
		child         = require('child_process').execFile,

		shell         = electron.shell,
		app           = electron.app,
		remote        = electron.remote,
		dialog        = remote.dialog,
		remoteapp     = remote.app,
		browserWindow = remote.getCurrentWindow(),
		clipboard     = electron.clipboard;

	runningElectron = true;
	var args        = require('electron').remote.getGlobal('args');
}

var $ = jQuery;

(function () {
		var pluginProto = cr.plugins_.armaldio_electron.prototype;

		/////////////////////////////////////
		// Object type class
		pluginProto.Type = function (plugin) {
			this.plugin  = plugin;
			this.runtime = plugin.runtime;
		};

		var typeProto = pluginProto.Type.prototype;

		// called on startup for each object type
		typeProto.onCreate = function () {

		};

		/////////////////////////////////////
		// Instance class
		pluginProto.Instance = function (type) {
			this.type    = type;
			this.runtime = type.runtime;
		};

		var instanceProto = pluginProto.Instance.prototype;

		// called whenever an instance is created
		instanceProto.onCreate = function () {
			var self = this;
			document.addEventListener('drop', function (e) {

				e.preventDefault();
				e.stopPropagation();
				droppedFiles = e.dataTransfer.files;
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnFileDrop, self);

				/*
				 for (let f of e.dataTransfer.files) {
				 console.log('File(s) you dragged here: ', f.path)
				 }
				 */
				return false;
			});

			document.addEventListener('dragover', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnDragOver, self);
			});

			document.addEventListener('dragenter', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnDragEnter, self);
			});

			document.addEventListener('dragleave', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnDragLeave, self);
			});
		};

		instanceProto.saveToJSON = function () {
			return this.dictionary;
		};

		instanceProto.loadFromJSON = function (o) {
			this.dictionary = o;

			// Update the key count
			this.key_count = 0;

			for (var p in this.dictionary) {
				if (this.dictionary.hasOwnProperty(p))
					this.key_count++;
			}
		};

		/**BEGIN-PREVIEWONLY**/
		instanceProto.getDebuggerValues = function (propsections) {
			var props = [];

			for (var p in this.dictionary) {
				if (this.dictionary.hasOwnProperty(p)) {
					props.push({
						"name" : p,
						"value": this.dictionary[p]
					});
				}
			}

			propsections.push({
				"title"     : "Electron",
				"properties": props
			});
		};

		instanceProto.onDebugValueEdited = function (header, name, value) {
			this.dictionary[name] = value;
		};
		/**END-PREVIEWONLY**/

		//////////////////////////////////////
		// Conditions
		function Cnds() {
		};

		/**
		 * @return {boolean}
		 */
		Cnds.prototype.OnWriteSuccess = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.OnWriteFail = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.OnOpenDialogSuccess = function () {
			return true;
		};

		Cnds.prototype.OnSaveDialogSuccess = function () {
			return true;
		};

		Cnds.prototype.OnOpenDialogFail = function () {
			return true;
		};

		Cnds.prototype.OnSaveDialogFail = function () {
			return true;
		};

		Cnds.prototype.OnReadSuccess = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.OnReadFail = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.IsElectron = function () {
			return runningElectron;
		};

		Cnds.prototype.OnFileDrop = function () {
			return true;
		};

		Cnds.prototype.OnDragOver = function () {
			return true;
		};

		Cnds.prototype.OnDragEnter = function () {
			return true;
		};

		Cnds.prototype.OnDragLeave = function () {
			return true;
		};

		//TODO recursive

		function walkSync(currentDirPath, callback) {
			var fs   = require('fs'),
				path = require('path');
			fs.readdirSync(currentDirPath).forEach(function (name) {
				var filePath = path.join(currentDirPath, name);
				var stat     = fs.statSync(filePath);
				if (stat.isFile()) {
					callback(filePath, stat);
				} else if (stat.isDirectory()) {
					walkSync(filePath, callback);
				}
			});
		}

		Cnds.prototype.ForEachFileFolder = function (path, type, recursive) {
			var current_event = this.runtime.getCurrentEventStack().current_event;

			var files = fs.readdirSync(path, 'utf8');
			$.each(files, function (index, value) {
				currentFileFolder = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.ForEachDroppedFile = function () {
			var current_event = this.runtime.getCurrentEventStack().current_event;

			$.each(droppedFiles, function (index, value) {
				currectDroppedFile = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.ForEachSelectedFileFolder = function () {
			var current_event = this.runtime.getCurrentEventStack().current_event;

			$.each(filesFolders, function (index, value) {
				currentSelectedFileFolder = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.ForEachArgument = function () {
			var current_event = this.runtime.getCurrentEventStack().current_event;

			$.each(args, function (index, value) {
				currentArg = value;
				current_event.retrigger();
			})
		};


		pluginProto.cnds = new Cnds();

		//////////////////////////////////////
		// Actions
		function Acts() {
		};

		Acts.prototype.Write = function (tag, path, data, encoding) {
			var self = this;
			self.tag = tag;
			fs.writeFile(path, data, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnWriteFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnWriteSuccess, self);
			});
		};

		function ValidFilePath(path) {
			return true
		}

		Acts.prototype.WriteSync = function (path, data, encoding, overwrite) {
			console.log(data);
			console.log(overwrite);
			if (ValidFilePath(path)) {
				if (overwrite) {
					try {
						if (encoding === "base64")
							data = data.replace("data:image/png;base64,", "");
						fs.writeFileSync(path, data, {'encoding': encoding});
						console.log("Wrote success");
					} catch (err) {
						console.log("Error : ", err);
					}
				}
				else {
					console.log("Cannot overwrite file");
				}
			}

		};

		Acts.prototype.AppendFile = function (tag, path, data) {
			var self = this;
			self.tag = tag;
			fs.appendFile(path, data, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnAppendFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnAppendSuccess, self);
			});
		};

		Acts.prototype.AppendFileSync = function (path, data) {
			try {
				fs.appendFileSync(path, data);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.Rename = function (tag, path, newname) {
			var self = this;
			self.tag = tag;
			fs.rename(path, epath.join(epath.dirname(path), newname), function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnRenameFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnRenameSuccess, self);
			});
		};

		Acts.prototype.RenameSync = function (tag, path, newname) {
			try {
				fs.rename(path, epath.join(epath.dirname(path), newname));
				//self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadSuccess, self);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.Move = function (tag, path, newpath) {
			var self = this;
			self.tag = tag;
			fs.rename(path, newpath, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnMoveFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnMoveSuccess, self);
			});
		};

		Acts.prototype.MoveSync = function (tag, path, newpath) {
			try {
				fs.renameSync(path, newpath);
				//self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnMoveSuccess, self);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.Copy = function (tag, path, newpath) {
			var self = this;
			self.tag = tag;
			fs.copy(path, newpath, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnCopyFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnCopySuccess, self);
			});
		};

		Acts.prototype.CopySync = function (tag, path, newpath) {
			try {
				fs.copy(path, newpath);
				//self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnCopySuccess, self);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

//TOOD add encoding
		Acts.prototype.Read = function (tag, path, encoding) {
			var self = this;
			self.tag = tag;
			fs.readFile(path, encoding, function (err, data) {
				if (err) {
					lastReadedAsyncData = err.toString();
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadFail, self);
				}
				lastReadedAsyncData = data;
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadSuccess, self);
			});
		};

		Acts.prototype.DeleteSync = function (path) {
			try {
				fs.unlinkSync(path);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.CreateSync = function (path) {
			try {
				if (!fs.existsSync(path)) {
					fs.mkdirSync(path);
				}
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.ShowOpenDialog = function (title, default_path, button_label, filters, properties) {
			var self = this;
			dialog.showOpenDialog({
				title      : title,
				defaultPath: default_path,
				buttonLabel: button_label,
				//filters:filters,
				properties : properties.split(",")
			}, function (files) {
				console.log(files);
				if (files.length > 0) {
					filesFolders = files;
					if (files.length === 1) {
						chosenpath = files[0];
					}
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnOpenDialogSuccess, self);
				}
				else {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnOpenDialogFail, self);
				}
			});
		};

		Acts.prototype.ShowSaveDialog = function (title, default_path, button_label, filters) {
			dialog.showSaveDialog({
				title      : title,
				defaultPath: default_path,
				buttonLabel: button_label,
				//filters: filters
			}, function (filepath) {
				if (filepath)
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnSaveDialogSuccess, self);
				else
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnSaveDialogSuccess, self);
			});
		};

		Acts.prototype.RunFile = function (path, args) {
			var parameters = args.split(";");

			child(path, parameters, function (err, data) {
				console.log(err);
				console.log(data.toString());
			});
		};

		Acts.prototype.SetClipboardText = function (text, type) {
			clipboard.writeText(text, type);
		};

		Acts.prototype.ClearClipboard = function (type) {
			clipboard.clear(type);
		};

		Acts.prototype.OpenBrowser = function (url) {
			shell.openExternal(url); //[, options, callback])
		};

		Acts.prototype.Exit = function () {
			browserWindow.close();
		};

		Acts.prototype.Restart = function () {
			browserWindow.reload();
		};

		Acts.prototype.Focus = function () {
			browserWindow.focus();
		};

		Acts.prototype.Show = function () {
			browserWindow.show();
		};

		Acts.prototype.Hide = function () {
			browserWindow.hide();
		};

		Acts.prototype.Minimize = function () {
			browserWindow.minimize();
		};

		Acts.prototype.Maximize = function () {
			browserWindow.maximize();
		};

		Acts.prototype.Unmaximize = function () {
			browserWindow.unmaximize();
		};

		Acts.prototype.Restore = function () {
			browserWindow.restore();
		};

		Acts.prototype.Fullscreen = function (b) {
			browserWindow.setFullScreen((b == 0));
		};

		Acts.prototype.SetWindowPosition = function (x, y, animate) {
			browserWindow.setPosition(x, y, animate == 0);
		};

		Acts.prototype.SetWindowSize = function (width, heigth, animate) {
			browserWindow.setSize(width, heigth, animate == 0);
		};

		Acts.prototype.SetWindowTitle = function (title) {
			browserWindow.setTitle(title);
		};

		Acts.prototype.WindowSetResizable = function (resizable) {
			browserWindow.setResizable(resizable == 0);
		};

		Acts.prototype.WindowSetMaxSize = function (width, height) {
			browserWindow.setMinimumSize(width, height);
		};

		Acts.prototype.WindowSetMinSize = function (width, height) {
			browserWindow.setMaximumSize(width, height);
		};

		Acts.prototype.WindowSetAlwaysOnTop = function (top) {
			browserWindow.setAlwaysOnTop(top == 0);
		};

		Acts.prototype.WindowRequestAttention = function (flash) {
			browserWindow.flashFrame(flash == 0);
		};


		pluginProto.acts = new Acts();

//////////////////////////////////////
// Expressions
// ret.set_float, ret.set_string, ret.set_any
		function Exps() {
		};

		/**
		 * NW.js
		 */
		Exps.prototype.AppFolder = function (ret) {
			ret.set_string(__dirname);
		};

		Exps.prototype.UserFolder = function (ret) {
			ret.set_string(remoteapp.getPath("home"));
		};

		Exps.prototype.ReadFile = function (ret, path, encoding) {
			try {
				lastReadedSyncData = fs.readFileSync(path, "utf8");
				ret.set_any(lastReadedSyncData);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

//------------------------------------------------------------------------------------------------------------------
		Exps.prototype.FileSize = function (ret, path_) {
			var size = 0;

			try {
				var stat = fs["statSync"](path_);
				if (stat)
					size = stat["size"] || 0;
			}
			catch (e) {
			}

			ret.set_int(size);
		};

//------------------------------------------------------------------------------------------------------------------
		Exps.prototype.ListCount = function (ret) {
			ret.set_int(filelist.length);
		};

//------------------------------------------------------------------------------------------------------------------
		Exps.prototype.ListAt = function (ret, index) {
			index = Math.floor(index);

			if (index < 0 || index >= filelist.length)
				ret.set_string("");
			else
				ret.set_string(filelist[index]);
		};

		Exps.prototype.DroppedFileName = function (ret) {
			ret.set_string(currectDroppedFile.name);
		};

		Exps.prototype.DroppedFileSize = function (ret) {
			ret.set_string(currectDroppedFile.size);
		};

		Exps.prototype.DroppedFilePath = function (ret) {
			ret.set_string(currectDroppedFile.path);
		};

		Exps.prototype.ChosenPath = function (ret) {
			ret.set_string(chosenpath);
		};

		Exps.prototype.WindowX = function (ret) {
			ret.set_int(browserWindow.getBounds().x);
		};

		Exps.prototype.WindowY = function (ret) {
			ret.set_int(browserWindow.getBounds().y);
		};

		Exps.prototype.WindowWidth = function (ret) {
			ret.set_int(browserWindow.getBounds().width);
		};

		Exps.prototype.WindowHeight = function (ret) {
			ret.set_int(browserWindow.getBounds().height);
		};

		Exps.prototype.WindowTitle = function (ret) {
			ret.set_string(browserWindow.getTitle());
		};

		Exps.prototype.ClipboardText = function (ret) {
			ret.set_string(clipboard.readText());
		};

		/**
		 * Custom
		 */

		Exps.prototype.GetAppPath = function (ret) {
			ret.set_string(remoteapp.getAppPath());
		};

		Exps.prototype.GetLocale = function (ret) {
			ret.set_string(remoteapp.getLocale());
		};

		Exps.prototype.GetOSArch = function (ret) {
			ret.set_string(os.arch());
		};

		Exps.prototype.GetOSHomedir = function (ret) {
			ret.set_string(os.homedir());
		};

		Exps.prototype.GetOSHostname = function (ret) {
			ret.set_string(os.hostname());
		};

		Exps.prototype.GetOSPlatform = function (ret) {
			ret.set_string(os.platform());
		};

		Exps.prototype.GetAppDataPath = function (ret) {
			ret.set_string(remoteapp.getPath("appData"));
		};

		Exps.prototype.GetUserDataPath = function (ret) {
			ret.set_string(remoteapp.getPath("userData"));
		};

		Exps.prototype.GetExePath = function (ret) {
			ret.set_string(remoteapp.getPath("exe"));
		};

		Exps.prototype.GetDesktopPath = function (ret) {
			ret.set_string(remoteapp.getPath("desktop"));
		};

		Exps.prototype.GetDocumentsPath = function (ret) {
			ret.set_string(remoteapp.getPath("documents"));
		};

		Exps.prototype.GetDownloadsPath = function (ret) {
			ret.set_string(remoteapp.getPath("downloads"));
		};

		Exps.prototype.GetMusicPath = function (ret) {
			ret.set_string(remoteapp.getPath("music"));
		};

		Exps.prototype.GetPicturesPath = function (ret) {
			ret.set_string(remoteapp.getPath("pictures"));
		};

		Exps.prototype.GetVideoPath = function (ret) {
			ret.set_string(remoteapp.getPath("videos"));
		};

		Exps.prototype.GetTempPath = function (ret) {
			ret.set_string(remoteapp.getPath("temp"));
		};

		Exps.prototype.LastReadAsync = function (ret) {
			ret.set_any(lastReadedAsyncData);
		};

		Exps.prototype.CurrentFileFolder = function (ret) {
			ret.set_any(currentFileFolder);
		};

		Exps.prototype.CurrentOpenedFileFolder = function (ret) {
			ret.set_any(currentOpenedFileFolder);
		};

		function getFilesizeInBytes(filename) {
			var stats = fs.statSync(filename);
			return stats["size"];
		}

		Exps.prototype.FileSize = function (ret, path) {
			ret.set_any(getFilesizeInBytes(path));
		};

		//TODO
		Exps.prototype.FileFolderCount = function (ret, path) {
			var items = fs.readdirSync(path, 'utf8');
			ret.set_any(items.length);
		};

		Exps.prototype.Exists = function (ret, path) {
			try {
				var access = fs.accessSync(path, fs.F_OK);
				console.log("Access : ", access);
				ret.set_int(access);
			} catch (e) {
				ret.set_int(0);
			}
		};

		Exps.prototype.CurrentArg = function (ret) {
			ret.set_any(currentArg);
		};

		pluginProto.exps = new Exps();

	}()
);