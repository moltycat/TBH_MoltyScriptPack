function Molty_all_subs() {
    scene.beginUndoRedoAccum("Molty_all_subs");

    var exeDialog = new private_exeDialog();
    exeDialog.main();

    scene.endUndoRedoAccum();
}

// Natural sorting comparison function (1, 2, 3... 10, 20)
function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 ? parseInt($1, 10) : null, $2 || ""]); });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 ? parseInt($1, 10) : null, $2 || ""]); });

    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();

        if (an[0] !== null && bn[0] !== null) {
            if (an[0] !== bn[0]) return an[0] - bn[0];
        } else if (an[0] !== null) {
            return -1;
        } else if (bn[0] !== null) {
            return 1;
        } else {
            if (an[1] !== bn[1]) return an[1].localeCompare(bn[1]);
        }
    }
    return ax.length - bx.length;
}

function private_exeDialog() {
    this.main = function() {
        var selectedNodes = selection.selectedNodes(0);

        if (selectedNodes.length === 0) {
            MessageBox.warning("Please select at least one Read (Drawing) node.", 1, 0, 0);
            return;
        }

        var dialog = new QDialog();
        dialog.setWindowTitle("Molty All Subs");

        var layout = new QVBoxLayout(dialog);

        var label = new QLabel("Enter start frame number:", dialog);
        layout.addWidget(label, 0, 0);

        var spinBox = new QSpinBox(dialog);
        spinBox.setRange(1, 999999);
        spinBox.setValue(frame.current());
        layout.addWidget(spinBox, 0, 0);

        var btnOk = new QPushButton("Apply", dialog);
        layout.addWidget(btnOk, 0, 0);
        btnOk.clicked.connect(dialog, dialog.accept);

        if (dialog.exec() !== 1) {
            return;
        }

        var startFrame = typeof spinBox.value === "function" ? spinBox.value() : spinBox.value;

        for (var i = 0; i < selectedNodes.length; ++i) {
            var sNode = selectedNodes[i];

            if (node.type(sNode) === "READ") {
                var colName = node.linkedColumn(sNode, "DRAWING.ELEMENT");
                if (!colName) continue;

                var drawings = column.getDrawingTimings(colName);
                if (!drawings || drawings.length === 0) continue;

                // Sort drawings naturally before placing them on the timeline
                drawings.sort(naturalCompare);

                for (var d = 0; d < drawings.length; ++d) {
                    var targetFrame = startFrame + d;
                    var drwName = drawings[d];

                    column.setEntry(colName, 1, targetFrame, drwName);
                }
            }
        }
    };
}