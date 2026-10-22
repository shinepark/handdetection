# Hand Detection Game

A simple game that uses hand/finger detection through your webcam. Move your **index fingertip** onto the white circle to collect it. The circle jumps to a new spot and your score goes up by one.

Built with [p5.js](https://p5js.org/) and [ml5.js](https://ml5js.org/) (handpose).

## Requirements

- A working webcam
- Google Chrome (recommended)
- [Python](https://www.python.org/downloads/) (any recent version), used only to run a local web server

## How to run

Browsers block webcam access on pages opened straight from disk, so the game has to be served from a local web server.

1. Open PowerShell in the repo folder:
   ```powershell
   cd path\to\handdetection
   ```
2. Start the server:
   ```powershell
   python -m http.server 8000
   ```
   Leave this window open while you play.
3. Open this address in Chrome and allow camera access when asked:
   ```
   http://localhost:8000/ml5_handpose/
   ```

To stop the server, press `Ctrl+C` in the PowerShell window.

## How to play

- Your hand appears as colored dots, with a line along your index finger.
- Touch the white circle with your index fingertip to score.
- The score is printed in the browser console (press `F12`, then open the Console tab).
- The webcam preview is small and mirrored.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Blank page | Press `F12` and check the Console for errors. |
| `NotFoundError: Requested device not found` | Chrome can't find a camera. Check that the Windows Camera app works, and that no other app is using the webcam. |
| Page worked before but breaks now | The sketch uses the old ml5 0.x API. `ml5_handpose/index.html` must load `ml5@0.12.2`, not `ml5@latest`. |
| `localhost refused to connect` | The server isn't running. Start it again with `python -m http.server 8000` from the repo folder. |
| `python3` not found on Windows | Use `python` instead of `python3`. |

## Project structure

- `ml5_handpose/` is the game (`index.html`, `sketch.js`, `style.css`)
- `Play_with_APIs/` contains earlier experiments with hand detection, facemesh, and other APIs
- `ml5_PoseNet_2022_02_17_21_27_02/` is an older PoseNet experiment
