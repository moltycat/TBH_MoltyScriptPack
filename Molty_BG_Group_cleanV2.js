
function Molty_BG_Group_cleanV2(){	
	
	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("Molty_BG_Group_cleanV2");

	exeDialog.main();
	  
	scene.endUndoRedoAccum("Molty_BG_Group_cleanV2");
	MessageBox.information("Готово!");
	
  }

function private_exeDialog(){
 
	this.main = function(){


	var selectionNodes = selection.selectedNodes(0);
	
		sNode = selectionNodes[0];
		var x = node.coordX(sNode);
		var y = node.coordY(sNode);
		var z = node.coordZ(sNode);
		var MasterPEG = node.add(node.parentNode(sNode),"BG_Master-P","PEG",x,y-160,z);		
		
		for (var i = 0; i < selectionNodes.length; ++i){
			sNode = selectionNodes[i];
			if (node.type(sNode) == "READ") {
				readMaster(sNode,MasterPEG);
			}
			if (node.type(sNode) == "GROUP") {
				groupMaster(sNode,MasterPEG);
			}
			if (node.type(sNode) == "COMPOSITE") {
				node.rename(sNode,"C-BG_Master");
			}

		}
		
		if (selectionNodes.length <= 1) {node.deleteNode(MasterPEG,false,false);}



	}
}

function GroupClean(Gnode){

	var selectionNodes = node.subNodes(Gnode);
	var GinputModule = node.getGroupInputModule(Gnode, "", 0,0,0);
	var Ginx = node.coordX(GinputModule);
	var Giny = node.coordY(GinputModule);
	var Ginz = node.coordZ(GinputModule);
	var MasterPEG = node.add(Gnode,node.getName(Gnode)+"_master-P","PEG",Ginx,Giny+160,Ginz);
	node.link(GinputModule,0,MasterPEG,0,false,false);
	
	for (var i = 0; i < selectionNodes.length; ++i){
			sNode = selectionNodes[i];
			if (node.type(sNode) == "READ") {
				readMaster(sNode,MasterPEG);
			}
			if (node.type(sNode) == "GROUP") {
				groupMaster(sNode,MasterPEG);
			}
			if (node.type(sNode) == "COMPOSITE") {
				node.rename(sNode,"C-"+ node.getName(Gnode));
			}

	}
	node.deleteNode(MasterPEG,false,false);

}

function cleanUnexposedCels(readNode) {
        var useTiming = node.getAttr(readNode, 1, "drawing.elementMode").boolValue();
		var drawColumn = node.linkedColumn(readNode, useTiming ? "drawing.element" : "drawing.customName.timing");
		if (!drawColumn) return;

        var firstFrame = 1;
        var lastFrame = frame.numberOf();
        var exposedCels = [];

        // Собираем используемые кадры
        for (var curFrame = firstFrame; curFrame <= lastFrame; curFrame++) {
            var curCelName = column.getEntry(drawColumn, 1, curFrame);
            if (curCelName !== "" && exposedCels.indexOf(curCelName) === -1) {
                exposedCels.push(curCelName);
            }
        }

        // Удаляем неиспользованные
        var lastCel = column.getEntry(drawColumn, 1, lastFrame);
        var allCels = column.getDrawingTimings(drawColumn);
        for (var i = 0; i < allCels.length; i++) {
            if (exposedCels.indexOf(allCels[i]) === -1) {
                column.setEntry(drawColumn, 1, lastFrame, allCels[i]);
                column.deleteDrawingAt(drawColumn, lastFrame);
            }
        }
        column.setEntry(drawColumn, 1, lastFrame, lastCel);
}

function duplicateDrawing(readNode,x,y,z) {
    // Собираем данные о связях
    var parentGroup = node.parentNode(readNode);
    // Информация о том, кто сверху (используем srcNodeInfo)
    var inputNode = node.srcNodeInfo(readNode, 0);  
	// Информация о тех, кто снизу (используем dstNodeInfo)
    var destinationNode = node.dstNodeInfo(readNode, 0, 0);

    // Дублируем
    selection.clearSelection();
    selection.addNodeToSelection(readNode);
    Action.perform("onActionDuplicateElement()", "Node View");
  
	var newSelection = selection.selectedNodes(0);
    var newNode = newSelection[0];
	var newNodeName = node.getName(readNode) + "-bg";
	var parentGroupNewNode = node.parentNode(newNode);
	node.rename(newNode,newNodeName);
	newNode = parentGroupNewNode + "/" + newNodeName;
	
	// Перемещаем в группу
	var dstGroup = node.moveToGroup(newNode,parentGroup);
	
	if (dstGroup != ""){
    newNode = dstGroup + "/" + newNodeName;
	}
	else{
	newNode = "Top/" + newNodeName;
	
	}
	node.setCoord(newNode,x,y,z);
	
	// Удаляем оригинал
    node.deleteNode(readNode, true, true);
    return newNode;
}

function readMaster(sNode,MasterPEG,MasterCOMP) {
	var x = node.coordX(sNode);
	var y = node.coordY(sNode);
	var z = node.coordZ(sNode);
	var NewPEG = node.add(node.parentNode(sNode),node.getName(sNode)+"_bg-P","PEG",x,y-80,z);
	node.unlink(sNode, 0);
	node.link(MasterPEG,0,NewPEG,0);
	
	var dstCompNode = node.dstNode(sNode,0,0)
	
	DubNode = duplicateDrawing(sNode,x,y,z);
	
	if (node.dstNode(DubNode,0,0) == "") { node.link(DubNode,0,dstCompNode,0);}
	
	node.unlink(DubNode, 0);
	node.link(NewPEG,0,DubNode,0);
	cleanUnexposedCels(DubNode);
}

function groupMaster(sNode,MasterPEG,MasterCOMP) {
	var x = node.coordX(sNode);
	var y = node.coordY(sNode);
	var z = node.coordZ(sNode);
	var inputModule = node.getGroupInputModule(sNode, "", 0,0,0);
	var inx = node.coordX(inputModule);
	var iny = node.coordY(inputModule);
	var inz = node.coordZ(inputModule);
	node.deleteNode(inputModule,false,false);
	var inputModule = node.getGroupInputModule(sNode, "", inx,iny-300,inz);
				
	var NewPEG = node.add(node.parentNode(sNode),node.getName(sNode)+"-P","PEG",x,y-80,z);
	var tempPEG = node.add(sNode,sNode+"-temp-P","PEG",0,0,0);
				
	node.unlink(sNode, 0);
	node.link(inputModule,0,tempPEG,0,true,true);
	node.link(NewPEG,0,sNode,0,true,true);
	node.link(MasterPEG,0,NewPEG,0);
	node.link(sNode,0,MasterCOMP,0);
	node.deleteNode(tempPEG,false,false);
	GroupClean(sNode);
}