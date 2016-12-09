# Configuration
## Electron plugin - v1.0 - by Armaldio<img src='PluginIcon.ico' alt='Icon'>
Property | Value
--- | ---
Description | Run your game with the best performances inside Electron
Category | General
Cordova-plugins | No
Flags | No
Help | https://github.com/C2Electron/c2-plugin
Id | armaldio_electron
Rotatable | No
Type | object

# Actions
#### There are 45 actions available
**Rename file** : Rename an existing file. *#File system*

* **Existing file** : Enter the existing file path to be renamed.
* **New name** : Enter the new file path to rename to.

---

**Create folder** : Create a new folder on disk. *#File system*

* **Path** : Enter the folder path to create.

---

**Append file** : Add some text to the end of a file. *#File system*

* **Path** : Enter the file path to append to.
* **Contents** : Enter the text content to append to the file.

---

**Append file sync** : Add some text synchronously to the end of a file. *#File system*

* **Path** : Enter the file path to append to.
* **Contents** : Enter the text content to append to the file.

---

**List files** : Load a list of files in a given folder. Use expressions after this action to get the count and file names. *#File system*

* **Path** : Enter the folder path to list files from.

---

**Show open dialog** : Open a dialog to chose a file *#Dialog*

* **Title** : The title of the window
* **Default path** : The preselected path
* **Confirmation text (optional)** : The text of the Confirm button
* **Filters (TODO)** : You can filter by filetype
* **Properties** : openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles (comma separated)

---

**Show save dialog** : Show a save file dialog. *#File dialogs*

* **Title** : The title of the window
* **Default path** : The preselected path
* **Button label** : Custom label for the confirmation button, when left empty the default label will be used.
* **Filters (TODO)** : You can filter by filetype

---

**Copy file** : Make an identical copy of a file. *#File system*

* **Path** : Enter the file path to copy.
* **Destination** : Enter the file path to copy to.

---

**Move file** : Copy a file then delete the original. *#File system*

* **Path** : Enter the file path to move.
* **Destination** : Enter the file path to move to.

---

**Run file** : Run a file, such as executing another program. *#File system*

* **Path** : Enter the path of the file to execute. This can also include space-separated arguments. To execute a path with spaces in it, wrap in double-quotes (e.g. """C:\Program Files\file.exe""").
* **Parameters** : A semicolon separated list of arguments to pas to the file

---

**Set Position** : Set the position of the window on the screen. *#Window*

* **X** : The X co-ordinate to move the window to on the screen.
* **Y** : The Y co-ordinate to move the window to on the screen.
* **Animated** : Wether the change is animated or not (MacOS) (default value : Yes)
  * Yes
  * No

---

**Set Size** : Set the size of the window. *#Window*

* **Width** : The new width of the window.
* **Height** : The new height of the window.
* **Animated** : Wether the change is animated or not (MacOS) (default value : Yes)
  * Yes
  * No

---

**Set title** : Set the text appearing in the window title bar. *#Window*

* **Title** : A string to display in the window title bar.

---

**Minimize** : Minimize the window. *#Window*


---

**Maximize** : Maximize the window. *#Window*


---

**Unmaximize** : Unmaximize the window (i.e. the reverse of maximizing). *#Window*


---

**Restore** : Restore the window (i.e. show again after minimizing). *#Window*


---

**Request attention** : Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS). *#Window*

* **Mode** : Whether to request attention or cancel a previous request for attention.
  * Request attention
  * Stop requesting attention

---

**Set maximum size** : Set the maximum size of the window. *#Window*

* **Max width** : The maximum window width to set, in pixels.
* **Max height** : The maximum window height to set, in pixels.

---

**Set minimum size** : Set the minimum size of the window. *#Window*

* **Min width** : The minimum window width to set, in pixels.
* **Min height** : The minimum window height to set, in pixels.

---

**Set resizable** : Enable or disable resize controls on the window. *#Window*

* **Mode** : Whether to enable or disable resizing on the window.
  * not resizable
  * resizable

---

**Set always on top** : Enable or disable the window always being on top of other windows. *#Window*

* **Mode** : Whether to enable or disable the window always being on top.
  * not always on top
  * always on top

---

**Show dev tools** : Display the web developer tools e.g. for Javascript debugging or inspecting console messages. *#Window*


---

**Set clipboard text** : Copy some text to the clipboard. *#Clipboard*

* **Text** : Enter the text to copy to the clipboard.

---

**Clear clipboard** : Clear the clipboard so nothing is copied. *#Clipboard*


---

**Open browser** : Open the default browser to a given URL. *#File system*

* **URL** : The web address to open in a browser.

---

**Exit** : Close electron windows *#App*


---

**Restart** : Restart electron windows *#App*


---

**Focus** : focuses on the application’s first window *#App*


---

**Hide** : Hide app window *#App*


---

**Show** : Show app window *#App*


---

**Maximize** : Maximize window *#App*


---

**Set Fullscreen** : Toggle fullscreen *#App*

* **State** : Fullscreen state (default value : Set fullscreen)
  * Fullscreen
  * Not fullscreen

---

**Write asynchronous** : Write data to a specific file asynchronously *#Write*

* **Tag** : A unique tag to keep track of the result
* **Path** : The path of the file to write
* **Data** : The data to write

---

**Read file** : Read a file asynchronously *#Read*

* **Tag** : A unique tag to keep track of the result
* **Path** : The file to read
* **Encoding** : The encoding of the file (default value : utf8)

---

**Read synchronously a file** : Read a file synchronously *#Read*

* **Path** : The path of the file to read

---

**Rename file** : Rename a file asynchronously *#Rename*

* **Tag** : A unique tag to keep track of the result
* **Name** : The new name of the file
* **Path** : The path of the file to rename

---

**Rename synchronously a file** : Rename a file synchronously *#Rename*

* **Name** : The new name of the file
* **Path** : The path of the file to rename

---

**Delete synchronously a file** : Delete a file synchronously *#Delete*

* **Path** : The path of the file to read

---

**Create synchronously a file** : Create a file synchronously *#Create*

* **Path** : The path of the file to read

---

**Write synchronous** : Write data to a specific file synchronously *#Write*

* **Path** : The path of the file to write
* **Data** : The data to write
* **Encoding** : The encoding of the file (default value : utf8)
* **Overwrite** : Overwrite the file if it already exists (default value : No)
  * No
  * Yes

---

**Move file** : Move a file asynchronously *#Move*

* **Tag** : A unique tag to keep track of the result
* **Name** : The new path of the file
* **Path** : The path of the file to move

---

**Move synchronously a file** : Move a file synchronously *#Move*

* **Name** : The new path of the file
* **Path** : The path of the file to move

---

**Copy file** : Copy a file asynchronously *#Copy*

* **Tag** : A unique tag to keep track of the result
* **Name** : The new path of the file
* **Path** : The path of the file to copy

---

**Copy synchronously a file** : Copy a file synchronously *#Copy*

* **Name** : The new path of the file
* **Path** : The path of the file to copy

---

# Conditions
#### There are 14 conditions available
**Path exists** : Test if a file exists on disk. *#File system*

* **Path** : Enter a file path to test if exists.

---

**On file dropped** : Triggered when the user drag-and-drops a file in to the window. *#File system*


---

**On open dialog OK** : Triggered after a file chosen from an open dialog. *#File dialogs*


---

**On open dialog Error** : Triggered after an error whilechoosing file from an open dialog. *#File dialogs*


---

**On save dialog OK** : Triggered after a file chosen from a save dialog. *#File dialogs*


---

**On save dialog Error** : Triggered after an error whilechoosing file from a save dialog. *#File dialogs*


---

**On save success** : Trigger when a specific save action succeed *#Save*

* **Tag** : The unique tag

---

**On save fail** : Trigger when a specific save action fail to save *#Save*

* **Tag** : The unique tag

---

**On read success** : Trigger when a specific read action succeed *#Read*

* **Tag** : The unique tag

---

**On read fail** : Trigger when a specific read action fail to read *#Read*

* **Tag** : The unique tag

---

**Is Electron** : Test if the game is running on electron *#Tests*


---

**For each file/folder** : Repeat the event for each file/folder in path. *#For Each*

* **Path** : Path to loop through (default value : "")
* **Files/Folders** : Wether to include files, folders or both in the loop
  * Folders
  * Files
  * Files/Folders
* **Recursive** : Wether the query is recursive or not (TODO)
  * No
  * Yes

---

**For each dropped file** : Repeat the event for each dropped file. *#Drop*


---

**For each opened file/folder** : Repeat the event for each opened file/folder. *#Modal*


---

# Expressions
#### There are 39 expressions available
**AppFolder** : Return the application's folder. Note it may not have write permission. *#File system*


---

**UserFolder** : Return the current user's folder. *#File system*


---

**ReadFile** : Return the text content of a file on disk. *#File system*

* **Path** : The file path to load.

---

**FileSize** : Return the size of a file on disk, in bytes. *#File system*

* **Path** : The file path to get the size of.

---

**ListCount** : Return the number of files after 'List files'. *#File system*


---

**ListAt** : Return the filename at an index after 'List files'. *#File system*

* **Index** : Zero-based index of file to retrieve.

---

**DroppedFileName** : Return the filename of a file dropped in to the window. *#File system*


---

**DroppedFileSize** : Return the size of a file dropped in to the window. *#File system*


---

**DroppedFilePath** : Return the full path of a file dropped in to the window. *#File system*


---

**ChosenPath** : Return the chosen path after a file dialog. *#File dialogs*


---

**WindowX** : The X position of the window on the screen. *#Window*


---

**WindowY** : The Y position of the window on the screen. *#Window*


---

**WindowWidth** : The width of the UI window in the operating system. *#Window*


---

**WindowHeight** : The height of the UI window in the operating system. *#Window*


---

**WindowTitle** : The current window title bar text. *#Window*


---

**ClipboardText** : The current text copied to the clipboard, if any. *#Clipboard*


---

**GetAppPath** : Returns the current application directory. *#App*


---

**GetLocale** : Get locale based on the system *#App*


---

**GetOSArch** : Returns a string identifying the operating system CPU architecture *#OS*


---

**GetOSHomedir** : Returns the home directory of the current user *#OS*


---

**GetOSHostname** : Returns the hostname of the operating system *#OS*


---

**GetOSPlatform** : Returns the operating system platform *#OS*


---

**GetAppDataPath** : %APPDATA% (Win), $XDG_CONFIG_HOME or ~/.config (linux), ~/Library/Application (Mac) *#Path*


---

**GetUserDataPath** : By default it is the appData directory appended with your app’s name *#Path*


---

**GetExePath** : The current executable file *#Path*


---

**GetDesktopPath** : The current user’s Desktop directory *#Path*


---

**GetDocumentsPath** : User’s document directory *#Path*


---

**GetDownloadsPath** : User’s download directory *#Path*


---

**GetMusicPath** : User’s music directory *#Path*


---

**GetPicturesPath** : User’s picture directory *#Path*


---

**GetVideoPath** : User’s video directory *#Path*


---

**GetTempPath** : Temporary folder path *#Path*


---

**LastReadSync** : Get the last data synced readed *#Read*


---

**LastReadAsync** : Get the last data asynced readed *#Read*


---

**Exists** : Check if file/folder exists *#Files*


---

**CurrentFileFolder** : The current file/folder in the loop *#Files*


---

**FileFolderCount** : The number of files/folders/both inside a folder *#Files*

* **Folder** : The path to the folder

---

**FileSize** : The size of a file *#Files*

* **File** : The path to the file

---

**CurrentOpenedFileFolder** : The current file/folder opened by the 'open' dialog *#Files*


---


