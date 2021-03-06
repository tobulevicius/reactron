const TWCSSFile = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const regularCSS = `body, html {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	height: 100vh;
	width: 100vw;
}

.red {
  color: red;
}

.container {
	height: 100vh;
	width: 100vh;

	display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
  gap: 1rem;
}

.container h1 {
	font-size: 1em;
}`;

export const TWConfigFile = `module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}`;

export const ElectronMainFile = `const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : \`file://\${path.join(__dirname, '../build/index.html')}\`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});`;

export const HTML = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Reactor ❤</title>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
	</body>
</html>	
`;

export const CSSFile = (tailwind) => {
	if(tailwind) return TWCSSFile;
	if(!tailwind) return regularCSS;
}

export const ReactFile = (tailwind) =>{ return `import ReactDOM from 'react-dom';
import './renderer/css/index.css';

ReactDOM.render(
  <div className='${tailwind ? 'w-screen h-screen flex flex-col items-center justify-center gap-2' : 'container'}'>
    <h1>Thanks for using create-reactron-app 👍</h1>

    <h1>Replace this element with a 'main' container within ./renderer/containers/</h1>

    <h1>Created with <span className='${tailwind ? 'text-red-500' : 'red'}'>&lt;3</span> by <a href='https://emilis.co.uk'>Emilis Tobulevicius</a></h1>
  </div>,
	document.getElementById('root')
);`
}