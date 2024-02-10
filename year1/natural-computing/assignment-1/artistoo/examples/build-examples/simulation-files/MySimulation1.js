/* globals CPM */

const { CPM } = require("../../html/artistoo");

/* 	================= DESCRIPTION ===================== */
/* This text is printed on the HTML page. */
/** @file
 **/

/* ================= DECLARE CUSTOM METHODS ===================== */

/* START METHODS OBJECT Do not remove this line */
/* 	The following functions are defined below and will be added to
	the simulation object.*/
let custommethods = {
  initializeGrid: initializeGrid,
  buildObject: buildObject,
  drawBelow: drawBelow,
};

/* END METHODS OBJECT Do not remove this line */

/* ================= WRITE CUSTOM METHODS ===================== */

/* START METHODS DEFINITION Do not remove this line */

/* The following custom methods will be added to the simulation object
below. */

function drawBelow() {
  this.Cim.drawPixelSet(this.object);
}

function initializeGrid() {
  // add the initializer if not already there
  if (!this.helpClasses["gm"]) {
    this.addGridManipulator();
  }

  let nrcells = this.conf["NRCELLS"],
    cellkind,
    i;
  this.buildObject();

  // Seed the right number of cells for each cellkind
  for (cellkind = 0; cellkind < nrcells.length; cellkind++) {
    for (i = 0; i < nrcells[cellkind]; i++) {
      // first cell always at the midpoint. Any other cells
      // randomly.
      if (i == 0) {
        this.gm.seedCellAt(cellkind + 1, this.C.midpoint);
      } else {
        this.gm.seedCell(cellkind + 1);
      }
    }
  }
}

function buildObject() {
  let gridHeight = this.C.extents[1];
  let gridWidth = this.C.extents[0];

  this.object = this.gm.makeCircle([gridHeight / 2, gridWidth / 2], 50);
  this.gm.assignCellPixels(this.object, 2);
  this.C.add(
    new CPM.BorderConstraint({
      BARRIER_VOXELS: this.object,
    })
  );
}

/* END METHODS DEFINITION Do not remove this line */

/* ================= CONFIGURATION ===================== */

/* Do not remove this line: START CONFIGURATION */
/*	----------------------------------
	CONFIGURATION SETTINGS
	----------------------------------
*/
let config = {
  // Grid settings
  ndim: 2,
  field_size: [250, 250],

  // CPM parameters and configuration
  conf: {
    // Basic CPM parameters
    torus: [true, true], // Should the grid have linked borders?
    seed: 1, // Seed for random number generation.
    T: 20, // CPM temperature

    // Constraint parameters.
    // Mostly these have the format of an array in which each element specifies the
    // parameter value for one of the cellkinds on the grid.
    // First value is always cellkind 0 (the background) and is often not used.

    // Adhesion parameters:
    J: [
      [0, 20, 0],
      [20, 0, 0],
      [0, 0, 0],
    ],

    // VolumeConstraint parameters
    LAMBDA_V: [0, 50, 50], // VolumeConstraint importance per cellkind
    V: [0, 200, 0], // Target volume of each cellkind

    // PerimeterConstraint parameters
    LAMBDA_P: [0, 2, 0], // PerimeterConstraint importance per cellkind
    P: [0, 180, 0], // Target perimeter of each cellkind

    // ActivityConstraint parameters
    LAMBDA_ACT: [0, 200, 0], // ActivityConstraint importance per cellkind
    MAX_ACT: [0, 20, 0], // Activity memory duration per cellkind
    ACT_MEAN: "geometric", // Is neighborhood activity computed as a
    // "geometric" or "arithmetic" mean?
  },

  // Simulation setup and configuration: this controls stuff like grid initialization,
  // runtime, and what the output should look like.
  simsettings: {
    // Cells on the grid
    NRCELLS: [0, 0, 0], // Number of cells to seed for all
    // non-background cellkinds.
    // Runtime etc
    BURNIN: 50,
    RUNTIME: 1000,
    RUNTIME_BROWSER: "Inf",

    // Visualization
    CANVASCOLOR: "eaecef",
    CELLCOLOR: ["000000"],
    ACTCOLOR: [true], // Should pixel activity values be displayed?
    SHOWBORDERS: [false], // Should cellborders be displayed?
    zoom: 2, // zoom in on canvas with this factor.

    // Output images
    SAVEIMG: true, // Should a png image of the grid be saved
    // during the simulation?
    IMGFRAMERATE: 1, // If so, do this every <IMGFRAMERATE> MCS.
    SAVEPATH: "output/img/MySimulation3", // ... And save the image in this folder.
    EXPNAME: "MySimulation3", // Used for the filename of output images.

    // Output stats etc
    STATSOUT: { browser: false, node: true }, // Should stats be computed?
    LOGRATE: 10, // Output stats every <LOGRATE> MCS.
  },
};
/*	---------------------------------- */
/* Do not remove this line: END CONFIGURATION */
