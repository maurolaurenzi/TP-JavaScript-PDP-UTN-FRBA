//Modelo la Enfermedad abstracta
var Enfermedad = function(celulasAmenazadas){
    this.celulasAmenazadas = celulasAmenazadas; 
};

Enfermedad.prototype.atenuarse = function(n){
    this.celulasAmenazadas -= n;
};


Enfermedad.prototype.esAgresiva = function(persona){ //metodo abstracto
};

Enfermedad.prototype.afectar = function(persona){ //metodo abstracto

};

Enfermedad.prototype.estaCurada = function(){
    return this.celulasAmenazadas <= 0
};

//Se define a EnfermedadInfecciosa como una funcion constructora que hereda de Enfermedad
var EnfermedadInfecciosa = function(celulasAmenazadas){
    Enfermedad.call(this,celulasAmenazadas) 
};

EnfermedadInfecciosa.prototype = Object.create(Enfermedad.prototype);

EnfermedadInfecciosa.prototype.afectar = function(persona){ //Se sobre-escribe el metodo abstracto
    persona.aumentarTemperatura(this.celulasAmenazadas/1000);
};

EnfermedadInfecciosa.prototype.esAgresiva = function(persona){
    return this.celulasAmenazadas > persona.celulasTotales*0.10;
};

EnfermedadInfecciosa.prototype.reproducirse = function(){
    this.celulasAmenazadas *= 2;
};

var EnfermedadAutoInmune = function(celulasAmenazadas){
    Enfermedad.call(this,celulasAmenazadas);
    this.diasAfectados = 0;
};

EnfermedadAutoInmune.prototype = Object.create(Enfermedad.prototype);

EnfermedadAutoInmune.prototype.afectar = function(persona){
    persona.perderCelulas(this.celulasAmenazadas);
    this.diasAfectados += 1;
};

EnfermedadAutoInmune.prototype.esAgresiva = function(persona){
    return this.diasAfectados > 30;
};

//Modelo a Persona
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
        this.temperatura += aumento;
    }else{
        this.temperatura = 45;
    };
};

Persona.prototype.perderCelulas = function(num){
    this.celulasTotales -= num;
};

Persona.prototype.vivirUnDia = function(){
    this.enfermedades.forEach(enfermedad => enfermedad.afectar(this));
};

Persona.prototype.estaEnComa = function(){
    return this.temperatura == 45 || this.celulasTotales < 1000000;
};

Persona.prototype.tomaRemedio = function(_dosisRemedio){
    this.enfermedades.forEach(enfermedad=>enfermedad.atenuarse(15 * _dosisRemedio))
};

Persona.prototype.estaCurado = function(){
    return this.enfermedades.every(function(enfermedad){
        return enfermedad.estaCurada()
    })
};
// GG: Modelo Médico
var Medico = function (celulasTotales, temperatura, enfermedades, dosis) {
    Persona.call(this,celulasTotales,temperatura,enfermedades);
    this.dosis = dosis
};

Medico.prototype = Object.create(Persona.prototype);

Medico.prototype.atender = function(_paciente){
    _paciente.tomaRemedio(this.dosis)
};
    
Medico.prototype.contraer = function(_enfermedad){ //Se sobre-escribe el metodo heredado de Persona
    Persona.prototype.contraer.call(this,_enfermedad); //Analogo al super() visto en Wollok
    this.atender(this) //Se le agrega comportamiento al metodo heredado: se atiende a si mismo.
};

//Se modelan los Jefes de Departamento
var JefeDepartamento = function(celulasTotales, temperatura, enfermedades, dosis, subordinados){
    Medico.call(this,celulasTotales, temperatura, enfermedades, dosis);
    this.aCargo = subordinados   
};

JefeDepartamento.prototype = Object.create(Medico.prototype);

JefeDepartamento.prototype.atender = function(_paciente){
    //Al no existir el metodo anyOne() hay que escribir todo esto para obtener un subordinado random...
    this.aCargo[Math.floor(Math.random() * this.aCargo.length)].atender(_paciente)
};
    
JefeDepartamento.prototype.sumarSubordinado = function(subordinado){
    this.aCargo.push(subordinado)
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

module.exports = {
    Enfermedad: Enfermedad,
    EnfermedadInfecciosa: EnfermedadInfecciosa,
    EnfermedadAutoInmune: EnfermedadAutoInmune,
    Persona: Persona,
    Medico: Medico,                              // GG: Agrego Medico para exportar
    JefeDepartamento: JefeDepartamento,
    muerte : muerte
};
