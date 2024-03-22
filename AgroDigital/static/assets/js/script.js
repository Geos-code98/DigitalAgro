

function cerrar() {
	
  $(document).ready(function() { 
            // bind 'myForm' and provide a simple callback function 
            $('#Produccionform').ajaxForm(function() { 
                alert("ok"); 
            }); 
        }); 
  window.close();
}

/*
 if (confirm('salir'))
    {
		window.close();
		document.Produccionform.submit();  	
    	window.close();		
		
}


*/