    function Molty_Curve_to_zero() {
        var exeDialog = new private_exeDialog();

        scene.beginUndoRedoAccum("Molty_Curve_to_zero");
        exeDialog.main();
        scene.endUndoRedoAccum("Molty_Curve_to_zero");
    }

    function private_exeDialog() {
        this.main = function() {
            var selectionNodes = selection.selectedNodes(0);
            var successCount = 0;

            // Рекурсивная функция для обработки нод и групп
            function processNode(sNode) {
                var type = node.type(sNode);
                // Если это группа, получаем все ноды внутри нее и рекурсивно обрабатываем
                if (type == "GROUP") {
                    var childNodes = node.subNodes(sNode);
                    for (var k = 0; k < childNodes.length; k++) {
                        processNode(childNodes[k]);
                    }
                } 
                // Если это нода CURVE, обнуляем нужные параметры
                else if (type == "CurveModule") {
                    var isModified = false;
                    var myAttrs = node.getAttrList(sNode, frame.current(), "");
                  
                    for (var j = 0; j < myAttrs.length; j++) {
                        var attrName = myAttrs[j].name();
                        // Проверяем совпадение по имени 
                        if (attrName == "Resting Orientation 0" ||
                            attrName == "Rest Length 0"         ||
                            attrName == "Resting Orientation 1" ||
                            attrName == "Rest Length 1") {   
                            // Устанавливаем значение 0
                            myAttrs[j].setValue(0);
                            isModified = true;
                        }
                    }

                    if (isModified) {
                        successCount++;
                    }
                }
            }

            // Запускаем проверку для всех изначально выделенных нод
            for (var i = 0; i < selectionNodes.length; ++i) {
                processNode(selectionNodes[i]);
            }

            // Выводим сообщение о результате
            if (successCount > 0) {
                MessageBox.information("!!!Success!!!\nУспешно обнулены значения в " + successCount + " нодах Curve.");
            } else {
                MessageBox.information("Не найдено нод типа CURVE в выделении или внутри групп.");
            }
        };
    }
