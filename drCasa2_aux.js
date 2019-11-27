//Se modela el constructor abstracto Enfermedad
function Enfermedad(celulasAmenazadas){
    this.celulasAmenazadas = celulasAmenazadas
};
//Se modelan los metodos de Enfermedad

Enfermedad.prototype.afectar = function(persona){ //metodo abstracto

};

Enfermedad.prototype.esAgresiva = function(persona){ //metodo abstracto

};

Enfermedad.prototype.atenuarse = function(cantidad){
    this.celulasAmenazadas -= cantidad
};

Enfermedad.prototype.estaCurada = function(){
    return this.celulasAmenazadas <= 0
};

//Defino a la Enfermedad Infecciosa como constructor heredado de Enfermedad
function EnfermedadInfecciosa(celulasAmenazadas){
    Enfermedad.call(this,celulasAmenazadas)
};

EnfermedadInfecciosa.prototype = Object.create(Enfermedad.prototype); //Creo un nuevo objeto que hereda todos
//Los metodos del objeto pasado como parametro, se le habilita la "cadena de prototipos"

//Sobre-escribo el metodo abstracto afectar (no es necesario usar override...)
EnfermedadInfecciosa.prototype.afectar = function(persona){
    persona.aumentarTemperatura(this.celulasAmenazadas/1000)
};

EnfermedadInfecciosa.prototype.esAgresiva = function(persona){
    return this.celulasAmenazadas > persona.celulasTotales*0.10
};

EnfermedadInfecciosa.prototype.duplicarse = function(){
    this.celulasAmenazadas *= 2
};

//Defino a Enfermedad AutoInmune como constructor heredado de Enfermedad al que se le agrega una variable
function EnfermedadAutoInmune(celulasAmenazadas){
    Enfermedad.call(this,celulasAmenazadas);
    this.diasAfectados = 0
};

EnfermedadAutoInmune.prototype = Object.create(Enfermedad.prototype);

EnfermedadAutoInmune.prototype.afectar = function(persona){
    persona.perderCelulas(this.celulasAmenazadas);
    this.diasAfectados += 1
};

EnfermedadAutoInmune.prototype.esAgresiva = function(persona){
    return this.diasAfectados > 30
};

//Modelo constructor Persona
function Persona(celulasTotales,temperatura,enfermedades){
    this.celulasTotales = celulasTotales,
    this.temperatura = temperatura,
    this.enfermedades = enfermedades
};

Persona.prototype.contraer = function(enfermedad){
    this.enfermedades.push(enfermedad)
};

Persona.prototype.aumentarTemperatura = function(aumento){
    if(aumento + this.temperatura <= 45){
    this.temperatura += aumento
}else{
    this.temperatura = 45
}
};

Persona.prototype.perderCelulas = function(num){
    this.celulasTotales -= num
};

Persona.prototype.vivirUnDia = function(){
    this.enfermedades.forEach(enfermedad => enfermedad.afectar(this))
};

Persona.prototype.estaEnComa = function(){
    return this.temperatura == 45 || this.celulasTotales < 1000000
};

Persona.prototype.recibirCura = function(dosis){
    this.enfermedades.forEach(function(enfermedad){
        enfermedad.atenuarse(dosis*15)
    })
};

Persona.prototype.estaCurado = function(){
    return this.enfermedades.every(function(enfermedad){
        return enfermedad.estaCurada()
    })
};

//Modelo el constructor Medico, que hereda de Persona
function Medico(celulasTotales, temperatura, enfermedades, dosis){
    Persona.call(this,celulasTotales,temperatura,enfermedades); 
    this.dosis = dosis 
};

Medico.prototype = Object.create(Persona.prototype); 

Medico.prototype.atender = function(paciente){
    paciente.recibirCura(this.dosis)
}

Medico.prototype.contraer = function(enfermedad){
    Persona.prototype.contraer.call(this,enfermedad); //Analogo al super()
    this.atender(this) //Comportamiento agregado
};

//Modelo a los Jefes de Departamento
function JefeDepartamento(celulasTotales, temperatura, enfermedades, dosis, subordinados){
    Medico.call(this,celulasTotales,temperatura,enfermedades,dosis);
    this.subordinados = subordinados
}

JefeDepartamento.prototype = Object.create(Medico.prototype);

//Sobre-escribo metodo atender
JefeDepartamento.prototype.atender = function(persona){
    //Al no existir el metodo anyOne() hay que escribir todo esto para obtener un subordinado random...
    this.subordinados[Math.floor(Math.random() * this.subordinados.length)].atender(persona)
};

JefeDepartamento.prototype.sumarSubordinado = function(subordinado){
    this.subordinados.push(subordinado)
};

//Modelo a La Muerte como un WKO:
const muerte = {
    celulasAmenazadas: 0,

    afectar: function(persona){
        persona.temperatura = 0
    },
    
    esAgresiva: function(persona){
        return true
    },

    atenuarse: function(cantidad){
        this.celulasAmenazadas = 0
    }
};

