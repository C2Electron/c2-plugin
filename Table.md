# Configuration
## Electron plugin - v1.0 - by Armaldio<img src='PluginIcon.ico' alt='Icon'>
Property | Value
--- | ---
Description | Run your game with the best performances inside Electron
Category | General
Cordova-plugins | No
Flags | No
Help | https://github.com/armaldio/c2-electron-plugin
Id | armaldio_electron
Rotatable | No
Type | object

# Actions
#### There are 14 actions available
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

**Show open dialog** : Open a dialog to chose a file *#Dialog*

* **Title** : The title of the window
* **Fefault path** : The preselected path
* **Confirmation text (optional)** : The text of the Confirm button
* **Filters (TODO)** : You can filter by filetype
* **Properties** : openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles (comma separated)

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

# Conditions
#### There are 6 conditions available
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

**Is Electron** : Test if the game is running on electron *#Test*

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

# Expressions
#### There are 22 expressions available
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

**GetHomePath** : User’s home directory *#Path*

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

**GetAppPathFolder** : Current App folder path *#Path*

---

**LastReadSync** : Get the last data synced readed *#Read*

---

**LastReadAsync** : Get the last data asynced readed *#Read*

---

**Exists** : Check if file/folder exixts *#Files*

---

**CurrentFileFolder** : The current file/folder in the loop *#Files*

---


