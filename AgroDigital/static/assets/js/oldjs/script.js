
function placeholderIsSupported() {
		test = document.createElement('input');
		return ('placeholder' in test);
	}
/*
$(document).ready(function(){
  placeholderSupport = placeholderIsSupported() ? 'placeholder' : 'no-placeholder';
  $('html').addClass(placeholderSupport);
});
*/

$(document).ready(function(){

if (screen.width < 1024) {
   $('#clase').removeClass('active');
}


	$('#bftable').dataTable( {
		"language": {
			"sProcessing":	 "Procesando...",
			"sLengthMenu":	 "Mostrar _MENU_ registros",
			"sZeroRecords":	"No se encontraron resultados",
			"sEmptyTable":	 "Ningún dato disponible en esta tabla",
			"sInfo":			"Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			"sInfoEmpty":	  "Mostrando registros del 0 al 0 de un total de 0 registros",
			"sInfoFiltered":	"(filtrado de un total de _MAX_ registros)",
			"sInfoPostFix":	"",
			"sSearch":		 "Buscar: ",
			"sUrl":			"",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
				"sFirst":	"<i class='fas fa-angle-double-left' style='color:#f26122;'></i>",
				"sLast":	 "<i class='fas fa-angle-double-right' style='color:#f26122;'></i>",
				"sNext":	 "<i class='fas fa-chevron-right' style='color:#005d98;'></i>",
				"sPrevious": "<i class='fas fa-chevron-left' style='color:#005d98;'></i>"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}
		}

	} );
	
		$('#btnguardar').click(function(){
			var datos=$('#frmajax').serialize();
			console.log(datos);
			$.ajax({
				type:"POST",
				url:"insertar-registros.php",
				data: datos,
				success:function(r){
					if (r==1)
					{
						alert("Datos registrados correctamente");
						location.reload();


					}
					else{
						alert("Datos no registradosxxxx")
					}
				}
			});
			return false;
		});

});

function ocultar(){
document.getElementById('hola').style.display = 'none';
}

/*FORMULARIO DE SEARCH*/
    $(".search").submit(function(e)
    {
        e.preventDefault();

        $(".contenedor_loading").css("display", "block");

        var imagen_principal=$(this)[0];
        var formdata=new FormData(imagen_principal);

        var url="buscar-usuario.php";
        $.ajax({
            url:url,
            type:'POST',
            contentType:false,
            data:formdata,
            processData:false,
            success:function(datos)
            {
            	$(".contenedor_loading").css("display", "none");

            	datos=datos.trim();
            	$("#reportes").html(datos);
            }
        });
    });

    function validarDNI(event, nomb)
{
  var charCode = event.which || event.keyCode;
  var cantidad=$(nomb).val().length;

  if ((charCode >= 48 && charCode <= 57) || charCode==46)
    {
      if(cantidad>=10)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      return false;
    }
}



    
 function enviaycerrar() {
    if (confirm('¿Estas seguro de enviar este formulario?')) {
       document.frmajax.submit();
       
       window.close();
    }
}