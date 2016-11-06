
function getLanguages(success, failure){
	// load JSON
    var details = {
      method      : 'GET',
      url         : 'https://qa.kadeutsch.org/languages.json',  
    };

	kango.xhr.send(details, (data) => {
      if (data.status == 200 && data.response != null){
        let dataParsed = {};
        try{
          dataParsed = JSON.parse(data.response);
        }catch(e){
          return failure(data.response);
        }
        success(dataParsed);
      }
      else
        failure(data.response);
      
    });
}

function save() {
	var selected = []; 
	$('#select :selected').each(function(i, option){ 
		selected[i] = $(option).text(); 
	});
	kango.invokeAsync('kango.storage.setItem', "selectedLanguages", selected);
}

KangoAPI.onReady(function() {

	//Load Available languages
	getLanguages(
		(data) => {
			data.forEach(function(el, index, array) {
				//$('#select-from').append("<option value='"+el+"'>"+el+"</option>");
				$('#select').multiSelect('addOption', { value: el, text: el });
			});
			
			//Select Languages
			kango.invokeAsync('kango.storage.getItem', "selectedLanguages", function(value) {
				value.forEach(function(lang) {
					$('#select').multiSelect('select', lang);	
				});
			});
		},
		(data) => {
			alert("Could not load available languages from server.");
		}
	);

	$('#select').multiSelect({
		afterSelect: function(values){
			save();
		},
		afterDeselect: function(values){
			save();
			
		}
	});
	

    $('#close').click(function(event) {
        KangoAPI.closeWindow()
    });	
	
});