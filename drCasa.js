//Modelo la enfermedad infecciosa con una funcion constructora, donde se definen propiedades o atributos
function EnfermedadInfecciosa(celulasAmenazadas){
    this.celulasAmenazadas = celulasAmenazadas
};

EnfermedadInfecciosa.prototype.afectar = function(persona){ //En los prototipos definimos metodos
    persona.aumentarTemperatura(this.celulasAmenazadas/1000)
};

EnfermedadInfecciosa.prototype.esAgresiva = function(persona){
    return this.celulasAmenazadas > persona.celulasTotales*0.10
};

EnfermedadInfecciosa.prototype.reproducirse = function(){
    this.celulasAmenazadas *= 2
};

//Modelo la enfermedad autoinmune
function EnfermedadAutoinmune(celulasAmenazadas,diasAfectados){
    this.celulasAmenazadas = celulasAmenazadas,
    this.diasAfectados = diasAfectados
};

EnfermedadAutoinmune.prototype.afectar = function(persona){
    persona.destruirCelulas(this.celulasAmenazadas);
    this.diasAfectados += 1
};

EnfermedadAutoinmune.prototype.esAgresiva = function(persona){
    return this.diasAfectados > 30
};

//Modelo a Persona
function Persona(celulasTotales,temperatura,enfermedades){
    this.celulasTotales = celulasTotales,
    this.temperatura = temperatura,
    this.enfermedades = enfermedades
};

Persona.prototype.contraerEnfermedad = function(enfermedad){
    this.enfermedades.push(enfermedad)
};

Persona.prototype.aumentarTemperatura = function(aumento){
    this.temperatura += aumento
};

Persona.prototype.destruirCelulas = function(num){
    this.celulasTotales -= num
};

Persona.prototype.vivirUnDia = function(){
    this.enfermedades.forEach(enfermedad => enfermedad.afectar(this))
};


