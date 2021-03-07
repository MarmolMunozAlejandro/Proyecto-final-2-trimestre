/*  Muestra la información general de todos los trabajadores: Sus datos personales, los dias que lleva trabajados, su salario (fruto de 
multiplicar el sueldo hora por su jornadas semanal por 4 semanas), el departamento al que pertenece y el proyecto que lleva a cabo.
También muestra la conducta del empleado, que será mala si tiene 2 o más faltas (de comportamiento) y buena si tiene 1 o ninguna.
Ordenados de forma alfabética */

db.empleados.aggregate([

    {$lookup:{
        from: "departamentos",
        localField: "departamento",
        foreignField: "_id",
        as: "departamento"
        }
    },{
    $lookup:{
        from: "proyectos",
        localField: "proyecto",
        foreignField: "_id",
        as: "proyecto"
        }
    },{
    $project:{
        _id:0,
        dni:"$_id",
        trabajador:"$nombre",
        diasTrabajados:
            {$round:
                [{$divide:
                    [{$subtract:[new Date(), "$fechaEntrada"]},
                    86400000]},
                0]
            },
        sueldoHora:"$departamento.sueldoHora",
        salario:
            {$multiply:
                [{$multiply:
                    [{$arrayElemAt:["$departamento.sueldoHora",0]},
                    "$jornadaSemanal"]},
                4]},
        departamento:"$departamento._id",
        proyecto:"$proyecto.pseudónimo",
        comportamiento: {
            faltas:"$faltas",            
            conducta:
                {$cond:
                    [{$gte: ["$faltas",2]}, "mala", "buena"]},
                }
        }
    },{
        $sort:{trabajador:1}
    }

]).pretty()

/* Muestra los fondos de cada departamento. Une las 4 colecciones de la base, y obtiene  el ingreso mensual del departamento y la suma de las financiaciones
que dan los inversores a los proyectos del departamento (este lo requisa y lo distribuye), obteniendo así las ganancias que obtiene cada mes el departamento.
Luego suma el salario de cada trabajador y el coste mensual de cada proyecto, y obtiene el coste mensual del departamento. Con la resta, y filtrando con el 
match numeros negativos, se muestra los departamentos que tengan ingresos negativos (gastan más de lo que ganan), ordenados de forma alfabética. */

db.departamentos.aggregate([

    {$lookup:{
        from: "empleados",
        localField: "_id",
        foreignField: "departamento",
        as: "empleados"
        }
    },{
    $lookup:{
        from: "proyectos",
        localField:"proyectos",
        foreignField: "_id",
        as: "proyectos"
        }
    },{
    $lookup:{
        from: "inversores",
        localField:"proyectos.financiación",
        foreignField: "_id",
        as: "inversor"
        }
    },{
    $project:{
        departamento:"$pseudónimo",
        ingresoMensual: "$ingresoMensual",
        financiación: {$sum:"$inversor.abono"},
        salarioEmpleados: 
                {$multiply:[
                    {$multiply:
                        [{$multiply:
                            ["$sueldoHora",
                            {$arrayElemAt:["$empleados.jornadaSemanal",0]}]},   
                        4]},
                    {$size:"$empleados"}]
                },
        costeProyectos: {$sum:"$proyectos.presupuestoMensual"}
            },
    },{
    $project:{
        ingresoMensual:1,
        financiación:1,
        salarioEmpleados:1,
        costeProyectos:1,
        ganancias: {$sum:["$ingresoMensual","$financiación"]},
        pagos:  {$sum:["$salarioEmpleados","$costeProyectos"]},
        fondos: 
            {$round:[
                {$subtract:[
                    {$sum:["$ingresoMensual","$financiación"]},
                    {$sum:["$salarioEmpleados","$costeProyectos"]},
                ]},
                0]
            }
        }        
    },{
    $match:{
        fondos:{$lt:0}
        }
    },{
    $sort:{
        _id:1}
    }  
]).pretty()



/* Muestra todos los proyectos sin terminar, así como los días que le quedan antes de que termine el plazo en caso de estar a tiempo o los días
que lleva de retraso si se ha pasado el tiempo límite. Luego los ordena por los proyectos iniciados más recientemente. */


db.proyectos.aggregate([

    {
    $lookup:{
        from: "empleados",
        localField: "_id",
        foreignField: "proyecto",
        as: "empleados"
        }

    },{
    $match:{
        "tiempo.terminado":false
        }

    },{
    $project:{
        _id:0,
        proyecto: "$pseudónimo",
        trabajadores: "$empleados.nombre",
        fechaInicio: "$tiempo.fechaInicio",
        fechaMeta: "$tiempo.fechaMeta",
        descripción: "$descripción",

        fechaRetraso: {$round:[
            {$divide:[
                {$subtract:
                    [new Date(), 
                    "$tiempo.fechaMeta"]
                },
                86400000]
            },
            0]},

        fechaSinRetraso: {$round:[
            {$divide:[
                {$subtract:
                    ["$tiempo.fechaMeta", 
                    new Date()
                    ]
                },
                86400000]
            },
            0]}
    }},{
    $project:{
        _id:0,
        proyecto:1,
        trabajadores:1,
        fechaInicio:1,
        fechaMeta:1,
        descripción:1,

        tiempo: {$cond:[{$gt:["$fechaMeta", new Date()]},
            {$concat:["le quedan ",  {"$toString": "$fechaSinRetraso"}," días de plazo para terminar el proyecto"]}, 
            {$concat:["lleva ",{"$toString": "$fechaRetraso"}, " días de retraso"]}
            ]}
        }
    },{
    $sort:{
        fechaInicio:-1}
    }    
]).pretty()


/* Muestra las faltas que tienen los trabajadores agrupándolos por departamentos. Aquellos con una sola falta o ninguna serán recompensados con un 
aumento de sueldo del 5% y del 10%, respectivamente. Luego las ordena de menor a mayor cantidad de faltas totales o en orden alfabético */

db.empleados.aggregate([

    {$lookup:{
        from: "departamentos",
        localField: "departamento",
        foreignField: "_id",
        as: "departamentoC"
        }
    },{    
    $group:
        {
        _id: "$departamento",

        trabajadores: {$push: {$cond:[{$lt:["$faltas", 2]},
            
            {bueno:"$nombre", faltas: "$faltas",

            aumento:{$cond:[{$eq:["$faltas",1]},{

                antiguoSueldoHora:"$departamentoC.sueldoHora",
                porcentaje: "5% extra",
                nuevoSueldoHora:
                    {$round:[{
                        $multiply:[
                            {$arrayElemAt:["$departamentoC.sueldoHora",0]},
                            1.05]},
                        2]
                    }
                },
                
                {antiguoSueldoHora:"$departamentoC.sueldoHora",
                porcentaje: "10% extra",
                nuevoSueldoHora:
                    {$round:[{
                        $multiply:[
                            {$arrayElemAt:["$departamentoC.sueldoHora",0]},
                            1.1]},
                        2]
                    }
                }]
            }},  
            {malo:"$nombre", faltas: "$faltas", aumento:"no merece ningún aumento de sueldo"}
            ]}
        },
        faltasTotales: {$sum:"$faltas"}
        }
    },{
    $match:{
        "trabajadores.bueno":{$exists:true} 
        }
    },{
    $sort:{
        "faltasTotales":1,
        _id:1
        }
    }
]).pretty()

/* Muestra el departamento con más faltas acumuladas, para someterlo a inspección */


db.empleados.aggregate([
    
    {$lookup:{
        from: "departamentos",
        localField: "departamento",
        foreignField: "_id",
        as: "departamentoC"
        }
    },{    
    $facet:{

        "faltas de cada departamento:":[{
        $group:
            {
            _id: "$departamento",
            faltasTotales: {$sum:"$faltas"}
            }
        }],

        "peor/es departamento/s":[{
        $group:
            {
            _id: "$departamento",
            faltasTotales: {$sum:"$faltas"}
            }
        },
        {
        $group:{
            _id:"$faltasTotales",
            departamentos:{$push: "$_id"}
            }
        },{
        $sort:{
            _id:-1
            }
        },{ 
        $limit : 1 
        }]
    }}
]).pretty()
/* Si solo pongo el primer group: Me lo ordena de mayor a menor, pero si hay dos con las mismas faltas, solo me muestra el primero, 
así que hago un segundo group con las faltas como id y luego saco los departamentos correspondientes */.


/* Se ha intentado elegir a los delegados de personal de la empresa, pero como no hay acuerdo en las elecciones de los representantes, se decide
que serán escogidos aquellos que lleven un mínimo de 2 años en la empresa y que tengan la mejor conducta de su departamento, además de que solo 
podrá haber un representante por departamento. Los representantes no podrán tener más de dos faltas, y solo pueden haber como máximo 3 elegidos */


db.empleados.aggregate([

    {$set:{
        añosEnEmpresa:
            {$round:[
                {$divide:
                    [{$subtract:[new Date(), "$fechaEntrada"]},
                    31104000000]
                },
                2]
            }             
        }
    },{
    $match:{
        añosEnEmpresa:{$gte:2},
        faltas:{$lte:2}
        }
    },{
    $sort:{
        "faltas":1,
        "añosEnEmpresa":-1
        }
    },{
    $group:{
        _id:"$departamento",
        trabajadores: {$push:{nombre:"$nombre", añosEnEmpresa:"$añosEnEmpresa",  faltas:"$faltas"}}
        }   
    },{
    $project:{
        _id:1,
        representante:{$arrayElemAt:["$trabajadores",0]}
        }
    },{ 
    $limit : 3 
    },{
    $out : "representantes" } 
        
]).pretty()

db.representantes.aggregate([

    {$facet:{

        "Comité de empresa":[
        {$project:{
            _id:0,
             miembro:"$representante.nombre",
            }
        }],
        "Datos":[
        {$lookup:
            {
            from: "empleados",
            localField: "representante.nombre",
            foreignField: "nombre",
            as: "datos"
            }
        },{
        $project:{
            _id:0,
            nombre:"$representante.nombre",
            departamento:"$_id",
            dni:"$datos._id",
            añosEnEmpresa:"$representante.añosEnEmpresa",
            faltas:"$datos.faltas"
            }
        }]
    }}
]).pretty()







   