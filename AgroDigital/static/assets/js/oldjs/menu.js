/*jQuery time*/
$(document).ready(function(){
  $('.contenedor article').hide();
  $('.contenedor article:first').show();

  $('ul.tabs li a').click(function(){

  	$('.contenedor article').hide();
  	
  	var activetab=$(this).attr('href');
  	$(activetab).show();
  	console.log(activetab)
  	return false;
  });

  $("#accordian h3").click(function(){
    //slide up all the link lists
    $("#accordian ul ul").slideUp();
    //slide down the link list below the h3 clicked - only if its closed
    if(!$(this).next().is(":visible"))
    {
      $(this).next().slideDown();
    }

    

  })
})




$(function(){
	$("#btn-crear").click(function(){
		$titulo=$("#contenedor-crear h2").text();

		if($titulo=="EDITAR ALUMNO")
		{
			$("#cod_usuario").val("");
			$("#cApeMat").val("");
			$("#cNombres").val("");
			$("#cTipoDoc").prop('selectedIndex', 0);
			$("#cNumDoc").val("");
			$("#cDireccion").val("");
			$("#cFechaNac").val("");
			$("#cComunidad").prop('selectedIndex', 0);
			$("#cCelular").val("");
			$("#cAnoIngreso").val($("#cAnoIngreso").attr("max"));
			$("#cObservacion").val("");
			$("#cEstado").prop('selectedIndex', 0);
			$("#idAlumno").val("");
			$("#alumnoTipo").val("crear");

			$("#contenedor-crear h2").text("REGISTRAR ALUMNO");
    	    $("#form-crear-alumno ul li:last-child input[type='button'], #form-crear-alumno ul li:last-child input[type='submit']").attr("value", "REGISTRAR");
		}

		$("#contenedor-crear").fadeIn(300);
		$("body").addClass("body_poppup");
	});

	$blNormal=true;
	$("#contenedor-hijo>i").click(function(){
		$("#contenedor-crear").css("display","none");
		$("body").removeClass();
		$blNormal=false;
	});
	$("#contenedor-crear").click(function(){
		if($blNormal)
		{
			$("#contenedor-crear").css("display","none");
			$("body").removeClass();
		}
		$blNormal=true;
	});
	$("#contenedor-hijo").click(function(){
		if($blNormal)
		{
			$(this).parent().css("display","block");
			$blNormal=false;
		}
	});

//Alumno
	/*FORMULARIO DE CREAR ALUMNO*/
    $("#form-crear-alumno").submit(function(e)
    {
        e.preventDefault();

        $(".contenedor_loading").css("display", "block");

        $("#form-crear-alumno ul li:last-child input[type='button'], #form-crear-alumno ul li:last-child input[type='submit']").attr("disabled", "disabled");

        var imagen_principal=$("#form-crear-alumno")[0];
        var formdata=new FormData(imagen_principal);

        var url="alumnos-crear.php";
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
                if(datos.indexOf("true-") != -1)
                {
                    $alumnoTipo=$("#alumnoTipo").val();

                    if($alumnoTipo=="crear")
                    {
                        alert("Se ha registrado con éxito al Alumno.");
                        location.href="";
                    }
                    else if($alumnoTipo=="editar")
                    {
                        alert("Se ha editado con éxito al Alumno.");
                        location.href="";
                    }

                    $("#form-crear-alumno ul li:last-child input[type='button'], #form-crear-alumno ul li:last-child input[type='submit']").removeAttr("disabled");

                }
                else
                {
                    alert(datos);
                    $("#form-crear-alumno ul li:last-child input[type='button'], #form-crear-alumno ul li:last-child input[type='submit']").removeAttr("disabled");
                }
            }
        });
    });

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

    /*EDITAR ALUMNO*/
	$(document).on("click","table#tablaReporte tr td input[value='Editar']",function() {
		//Pasar sus datos
		$("#cod_usuario").val($(this).attr("cod_usuario"));
		$("#ape_pat").val($(this).attr("ape_pat"));
		$("#cApeMat").val($(this).attr("ape_mat"));
		$("#cNombres").val($(this).attr("nombres"));
		$("#cTipoDoc").val($(this).attr("id_tipo_documento"));
		$("#cNumDoc").val($(this).attr("numero_documento"));
		$("#cDireccion").val($(this).attr("direccion"));
		$("#cFechaNac").val($(this).attr("fecha_nacimiento"));
		$("#cComunidad").val($(this).attr("id_comunidad"));
		$("#cCelular").val($(this).attr("celular"));
		$("#cAnoIngreso").val($(this).attr("ano_ingreso"));
		$("#cObservacion").val($(this).attr("observaciones"));
		$("#cEstado").val($(this).attr("id_estado"));

		//Levantar Modal
		$("#alumnoTipo").val("editar");
		$("#contenedor-crear h2").text("EDITAR ALUMNO");
        $("#form-crear-alumno ul li:last-child input[type='button'], #form-crear-alumno ul li:last-child input[type='submit']").attr("value", "EDITAR");

		$("#contenedor-crear").fadeIn(300);
		$("body").addClass("body_poppup");
	});

    /*Eliminar Alumno*/
	$(document).on("click","table tr td input[value='Eliminar']",function() {
		//Saber los datos
		$id_alumno=$(this).attr("id_alumno");
		$nombres=$(this).attr("nombres");
		$apellidos=$(this).attr("apellidos");
		confirmar=confirm("¿Está seguro que desea eliminar al Alumno: "+$nombres+" "+$apellidos+" ?");
		if(confirmar)
		{
			$(".contenedor_loading").css("display","block");

			var xmlhttp;

			if(window.XMLHttpRequest)
			{
				//code for IE7+, Firefox, chrome, opera, safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{
				//code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if(xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					var resultado=xmlhttp.responseText;
					resultado=resultado.trim();

					if(resultado=="true")
					{
						location.href="";
					}
					else
					{
						$(".contenedor_loading").css("display","none");
						alert(resultado);
					}
				}

			}

			xmlhttp.open("GET","alumnos-eliminar.php?id_alumno="+$id_alumno,true);
			xmlhttp.send();
		}
	});
});