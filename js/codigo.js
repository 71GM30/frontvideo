/*var se puede acceder a ellas en todo el codigo*/ 
var urlglobal="http://132.226.254.102:8080/api/";
var dtTabla;
/*fucion que convierte a json un formulario*/ 
function formToJSON(f) {
    var fd = $(f).serializeArray();
    var d = {};
    $(fd).each(function() {
        if (d[this.name] !== undefined){
            if (!Array.isArray(d[this.name])) {
                d[this.name] = [d[this.name]];
            }
            d[this.name].push(this.value);
        }else{
            d[this.name] = this.value;
        }
    });
    return d;
}
/*

@destino es el parametro hacia donde envio
los datos json ejemplo 
funcion general get http://132.226.254.102:8080/api/Category/all
@id su el api tiene meto get por id se usar el parametro para solicitarlo
modo de uso 
var datos = restGet('Category/all');
con id 
var datos = restGet('Category/',1); //el numero 1 corresponde al numero del 
elemento en la tabla que quiero consultar
*/
function restGet(destino,id){
    let urlget;
    if(id==undefined){
        urlget=urlglobal+destino;
    }else{
        urlget=urlglobal+origen+id
    }
    $.ajax({
        url:urlget,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(respuesta){
            dtTabla=respuesta;
            return dtTabla;
        }
        });
}
/*
@destino es el parametro hacia donde envio
los datos json ejemplo 
funcion general post http://132.226.254.102:8080/api/Category/save
id variable opcional
*/
function restPost(destino,formulario,id){
    let urlpost;
    if(id==undefined){
        urlpost=urlglobal+destino;
    }else{
        urlpost=urlglobal+origen+id
    }
    dtsformulario=formToJSON(formulario);
    datos=JSON.stringify(dtsformulario);
    console.log(datos);    
    $.ajax({
        url:urlpost,
        type:"POST",
        data:datos,
        headers:{"Content-Type": "application/json"},
        success:function(respuesta){
            mensaje("POST","Registro agregado correctamente","success");
                    console.log(respuesta)
            },error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception)
            }
        });

}
/*
funcion general put
*/
function restPut(destino,formulario,id){
    let urlpost;
    if(id==undefined){
        urlpost=urlglobal+destino;
    }else{
        urlpost=urlglobal+origen+id
    }
    dtsformulario=formToJSON(formulario);
    datos=JSON.stringify(dtsformulario);
    console.log(datos);    
    $.ajax({
        url:urlpost,
        type:"PUT",
        data:datos,
        headers:{"Content-Type": "application/json"},
        success:function(respuesta){
                    console.log(respuesta)
            },error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception)
            }
        });

}

/*
funcion general delete
*/
function restDelete(origen,ids){
    //let envio={id:ids}
    //let salida = JSON.stringify(envio);
    console.log(origen)
    $.ajax({
        url:urlglobal+origen+"/"+ids,
        type:"DELETE",
        //data:salida,
        //contentType:"application/JSON",
        //datatype:"JSON",
        success:function(r){
            mensaje("Delete","Registro eliminado","success");
            restGet(origen+"/all");
        }

    });
}
function mensaje(titulo,mensaje,icono){
    Swal.fire(
                titulo,
                mensaje,
                icono
                )
}

/*creacion reto*/
function ejecutarPost(destino,formulario,contenedor){
        restPost(destino+"/save",formulario);
        window.setTimeout(2000);
        tabla(destino,contenedor)
}
function tabla(destino,contenedor){
    var datatabla=restGet(destino+"/all");
   
        console.log(datatabla);
        switch (destino) {
            case "Category":
                let tablasalida="<table class='table'>"+
                "<thead>"+
                  "<tr>"+
                    "<th scope='col'>Nombre</th>"+
                    "<th scope='col'>Descipcion</th>"+
                    "<th scope='col'>Editar</th>"+
                    "<th scope='col'>Eliminar</th>"+
                  "</tr>"+
                "</thead>"+
                "<tbody>"
                  
               console.log(dtTabla)
                for(let i=0; i < dtTabla.length;i++){
                    tablasalida+="<tr>"+
                                 "<th scope='row'>"+dtTabla[i].name+"</th>"+
                                 "<td>"+dtTabla[i].description+"</td>"+
                                 "<td>"+dtTabla[i].id+"</td>"+
                                 "<td>"+
                                    "<span class='btn btn-danger btn-xs' disabled='' onclick='restDelete(\"Category\","+dtTabla[i].id+")'> "+
                                    "       <span class='fas fa-trash-alt' aria-hidden='true'></span>"+        
                                    "</span>"+
                                    "</td>"+
                                "</tr>";
                }

                tablasalida+=" </tbody>"+
                "</table>";









                $(contenedor).html(tablasalida)
                break;
        
            default:
                break;
        }
}



