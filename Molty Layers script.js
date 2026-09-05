var vOL = 0;
var vLA = 0;
var vCA = 0;
var vUL = 0;
var vAP = 0;
var vgroup = 0;
var vgroupTex = 0;

var bodyText = new TextEdit();
bodyText.text = "";

function Molty_Layers_script(){
 
	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("Molty_Layers_script");

	exeDialog.main();
	  
	scene.endUndoRedoAccum("Molty_Layers_script");
	
 }


function private_exeDialog(){

 	this.main = function(){
		var myDialog = new Dialog();
		myDialog.title = "Layers script V005";

		
		var butOL = new Button();
		butOL.label = "OL";
		butOL.callback = "privateButOL";
		
		var butLA = new Button();
		butLA.label = "LA";
		butLA.callback = "privateButLA";
		
		var butCA = new Button();
		butCA.label = "CA";
		butCA.callback = "privateButCA";
		
		var butUL = new Button();
		butUL.label = "UL";
		butUL.callback = "privateButUL";
		
		var butOLUL = new Button();
		butOLUL.label = "OL-LA-CA-UL";
		butOLUL.callback = "privateButOLUL";
		
		var butLAAPCA = new Button();
		butLAAPCA.label = "LA-AP-CA";
		butLAAPCA.callback = "privateButLAAPCA";
		
		var butLAAPCATex = new Button();
		butLAAPCATex.label = "LA-AP-CA+Texture";
		butLAAPCATex.callback = "privateButLAAPCATex";
		
		var butFull = new Button();
		butFull.label = "UL LA-AP-CA OL";
		butFull.callback = "privateButFull";
		
		var butAP = new Button();
		butAP.label = "AP";
		butAP.callback = "privateButAP";
		
		var butClean = new Button();
		butClean.label = "Clean";
		butClean.callback = "privateButClean";
		
		
		myDialog.add(butOL);
		myDialog.add(butLA);
		myDialog.add(butCA);
		myDialog.add(butUL);
		myDialog.add(butOLUL);
		myDialog.add(butLAAPCA);
		myDialog.add(butFull);
		myDialog.add(butAP);
		myDialog.add(butLAAPCATex);
		myDialog.add(butClean);
		myDialog.add(bodyText);

		if ( myDialog.exec() )
		{
			var selectionNodes = selection.selectedNodes(0);
		
			for (var i = 0; i < selectionNodes.length; ++i){
		
				var sNode = selectionNodes[i];

				var nodeName = node.getName(sNode);
				var x = node.coordX(sNode);
				var y = node.coordY(sNode);
				var z = node.coordZ(sNode);
				
				if (vOL ==1)
				{
				var OL = node.add(node.parentNode(sNode),"OL","OVERLAY",x-80,y+80,z);
				node.link(sNode,0,OL,0);
				}
				
				if (vLA ==1)
				{
				var LA = node.add(node.parentNode(sNode),"LA","LINE_ART",x,y+80,z);
				node.link(sNode,0,LA,0);
				}
				if (vCA ==1)
				{
				var CA = node.add(node.parentNode(sNode),"CA","COLOR_ART",x+80,y+80,z);
				node.link(sNode,0,CA,0);
				}
				
				if (vgroup ==1)
				{
					
				var COMP = node.add(node.parentNode(sNode),"COMP","COMPOSITE",x,y+160,z);
				
				var CA = node.add(node.parentNode(sNode),"CA","COLOR_ART",x+80,y+80,z);
				node.link(sNode,0,CA,0);
				node.link(CA,0,COMP,0);
				var AP = node.add(node.parentNode(sNode),"AP","AutoPatchModule",x,y+80,z);
				node.link(sNode,0,AP,0);
				node.link(AP,0,COMP,1);
				var LA = node.add(node.parentNode(sNode),"LA","LINE_ART",x-80,y+80,z);
				node.link(sNode,0,LA,0);
				node.link(LA,0,COMP,2);
				
				
				var nodesToGroup = [LA,AP,CA];
				var group = node.createGroup(nodesToGroup, "LA_AP_CA");
				var newColor = new ColorRGBA(255, 0 , 0, 255);
				node.setColor(group, newColor);
				node.deleteNode(COMP,false,false);
				}
				
				if (vgroupTex ==1)
				{
					
				var COMP = node.add(node.parentNode(sNode),"COMP","COMPOSITE",x,y+360,z);
				var COMPtop = node.add(node.parentNode(sNode),"COMP","COMPOSITE",x,y+100,z);
				var COMPtoptex = node.add(node.parentNode(sNode),"COMP","COMPOSITE",x+100,y+100,z);
				var COMPtex = node.add(node.parentNode(sNode),"Texture","COMPOSITE",x+72,y+80,z);
					var myAttr = node.getAttrList(COMPtex, frame.current(), "");
							for(j=0; j < myAttr.length; j++)
							{
							  //if(myAttr[j].name() == "Mode")
							  //{
							   // myAttr[j].setValue("As Bitmap");
							  //}
							  if(myAttr[j].name() == "Output Z")
							  {
							   myAttr[j].setValue("Portnumber");
							  }
							}

				var COMPcolor = node.add(node.parentNode(sNode),"C-color","COMPOSITE",x+160,y+260,z);
					var myAttr = node.getAttrList(COMPcolor, frame.current(), "");
							for(j=0; j < myAttr.length; j++)
							{
							  if(myAttr[j].name() == "Mode")
							  {
							   myAttr[j].setValue("As Bitmap");
							  }
							  if(myAttr[j].name() == "Output Z")
							  {
							   myAttr[j].setValue("Portnumber");
							  }
							}
				
				
				var CUT = node.add(node.parentNode(sNode),"Cut","CUTTER",x+100,y+300,z);
				
					var myAttr = node.getAttrList(CUT, frame.current(), "");
							for(j=0; j < myAttr.length; j++)
							{
							  if(myAttr[j].name() == "Inverted")
							  {
							   myAttr[j].setValue(true);
							  }
							}
				
				var CA = node.add(node.parentNode(sNode),"CA","COLOR_ART",x+80,y+180,z);
				node.link(COMPtop,0,CA,0);
				node.link(CA,0,COMPcolor,0);
				
				node.link(COMPtoptex,0,COMPcolor,1);
				node.link(COMPcolor,0,CUT,0);
				node.link(CA,0,CUT,1);
				node.link(CUT,0,COMP,0);
				
				var AP = node.add(node.parentNode(sNode),"AP","AutoPatchModule",x,y+180,z);
				node.link(COMPtop,0,AP,0);
				node.link(AP,0,COMP,1);
				var LA = node.add(node.parentNode(sNode),"LA","LINE_ART",x-80,y+180,z);
				node.link(COMPtop,0,LA,0);
				node.link(LA,0,COMP,2);
				
				var nodesToGroup = [CUT,COMPcolor,LA,AP,CA];
				var group = node.createGroup(nodesToGroup, "LA_AP_CA+Texture");
				var newColor = new ColorRGBA(255, 0 , 0, 255);
				node.setColor(group, newColor);
				node.link(COMPtex,0,COMPtoptex,0);
				node.link(sNode,0,COMPtop,0);
				node.deleteNode(COMP,false,false);
				node.deleteNode(COMPtop,false,false);
				node.deleteNode(COMPtoptex,false,false);
				
				
				node.setCoord(group,x,y+100);
				}
				
				
				
				if (vUL ==1)
				{
				var UL = node.add(node.parentNode(sNode),"UL","UNDERLAY",x+160,y+80,z);
				node.link(sNode,0,UL,0);
				}
				
				if (vAP ==1)
				{
				var AP = node.add(node.parentNode(sNode),"AP","AutoPatchModule",x+240,y+80,z);
				node.link(sNode,0,AP,0);
				}

			}
		}
	}

}

function privateButClean()
{
vOL = 0; vLA  = 0; vCA = 0;vUL = 0; vgroup = 0; vgroupTex = 0; 
privateUpdateText();
}

function privateButOL()
{
  if (vOL == 0) {vOL = 1;}
  else { vOL = 0;}
 
  privateUpdateText();
 
}

function privateButLA()
{
  if (vLA == 0) {vLA = 1;}
  else { vLA = 0;}

  privateUpdateText();
}

function privateButCA()
{
  if (vCA == 0) {vCA = 1;}
  else { vCA = 0;}
  

  privateUpdateText();
}

function privateButUL()
{
  if (vUL == 0) {vUL = 1;}
  else { vUL = 0;}
  

  privateUpdateText();
}

function privateButOLUL()
{
  if ((vUL == 1) && (vOL == 1) && (vLA == 1) &&( vCA == 1)) {vOL = 0; vLA  = 0; vCA = 0;vUL = 0;}
  else { vOL = 1; vLA  = 1; vCA = 1;vUL = 1;}
  

  privateUpdateText();
}

function privateButLAAPCA()
{
  if (vgroup == 0) {vgroup = 1;}
  else { vgroup = 0;}
  
 
  privateUpdateText();
}

function privateButLAAPCATex()
{
  if (vgroupTex == 0) {vgroupTex = 1;}
  else { vgroupTex = 0;}
  
 
  privateUpdateText();
}

function privateButAP()
{
  if (vAP == 0) {vAP = 1;}
  else { vAP = 0;}
  

  privateUpdateText();
}

function privateButFull()
{
  if ((vUL == 1) && (vOL == 1) && (vLA == 0) && (vCA == 0) && (vgroup == 1) ) {vOL = 0; vLA  = 0; vCA = 0;vUL = 0; vgroup = 0;}
  else { vOL = 1; vLA  = 0; vCA = 0;vUL = 1; vgroup = 1;}
  

  privateUpdateText();

}

function privateUpdateText()
{
	bodyText.text = "";
  if (vAP ==1) { bodyText.text = "AP "+bodyText.text;}
  if (vUL ==1) { bodyText.text = "UL "+bodyText.text;}
  if (vgroup ==1) { bodyText.text = "LA-AP-CA "+bodyText.text;}
  if (vgroupTex ==1) { bodyText.text = "LA-AP-CA+Texture "+bodyText.text;}
  if (vCA ==1) { bodyText.text = "CA "+bodyText.text;}
  if (vLA ==1) { bodyText.text = "LA "+bodyText.text;}
  if (vOL ==1) { bodyText.text = "OL "+bodyText.text;}
}

this.Molty_Layers_script = Molty_Layers_script;
this.privateButOL = privateButOL;
this.privateButLA = privateButLA;
this.privateButCA = privateButCA;
this.privateButUL = privateButUL;
this.privateButAP = privateButAP;
this.privateButOLUL = privateButOLUL;
this.privateButLAAPCA = privateButLAAPCA;
this.privateButLAAPCATex = privateButLAAPCATex;
this.privateButFull = privateButFull;
this.privateButClean = privateButClean;