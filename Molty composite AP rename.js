


function Molty_rename_AP_COMP(){
	
	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("Molty_rename_AP_COMP");

	exeDialog.main();
	  
	scene.endUndoRedoAccum("Molty_rename_AP_COMP");
	
  }

function private_exeDialog(){
 
	this.main = function(){
		
		var selectionNodes = selection.selectedNodes(0);
		
		for (var i = 0; i < selectionNodes.length; ++i){
			if (node.type(selectionNodes[i]) == "COMPOSITE") {
				var sNode = selectionNodes[i];
				
				var newColor = new ColorRGBA(255, 0 , 0, 255);
				node.setColor(sNode, newColor);
				
				var newCompName = "";
				
				var numInput = node.numberOfInputPorts(sNode);
				for (var j = 0; j < numInput; ++j)
				{
				
					var parentNode = node.srcNode(sNode,j);
					//MessageBox.warning(parentNode);
						if (node.type(parentNode) == "READ") 
						{
							if (newCompName == "") {
							newCompName = "AP-"+ node.getName(parentNode);
							}
							else {
							newCompName = newCompName + "+"+ node.getName(parentNode);
							}
						}else
						{
							var parentNodeOld = parentNode;
							var parentNodeNew = parentNode;
							var parentNumInput = node.numberOfInputPorts(parentNode);
							for (var z = 0; z < 10; ++z)
							{	
								parentNodeOld = parentNodeNew;
								parentNodeNew = node.srcNode(parentNodeOld,parentNumInput-1);
								//MessageBox.warning(parentNodeNew);
								if (node.type(parentNodeNew) == "READ") 
								{
									if (newCompName == "") {
									newCompName = "AP-"+ node.getName(parentNodeNew);
									}
									else {
									newCompName = newCompName + "+"+ node.getName(parentNodeNew);
									}
									
									z =10;
								}
								parentNumInput = node.numberOfInputPorts(parentNodeNew);
							
							}
						}
				}
				//MessageBox.warning(node.srcNode(sNode,0));

				if (!(node.rename(selectionNodes[i],newCompName)))
				{
					for (var x = 1; x < 2000; ++x)
					{
					  node.rename(selectionNodes[i],newCompName+"_"+x);
					}
				}
			}
		}
		
	}
}


