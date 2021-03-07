db.empleados.insertMany([

    {_id: "52259463M", 
    nombre: "Maria José Muñoz Jimenez",
    fechaEntrada: new Date("2018-05-03"), 
    jornadaSemanal:40, 
    departamento: "Magia",
    proyecto:125,
    faltas:0},

    {_id: "65984521G", nombre: "Alejandro Mármol Muñoz", fechaEntrada: new Date("2018-07-21"), jornadaSemanal:40, departamento: "Magia", proyecto: 125, faltas: 2},
    {_id: "65143256J", nombre: "Javier Moreno Muñoz", fechaEntrada: new Date("2019-02-11"), jornadaSemanal:40, departamento: "Magia", proyecto: 74, faltas: 4},
    {_id: "45412355H", nombre: "Wifly Stark Castro", fechaEntrada: new Date("2019-02-19"), jornadaSemanal:40, departamento: "Magia", proyecto: 74, faltas: 0},
    {_id: "55433968N", nombre: "Diego Rósame Caricia", fechaEntrada: new Date("2019-04-12"), jornadaSemanal:45, departamento: "Energías Renovables", proyecto: 81, faltas: 0},
    {_id: "78651324H", nombre: "Alibabá Alahuak Bárcenas", fechaEntrada: new Date("2019-05-30"), jornadaSemanal:45, departamento: "Energías Renovables", proyecto: 81, faltas: 0},
    {_id: "89622154M", nombre: "Andrea Árbol Ramas", fechaEntrada: new Date("2020-01-29"), jornadaSemanal:45, departamento: "Energías Renovables", proyecto: 14, faltas: 0},
    {_id: "17554688B", nombre: "Diego Ordóñez Jiménez", fechaEntrada: new Date("2020-02-12"), jornadaSemanal:45, departamento: "Energías Renovables", proyecto: 14, faltas: 0},
    {_id: "54654631C", nombre: "Laura Gutierrez Dedal", fechaEntrada: new Date("2020-04-18"), jornadaSemanal:38, departamento: "Medicina", proyecto: 09, faltas: 0},
    {_id: "78555236N", nombre: "Fernado Almodobar Bando", fechaEntrada: new Date("2020-06-03"), jornadaSemanal:38, departamento: "Medicina", proyecto: 09, faltas: 3},
    {_id: "48745452F", nombre: "Alejandro García Lorca", fechaEntrada: new Date("2020-06-04"), jornadaSemanal:38, departamento: "Medicina", proyecto: 166, faltas: 1},
    {_id: "74448948G", nombre: "Églogas Epístolas Elegías", fechaEntrada: new Date("2020-08-21"), jornadaSemanal:38, departamento: "Medicina", proyecto: 166, faltas: 0},
    {_id: "45321575U", nombre: "San Gabriel Belcebá", fechaEntrada: new Date("2018-02-25"), jornadaSemanal:30, departamento: "Teología", proyecto: 24, faltas: 0},
    {_id: "96613235J", nombre: "Mateo Luis Prada", fechaEntrada: new Date("2018-02-19"), jornadaSemanal:30, departamento: "Teología", proyecto: 01, faltas: 0},
    {_id: "32165686M", nombre: "Jose Luis Jimenez Vela", fechaEntrada: new Date("2019-04-05"), jornadaSemanal:43, departamento: "Mecánica", proyecto: 33, faltas: 0},
    {_id: "63221557K", nombre: "Dolores Lara Florencio", fechaEntrada: new Date("2019-09-11"), jornadaSemanal:43, departamento: "Mecánica", proyecto: 33, faltas: 3},
    {_id: "55846215O", nombre: "Dovakhin Mistborn", fechaEntrada: new Date("2019-09-16"), jornadaSemanal:43, departamento: "Mecánica", proyecto: 109, faltas: 1},
    {_id: "66598545P", nombre: "Javier Mármol Ordoñez", fechaEntrada: new Date("2017-11-08"), jornadaSemanal:45, departamento: "Electromagnetismo", proyecto: 64, faltas: 0},
    {_id: "58455211N", nombre: "Julia Casanueva Martinez", fechaEntrada: new Date("2017-12-16"), jornadaSemanal:45, departamento: "Electromagnetismo", proyecto: 64, faltas: 0},
    {_id: "35135441Z", nombre: "Alejandro Espejo Gordillo", fechaEntrada: new Date("2020-05-05"), jornadaSemanal:45, departamento: "Electromagnetismo", proyecto: 45, faltas: 4},
    {_id: "22511351W", nombre: "Mortadelo limón Garcia", fechaEntrada: new Date("2020-01-09"), jornadaSemanal:45, departamento: "Electromagnetismo", proyecto: 45, faltas: 0},
    {_id: "55322254W", nombre: "Filemón limón Garcia", fechaEntrada: new Date("2019-07-28"), jornadaSemanal:35, departamento: "Mecánica Cuántica", proyecto: 02, faltas: 2},
    {_id: "79757579A", nombre: "Tesla Einstein Amadeus", fechaEntrada: new Date("2018-08-18"), jornadaSemanal:50, departamento: "Mecánica Cuántica", proyecto: 77, faltas: 10}

])

db.departamentos.insertMany([

    {_id: "Magia",
    ingresoMensual:100000,
    sueldoHora:10.55,
    proyectos:[125,74]
    },

    {_id: "Energías Renovables", ingresoMensual:71000, sueldoHora:8.75, proyectos:[81,14]},
    {_id: "Medicina", ingresoMensual:70000, sueldoHora:15.89, proyectos:[09,166]},
    {_id: "Teología", ingresoMensual:55000, sueldoHora:7.95, proyectos:[24,01]},
    {_id: "Mecánica", ingresoMensual:65950, sueldoHora:9.35, proyectos:[33,109]},
    {_id: "Electromagnetismo", ingresoMensual:80500, sueldoHora:6.05, proyectos:[64,45]},
    {_id: "Mecánica Cuántica", ingresoMensual:155000, sueldoHora:25.18, proyectos:[02,77]},
    
])


db.proyectos.insertMany([

    {_id:125,
    pseudónimo: "Alomancia",
    descripcion: "Búsqueda de nuevos metales alománticos y la experimentación de brumosos",
    presupuestoMensual: 45000,
    tiempo: {
        fechaInicio: new Date("2019-11-08"), 
        fechaMeta: new Date("2022-11-08"),
        terminado: false
        },   
    financiación: 1},                                     

    {_id:74, pseudónimo: "Hemalurguia", descripción: "Creación de nuevos clavos hemalúrgicos", presupuestoMensual: 65000, tiempo: {fechaInicio: new Date("2018-05-01"), fechaMeta: new Date("2020-05-01"), terminado: false}, financiación: 10},
    {_id:81, pseudónimo: "Generadores eólicos", descripción: "Creación de generadores eólicos", presupuestoMensual: 50000, tiempo: {fechaInicio: new Date("2019-06-12"), fechaMeta: new Date("2020-06-12"), terminado: true}, financiación: 6},
    {_id:14, pseudónimo: "Placas Solares", descripción: "Creación de placas solares", presupuestoMensual: 24500, tiempo: {fechaInicio: new Date("2017-12-11"), fechaMeta: new Date("2020-12-11"), terminado: true}, financiación: 2},
    {_id:09, pseudónimo: "Cáncer", descripción: "Experimentación para la cura del cáncer", presupuestoMensual: 45000, tiempo: {fechaInicio: new Date("2020-04-21"), fechaMeta: new Date("2028-04-21"), terminado: false}, financiación: 7},
    {_id:166, pseudónimo: "IronTooth", descripción: "fortificar el esmalte dental", presupuestoMensual: 30000, tiempo: {fechaInicio: new Date("2019-02-19"), fechaMeta: new Date("2019-012-01"), terminado: false}, financiacion: 7},
    {_id:24, pseudónimo: "Manzana", descripción: "Lucifer se enamoró de Eva, creada a la imagen y semejanza de Lilith como sátira de Dios", presupuestoMensual: 15000, tiempo: {fechaInicio: new Date("2018-01-27"), fechaMeta: new Date("2019-01-27"), terminado: true}, financiación: 3},
    {_id:01, pseudónimo: "Familia", descripción: "Jesuscrito tuvo hijos con María Magdalena, y su descendencia permanece en la actualidad", presupuestoMensual: 35000, tiempo: {fechaInicio: new Date("2021-01-12"), fechaMeta: new Date("2030-01-27"), terminado: false}, financiación: 3},
    {_id:33, pseudónimo: "Campo de fluidos", descripción: "Comprobar el Principio de Bernoulli", presupuestoMensual: 24000, tiempo: {fechaInicio: new Date("2020-07-18"), fechaMeta: new Date("2021-02-18"), terminado: false}, financiación: 8},
    {_id:109, pseudónimo: "Venturi", descripción: "mejorar el medidor de Venturi", presupuestoMensual: 36000, tiempo: {fechaInicio: new Date("2018-09-22"), fechaMeta: new Date("2019-12-30"), terminado: false}, financiación: 9},
    {_id:64, pseudónimo: "Resonancia Magnética", descripción: "mejorar la resonancia magnética con fines medicinales", presupuestoMensual: 40000, tiempo: {fechaInicio: new Date("2019-11-14"), fechaMeta: new Date("2022-06-14"), terminado: true}, financiación: 8},
    {_id:45, pseudónimo: "Interferencia", descripción: "intererir señales WIFI con ondas de microondas", presupuestoMensual: 30650, tiempo: {fechaInicio: new Date("2018-04-08"), fechaMeta: new Date("2020-04-08"), terminado: true}, financiación: 5},
    {_id:02, pseudónimo: "SternGerlach", descripción: "Descubrir la existencia de dios", presupuestoMensual: 100890, tiempo: {fechaInicio: new Date("2021-04-03"), fechaMeta: new Date("2033-03-03"), terminado: false}, financiación: 4},
    {_id:77, pseudónimo: "Hadamard", descripción: "Una puerta lógica para ordenadores cuánticos", presupuestoMensual: 200000, tiempo: {fechaInicio: new Date("2020-01-07"), fechaMeta: new Date("2021-02-06"), terminado: false}, financiación: 4},

])

db.inversores.insertMany([

    {_id: 1,
    nombre: "Howarts",
    abono: 10000,
    },

    {_id: 2, nombre: "EOLIC", abono: 5000},   
    {_id: 3, nombre: "Santa Sede", abono: 50000},    
    {_id: 4, nombre: "NASA", abono: 10300},    
    {_id: 5, nombre: "Vodafone", abono: 600},    
    {_id: 6, nombre: "Sun Gold", abono: 1680},     
    {_id: 7, nombre: "Health Heart", abono: 12500},     
    {_id: 8, nombre: "GMA", abono: 6300},     
    {_id: 9, nombre: "Venture", abono: 1350},     
    {_id: 10, nombre: "Howarts", abono: 3000},
])

