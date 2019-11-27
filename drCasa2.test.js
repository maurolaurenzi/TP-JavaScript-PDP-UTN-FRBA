const EnfermedadInfecciosa = require('./drCasa2').EnfermedadInfecciosa;
const EnfermedadAutoInmune = require('./drCasa2').EnfermedadAutoInmune;
const Persona = require('./drCasa2').Persona;
const Enfermedad = require('./drCasa2').Enfermedad;
const Medico = require('./drCasa2').Medico;
const JefeDepartamento = require('./drCasa2').JefeDepartamento;
const muerte = require('./drCasa2').muerte;

const otitis = new EnfermedadInfecciosa(100);
const lupus = new EnfermedadAutoInmune(1000,0);
const malaria = new EnfermedadInfecciosa(500); 
const otraMalaria = new EnfermedadInfecciosa(800);
const logan = new Persona(3000000,36,[malaria,otitis,lupus]);
const frank = new Persona(3500000,36,[]);
//const cameron = new Medico(); //Falta pasar parametros necesarios
//const johnny = new Medico();
//const peter = new Medico();
//const lisa = new JefeDepartamento();
//const house = new JefeDepartamento();


function obtenerMaximo(array){
  return Math.max(null,array)
}

var nuevoEstadoCelulasAmenazadasMalaria;
var nuevoEstadoCelulasAmenazadasLupus;
    
var deltaMalaria;
var deltaLupus;

var estadoOriginalCelulasAmenazadasMalaria;
var estadoOriginalCelulasAmenazadasLupus;

estadoOriginalCelulasAmenazadasMalaria = otraMalaria.celulasAmenazadas;
estadoOriginalCelulasAmenazadasLupus = lupus.celulasAmenazadas;
    
    
describe('Test entrega 2.',()=>{
  test('La malaria se atenua en 100 celulas y el lupus se atenua en 500 células',()=>{
    frank.contraer(otraMalaria);
    peter.atender(frank,(100/15));
    johnny.atender(logan,(500/15));

    nuevoEstadoCelulasAmenazadasMalaria = otraMalaria.celulasAmenazadas;
    nuevoEstadoCelulasAmenazadasLupus = lupus.celulasAmenazadas;
    
    deltaMalaria = estadoOriginalCelulasAmenazadasMalaria - nuevoEstadoCelulasAmenazadasMalaria;
    deltaLupus = estadoOriginalCelulasAmenazadasLupus - nuevoEstadoCelulasAmenazadasLupus;

    expect(deltaMalaria).toBe(100);
    expect(deltaLupus).toBe(500);

  });
  
  //test('Cameron atiende a Logan',()=>{});

  //test('House atiende a Cameron',()=>{});

  //test('Cameron contraiga malaria',()=>{});

  //test('House contraiga la Muerte',()=>{});
});
