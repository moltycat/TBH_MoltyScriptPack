
function Molty_Backdrop(){

	var RGBAtoint = new fromRGBAtoInt();
	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("Molty_Backdrop");

	exeDialog.main();
	  
	scene.endUndoRedoAccum("Molty_Backdrop");
	
  }

function private_exeDialog(){
 
	this.main = function(){

		var selectionNodes = selection.selectedNodes(0);
		var sNode = selectionNodes[0];
		var MinX = node.coordX(sNode);
		var MinY = node.coordY(sNode);
		var MaxX = node.coordX(sNode);
		var MaxY = node.coordY(sNode);
		var BackdropName = "";
		
		for (var i = 0; i < selectionNodes.length; ++i){
		
			sNode = selectionNodes[i];
			//MessageBox.warning(node.type(sNode));
			var x1 = node.coordX(sNode);
			var y1 = node.coordY(sNode);
			var x2 = node.coordX(sNode)+ node.width(sNode);
			var y2 = node.coordY(sNode)+ node.height(sNode);
			if (MinX > x1) { MinX = x1;}
			if (MinY > y1) { MinY = y1;}
			if (MaxX < x2) { MaxX = x2;}
			if (MaxY < y2) { MaxY = y2;}
			
			var numInput = node.numberOfInputPorts(sNode);
			var source = node.srcNode(sNode,0);
			//MessageBox.warning(sNode);
			//MessageBox.warning(numInput);
			//MessageBox.warning(source);
			//MessageBox.warning(selectionNodes.indexOf(source));
			
			if (selectionNodes.indexOf(source)== -1) {
				BackdropName = node.getName(selectionNodes[i]);
				BackdropName = BackdropName.replace("-G","");
				BackdropName = BackdropName.replace("-P","");
				//MessageBox.warning(BackdropName);
			}
			
			if ((node.type(selectionNodes[i]) == "PEG") && (source =="")) {
				BackdropName = node.getName(selectionNodes[i]);
				BackdropName = BackdropName.replace("-G","");
				BackdropName = BackdropName.replace("-P","");
				//MessageBox.warning(BackdropName);
			}
			if ((node.type(selectionNodes[i]) == "GROUP") && (source =="")) {
				BackdropName = node.getName(selectionNodes[i]);
				BackdropName = BackdropName.replace("-G","");
				BackdropName = BackdropName.replace("-P","");
				//MessageBox.warning(BackdropName);
			}
		
			

		}
		
		var myBackdrop =
			{
			  "position"    : {"x":(MinX-10), "y":(MinY-10), "w":(MaxX-MinX+20), "h":(MaxY-MinY+20)},
			  "title"       : {"text":BackdropName, "color":4278190080,"size":14, "font":"Arial"},
			  "description" : {"text":"", "color":4278190080, "size":14, "font":"Arial"},
			  "color"       : fromRGBAtoInt(50, 50, 50, 255)
			};
			Backdrop.addBackdrop(node.parentNode(sNode), myBackdrop);
		

	}
}

function fromRGBAtoInt(r, g, b, a)
{
  return ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}


