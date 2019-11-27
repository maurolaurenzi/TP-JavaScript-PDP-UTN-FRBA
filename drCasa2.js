//Modelo la enfermedad 
var Enfermedad = function(celulasAmenazadas){
    this.celulasAmenazadas; //M: La keyword "this" se usa para funciones, por lo que Enfermedad deberia ser
    //una funcion constructora, no una var
    this.tipo;
    this.nombre;
};

Enfermedad.prototype.atenuar = function(n){
    this.celulasAmenazadas -= n;
};


Enfermedad.prototype.esAgresiva = function(persona){
    this.tipo.esAgresiva(persona);
};

//Enfermedad.prototype.afectar = function(persona)


//Modelo la enfermedad infecciosa con una funcion constructora, donde se definen propiedades o atributos
//gg: Modifiqué la manera en que se define el modelo para heredar de enfermedad
var EnfermedadInfecciosa = function(celulasAmenazadas){
    Enfermedad.call(this,celulasAmenazadas);
    //this.celulasAmenazadas = celulasAmenazadas;
};

EnfermedadInfecciosa.prototype = Object.create(Enfermedad.prototype);

EnfermedadInfecciosa.prototype.contructor = EnfermedadInfecciosa;

/*EnfermedadInfecciosa.prototype.init = function(celulasAmenazadas){
    this.celulasAmenazadas = celulasAmenazadas;
};
*/

EnfermedadInfecciosa.prototype.afectar = function(persona){ //En los prototipos definimos metodos
    persona.aumentarTemperatura(this.celulasAmenazadas/1000);
};

EnfermedadInfecciosa.prototype.esAgresiva = function(persona){
    return this.celulasAmenazadas > persona.celulasTotales*0.10;
};

EnfermedadInfecciosa.prototype.reproducirse = function(){
    this.celulasAmenazadas *= 2;
};


//Modelo la enfermedad autoinmune
//gg: Modifiqué la manera en que se define el modelo para heredar de enfermedad


var EnfermedadAutoinmune = function(celulasAmenazadas){
    Enfermedad.call(this,celulasAmenazadas);
    this.diasAfectados = 0;
};

EnfermedadAutoinmune.prototype = Object.create(Enfermedad.prototype);

EnfermedadAutoinmune.prototype.constructor = EnfermedadAutoinmune;

/*
EnfermedadAutoinmune.prototype.init = function(celulasAmenazadas,diasAfectados){
    this.celulasAmenazadas = celulasAmenazadas;
    this.diasAfectados = diasAfectados;
};
*/

EnfermedadAutoinmune.prototype.afectar = function(persona){
    persona.perderCelulas(this.celulasAmenazadas);
    this.diasAfectados += 1;
};

EnfermedadAutoinmune.prototype.esAgresiva = function(persona){
    return this.diasAfectados > 30;
};

var laMuerte = function(){
    Enfermedad.call(this);
};

laMuerte.prototype = Object.create(Enfermedad.prototype);

laMuerte.prototype.constructor = laMuerte;

laMuerte.prototype.afectar = function(persona){
    persona.aumentarTemperatura(-1 * persona.temperatura);
};

//Modelo a Persona
function Persona(celulasTotales,temperatura,enfermedades){
    this.celulasTotales = celulasTotales;
    this.temperatura = temperatura;
    this.enfermedades = enfermedades;
};

Persona.prototype.contraer = function(enfermedad){
    this.enfermedades.push(enfermedad);
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
    this.enfermedades.forEach(enfermedad=>enfermedad.atenuar(15 * _dosisRemedio));
};

// GG: Modelo Médico
var Medico = function () {
    Persona.call(this);
};

Medico.prototype = Object.create(Persona.prototype);

Medico.prototype.constructor = Medico;


/*
new Persona(); //M: Al usar "new", estas definiendo a Medico como un objeto individual del tipo Persona, 
//cuando deberia ser un constructor a partir del cual se puedan crear objetos, para lo cual hay que definirlo
//como funcion constructora.
*/
Medico.prototype.atender = function(_paciente, _dosisRemedio){
    _paciente.tomaRemedio(_dosisRemedio)
};
    
Medico.prototype.contraer = function(_enfermedad){
    Persona.contraer.call(this,_enfermedad);
    Persona.tomaRemedio.call(this,100);
};

var JefeMedico = function(){
    Medico.call(this);
    this.aCargo = new Array();   
};

JefeMedico.prototype = Object.create(Medico.prototype);

JefeMedico.prototype.contructor = JefeMedico;
    
JefeMedico.prototype.atender = function(_paciente, _dosisRemedio){
    Medico.atender.call(this.aCargo.pop(),_paciente, _dosisRemedio);
};
    
    
    
module.exports = {
    EnfermedadInfecciosa: EnfermedadInfecciosa,
    EnfermedadAutoinmune: EnfermedadAutoinmune,
    Persona: Persona,
    Medico: Medico,                              // GG: Agrego Medico para exportar
    JefeMedico: JefeMedico
};
