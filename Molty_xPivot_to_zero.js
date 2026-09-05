var k = 0;
function Molty_xPivot_to_zero(){

	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("Molty_xPivot_to_zero");

	exeDialog.main();
	  
	scene.endUndoRedoAccum("Molty_xPivot_to_zero");
	
  }


function private_exeDialog(){

 	this.main = function(){

		var selectionNodes = selection.selectedNodes(0);
			
			for (var i = 0; i < selectionNodes.length; ++i)
			{
				if ((node.type(selectionNodes[i]) == "PEG") || (node.type(selectionNodes[i]) == "READ"))
				{
					var sNode = selectionNodes[i];
					
					

					var myAttr = node.getAttrList(sNode, frame.current(), "");

					for(j=0; j < myAttr.length; j++)
					{
					 
					 if(myAttr[j].name() == "Pivot")
							{ 

							var wAttr = node.getAttr(sNode, 1, "pivot.y");
							var pivot = new Point3d(0,wAttr.doubleValue(),0);
							myAttr[j].setValue(pivot);
							k=1;
							}			
					  
					}
				
				}
				
			}
				if(k == 1)
					  {
						MessageBox.information("!!!Success!!!");  
					  }
		}

}
