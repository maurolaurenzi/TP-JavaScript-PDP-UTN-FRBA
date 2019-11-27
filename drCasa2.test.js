const EnfermedadInfecciosa = require('./drCasa2').EnfermedadInfecciosa;
const EnfermedadAutoinmune = require('./drCasa2').EnfermedadAutoinmune;
const Persona = require('./drCasa2').Persona;
const Enfermedad = require('./drCasa2').Enfermedad;
const Medico = require('./drCasa2').Medico;
const JefeMedico = require('./drCasa2').JefeMedico;

const otitis = new EnfermedadInfecciosa(100);
const lupus = new EnfermedadAutoinmune(1000,0);
const malaria = new EnfermedadInfecciosa(500); 
const otraMalaria = new EnfermedadInfecciosa(800);
const logan = new Persona(3000000,36,[malaria,otitis,lupus]);
const frank = new Persona(3500000,36,[]);
const cameron = new Medico();
const johnny = new Medico();
const peter = new Medico();
const lisa = new JefeMedico();
const house = new JefeMedico();


function obtenerMaximo(array){
  return Math.max(null,array)
}
/*
describe('Tests sobre Enfermedadades', () => {
    test('Frank contrae otraMalaria', () => {
      frank.contraer(otraMalaria);
      expect(frank.enfermedades).toContain(otraMalaria)
    });

    test('La malaria que contrajo logan se reproduce', () => {
      malaria.reproducirse();
      expect(malaria.celulasAmenazadas).toBe(1000)
    });

    test('Logan vive un dia',()=>{
      logan.vivirUnDia();
      const enfermedadesAgresivas = logan.enfermedades.filter(enfermedad=>enfermedad.esAgresiva(logan));
      const enfermedadesMasPeligrosas = logan.enfermedades.sort(function(enfermedad1,enfermedad2)
                                {return (enfermedad1.celulasAmenazadas<enfermedad2.celulasAmenazadas)? 1:-1});
      expect(enfermedadesAgresivas.length).toBe(0);
      expect(enfermedadesMasPeligrosas[0]).toBe(lupus);
      expect(logan.estaEnComa()).toBe(false)
    });

    test('Logan vive 31 dias',()=>{
      var times = 31;
      for(var i = 0; i < times; i++){
        logan.vivirUnDia()
      };
      const enfermedadesAgresivas = logan.enfermedades.filter(enfermedad=>enfermedad.esAgresiva(logan));
      const celulasAtacadasPorAgresivas = enfermedadesAgresivas.map(enfermedad=>
                                enfermedad.celulasAmenazadas).reduce((celulas1,celulas2)=>celulas1+celulas2);
      const enfermedadesMasPeligrosas = logan.enfermedades.sort(function(enfermedad1,enfermedad2)
                                {return (enfermedad1.celulasAmenazadas<enfermedad2.celulasAmenazadas)? 1:-1});
      expect(celulasAtacadasPorAgresivas).toBe(1000);
      expect(enfermedadesMasPeligrosas[0]).toBe(malaria);
      expect(logan.estaEnComa()).toBe(true)
    });


});
*/
describe('Test entrega 2.',()=>{
  test('La malaria se atenua en 100 celulas y el lupus se atenua en 500 células',()=>{


    var nuevoEstadoCelulasAmenazadasMalaria;
    var nuevoEstadoCelulasAmenazadasLupus;
    
    var deltaMalaria;
    var deltaLupus;

    var estadoOriginalCelulasAmenazadasMalaria;
    var estadoOriginalCelulasAmenazadasLupus;

    estadoOriginalCelulasAmenazadasMalaria = otraMalaria.celulasAmenazadas;
    estadoOriginalCelulasAmenazadasLupus = lupus.celulasAmenazadas;
    
    frank.contraer(otraMalaria);
    peter.atender(frank,(100/15));
    johnny.atender(logan,(500/15));

    nuevoEstadoCelulasAmenazadasMalaria = otraMalaria.celulasAmenazadas;
    nuevoEstadoCelulasAmenazadasLupus = lupus.celulasAmenazadas;
    
    deltaMalaria = estadoOriginalCelulasAmenazadasMalaria - nuevoEstadoCelulasAmenazadasMalaria;
    deltaLupus = estadoOriginalCelulasAmenazadasLupus - nuevoEstadoCelulasAmenazadasLupus;
    
    expect(deltaMalaria).to.equal(100);
    expect(deltaLupus).to.equal(500);

  });
  
  //test('Cameron atiende a Logan',()=>{});

  //test('House atiende a Cameron',()=>{});

  //test('Cameron contraiga malaria',()=>{});

  //test('House contraiga la Muerte',()=>{});
});
