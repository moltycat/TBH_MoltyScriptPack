/* Этот скрипт делает тощину линии независимой и устанавливает пропорции исходя из стандартно толщины линии в 3.5


*/
var bodyText = new LineEdit();
bodyText.label = "Mode: ";
bodyText.text = "normal mode";
var clean = 0;
var inputNum;

var userInput = new NumberEdit();
userInput.decimals = 3;
userInput.minimum = 0;
userInput.maximum = 100;
userInput.value = 3.5;	
userInput.label = "Enter Line Thickness: ";
	
	
var userInput2 = new NumberEdit();
userInput2.decimals = 3;
userInput2.minimum = 0;
userInput2.maximum = 100;
userInput2.label = "Native Line Thickness: ";
userInput2.value = 3.3;	
	
var userInput3 = new NumberEdit();
userInput3.decimals = 3;
userInput3.minimum = 0;
userInput3.maximum = 100;
userInput3.label = "Resolution ratio";
userInput3.value = 0.5;	


function Molty_line_scale_dependent(){

	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("Molty_line_scale_dependent");

	exeDialog.main();
	  
	scene.endUndoRedoAccum("Molty_line_scale_dependent");
	
  }


function private_exeDialog(){

 	this.main = function(){
		
		var myDialog = new Dialog();
		myDialog.title = "Line Thickness script V011";

		var butC15 = new Button();
		butC15.label = "1.0 px";
		butC15.callback = "funButC15";
		
		var butC25 = new Button();
		butC25.label = "3.3 px";
		butC25.callback = "funButC25";
		
		var butC35 = new Button();
		butC35.label = "3.5 px";
		butC35.callback = "funButC35";
	
		var but6 = new Button();
		but6.label = "6 px";
		but6.callback = "funBut6";
		
		var but35 = new Button();
		but35.label = "3.5 px";
		but35.callback = "funBut35";
	
		var but25 = new Button();
		but25.label = "2.5 px";
		but25.callback = "funBut25";
	
		var but15 = new Button();
		but15.label = "1.5 px";
		but15.callback = "funBut15";
		
		var butFHD = new Button();
		butFHD.label = "0.5 Full HD";
		butFHD.callback = "funButFHD";
		
		var but4K = new Button();
		but4K.label = "0.2 4K";
		but4K.callback = "funBut4K";
		
		var butClean = new Button();
		butClean.label = "Switch mode (clean/normal)";
		butClean.callback = "privateButClean";

		myDialog.add( userInput2 );
		
		myDialog.add(butC15);
		myDialog.add(butC25);
		myDialog.add(butC35);
		
		myDialog.add( userInput );
		
		myDialog.add(but15);
		myDialog.add(but25);
		myDialog.add(but35);
		myDialog.add(but6);
		
		myDialog.add( userInput3 );
		
		myDialog.add(butFHD);
		myDialog.add(but4K);
		
		myDialog.add(bodyText);
		myDialog.add(butClean);
		
		if ( myDialog.exec() )
		{

			inputNum = userInput.value/userInput2.value/userInput3.value;

			var selectionNodes = selection.selectedNodes(0);
			
			
			if (clean == 0)
			{
			
				for (var i = 0; i < selectionNodes.length; ++i)
				{
					if (node.type(selectionNodes[i]) == "READ") 
					{
						var sNode = selectionNodes[i];
						
						node.setTextAttr(sNode,"ADJUST_PENCIL_THICKNESS", frame.current(),"Y");

						var myAttr = node.getAttrList(sNode, frame.current(), "");

						for(j=0; j < myAttr.length; j++)
						{
						  if(myAttr[j].name() == "Scale Independent")
						  {
						   myAttr[j].setValue("Scale Independent (Legacy)");
						  }
						  if(myAttr[j].name() == "Zoom Independent Thickness")
						  {
						   myAttr[j].setValue(true);
						  }
						  

						  if((myAttr[j].name() == "Proportional") && (inputNum != 0))
						  {
							  
							if (node.linkedColumn(sNode, "multLineArtThickness") != "") // Если есть функция
							{
								var OldColumnName = node.linkedColumn(sNode, "multLineArtThickness");
								
								if (OldColumnName.indexOf("Molty_") >= 0)
								{
									var NewColumnName = OldColumnName;
									OldColumnName = OldColumnName.replace ("Molty_", "");
									//MessageBox.warning(OldColumnName);
								}
								else
								{
									var NewColumnName = "Molty_" + OldColumnName; //новое имя на основе старого
								}
		
								
								var ExprString = "ref = value(\"" + OldColumnName + "\"); value = " + inputNum + "* ref;";
								if  (column.type(NewColumnName) != "EXPR")
								{
									column.add (NewColumnName, "EXPR");
								}	
								//MessageBox.warning();
								column.setTextOfExpr(NewColumnName,ExprString);
								
								node.unlinkAttr(sNode, "multLineArtThickness");
								myAttr[j].setValue(inputNum);
								node.linkAttr(sNode, "multLineArtThickness",NewColumnName);
								
							}
							else
							{
								myAttr[j].setValue(inputNum);
							}
							
							//MessageBox.warning(inputNum);
							//myAttr[j].setValue(inputNum);
						  }
						  
						}
					
					}
					
				}
			}
			if (clean == 1)
			{
				for (var i = 0; i < selectionNodes.length; ++i)
				{
					if (node.type(selectionNodes[i]) == "READ") 
					{
						var sNode = selectionNodes[i];
						
						node.setTextAttr(sNode,"ADJUST_PENCIL_THICKNESS", frame.current(),"N");

						var myAttr = node.getAttrList(sNode, frame.current(), "");

						for(j=0; j < myAttr.length; j++)
						{
						  if(myAttr[j].name() == "Scale Independent")
						  {
						   myAttr[j].setValue("Scale Dependent");
						  }
						  if(myAttr[j].name() == "Zoom Independent Thickness")
						  {
						   myAttr[j].setValue(false);
						  }
						  

						  if((myAttr[j].name() == "Proportional") && (inputNum != 0))
							{
								node.unlinkAttr(sNode, "multLineArtThickness");
								myAttr[j].setValue(1);

							}
							
						 }
						  
					}
					
				}
					
			}
			}
			
			
		}
	}

function funButC15(){
userInput2.value = 1.0;
}

function funButC25(){
userInput2.value = 3.3;
}

function funButC35(){
userInput2.value = 3.5;
}

function funBut6(){
userInput.value = 6;
}

function funBut35(){
userInput.value = 3.5;
}

function funBut25(){
userInput.value = 2.5;
}

function funBut15(){
userInput.value = 1.5;
}

function funButFHD(){
userInput3.value = 0.5;
}

function funBut4K(){
userInput3.value = 0.2;
}

function privateButClean(){
	if (clean == 0) {clean = 1;}
	else {clean = 0;}
	privateUpdateText();
}

function privateUpdateText()
{
	bodyText.text = "";

  if (clean ==1) { bodyText.text = "clean all settings"}
  else { bodyText.text = "normal"}

}

this.funButC15 = funButC15;
this.funButC25 = funButC25;
this.funButC35 = funButC35;
this.funBut6 = funBut6;
this.funBut35 = funBut35;
this.funBut25 = funBut25;
this.funBut15 = funBut15;
this.funButFHD = funButFHD;
this.funBut4K = funBut4K;
this.privateButClean = privateButClean;