# TBH_MoltyScriptPack
[Русская Версия Readme](README_RU.md)


A collection of custom JavaScript automation and utility scripts designed to speed up rigging, animation layout, and cleanup workflows in **Toon Boom Harmony**.
---

## 🚀 Included Scripts & Usage Guide

### 1. `Molty_Backdrop.js` — Auto Backdrops
* **What it does:** Automatically creates and sizes a custom backdrop around selected nodes, dynamically naming it after the source peg or group.
* **How to use (What to select):** 
  1. Select one or more nodes (Pegs, Groups, or Reads) in your Node View.
  2. Run the script. A grey backdrop will be generated around them with the proper name.

### 2. `Molty_BG_Group_cleanV2.js` — Background Cleanup & Master Setup
* **What it does:** Streamlines background setup (import psd) by generating a `BG_Master-P` PEG, organizing layers, duplicating drawings with `-bg` suffixes, and purging unexposed cels.
* **How to use (What to select):**
  1. Select the background drawing nodes (`READ`) or groups (`GROUP`) in your Node View.
  2. Run the script to automatically build the hierarchy and clean unused frames.

### 3. `Molty_Curve_to_zero.js` — Reset Curve Modules
* **What it does:** Recursively traverses selected nodes or groups, finds `CurveModule` nodes, and resets their resting orientations and lengths to `0`.
* **How to use (What to select):**
  1. Select root groups or specific curve nodes.
  2. Run the script to instantly zero out target parameters.

### 4. `Molty_rename_CompPeg.js` — Smart Node Renaming
* **What it does:** Intelligently renames selected Pegs, Composites, and Groups based on connected drawing layers or hierarchy naming conventions.
* **How to use (What to select):**
  1. Select the drawing nodes, composites, pegs, or groups you want to rename.
  2. Run the script—it detects whether drawings are present and applies standard naming for other nodes (`C-`, `-P`, `Def-`).

### 5. `Molty_xPivot_to_zero.js` — Center X-Pivot
* **What it does:** Aligns the X-axis pivot point to `0` while maintaining the current Y-axis pivot for selected Pegs and Read nodes.
* **How to use (What to select):**
  1. Select one or multiple `PEG` or `READ` nodes.
  2. Run the script to center their X pivots.

### 6. `Molty composite AP rename.js` — AutoPatch Composite Renaming
* **What it does:** Automatically renames Composite nodes prefixed with `AP-` and colors them red, mapping them to source drawing names.
* **How to use (What to select):**
  1. Select the target `COMPOSITE` nodes linked to AutoPatch networks.
  2. Run the script to rename and color code them automatically.

### 7. `Molty Layers script.js` — Layer Structure Generator
* **What it does:** A comprehensive UI tool to quickly add and organize standard Harmony structure layers (`OL`, `LA`, `CA`, `UL`, `AP`, AutoPatch groups, and Texture cutter setups).
* **How to use (What to select):**
  1. Select a `READ` (drawing) node.
  2. Run the script to open the UI panel, click the desired layer combination buttons (e.g., `OL-LA-CA-UL` or `LA-AP-CA`), and generate the structure.

### 8. `Molty Line Thickness script.js` — Scale-Independent Line Thickness Control
* **What it does:** Advanced UI control to manage scale-independent line thickness scaling with support for different resolution presets (FHD/4K) and base sizes.
* **How to use (What to select):**
  1. Select the character's `READ` nodes.
  2. Open the script dialog, configure native line thickness and resolution ratios, and apply.

### 9. `Molty_all_subs.js` — Sequence Timings on Timeline
* **What it does:** Automatically collects all drawing timings from a selected Read node, sorts them naturally, and sequences them onto the timeline starting from a chosen frame.
* **How to use (What to select):**
  1. Select a `READ` (drawing) node that contains multiple drawings.
  2. Run the script, enter the starting frame number in the prompt dialog, and click **Apply**.

---

## 🛠️ Requirements
- Toon Boom Harmony (Harmony Premium / Advanced recommended, tested with JS scripting API).

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
