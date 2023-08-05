# PIAIC TypeScript Assignment

### Assignment # 1 of 45 from [Advanced TypeScript Projects](https://github.com/panaverse/typescript-node-projects/blob/main/getting-started-exercises.md)

### Assignment:

- Install [Node.js](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/download) and [VS Code](https://code.visualstudio.com/) on your computer.

#

#

# Installing Prerequisites

## Required Files

[NodeJS](https://nodejs.org/en)  
[VS Code](https://code.visualstudio.com)  
TypeScript

### Procedure for Windows

1. Install NodeJS LTS Version from https://nodejs.org/en with default settings
2. Install VS Code from https://code.visualstudio.com
3. Open Powershell / Command Prompt
4. run command below to check if node is installed correctly on your system:
   ```
   node -v
   ```
5. Output will look something like:

   ```
   v18.7.0
   ```

   If you are running node or any script on PowerShell for the first time, you might encounter this error

   ```
   ps1 cannot be loaded because running scripts is disabled on this system.
   ```

   To solve this error, open PowerShell as administrator and run this command:

   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
   ```

6. If everything is all set, let's install TypeScript.
   Open PowerShell / Command Prompt and run:
   ```
   npm install -g typescript
   ```

## Initializing a Project

1. Create a folder in which you will create your typescript file.
2. Open that folder in Windows Explorer.
3. On the Navigation Panel, click on File and then click on open in PowerShell / Command Prompt. This will open the current folder in your selected terminal.
4. type

   ```
   npm init -y
   ```

   to create a package.json file. Then type

   ```
   tsc --init
   ```

   to config the project with TypeScript.

5. Then open that folder in VS Code manually or by right-clicking in the folder and select the option "Open with Code".
6. Create a file: index.ts, you can replace index with any filename you want but the extension must be '.ts'
7. Type statements in index.ts file, if you already know TypeScript or just type:

   ```javascript
   console.log("Hello World");
   ```

   This statement is used to display anything in console. You don't need to know anything more about this right now.

8. Now, to run 'index.ts' file in console. We first need to convert it into JavaScript script as TypeScript cannot run directly on console. To do this, write in terminal:
   ```
   tsc index.ts
   ```
   This command will generate index.js file in the same folder.
9. Run the index.js file by running
   ```
   node index.js
   ```
10. And boom!! You succeeded in writing your first TypeScript program. Every time you want to initialize a TypeScript project, you need to repeat these steps.
