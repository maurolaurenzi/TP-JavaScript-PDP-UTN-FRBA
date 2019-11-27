const EnfermedadInfecciosa = require('./drCasa1').EnfermedadInfecciosa;
const EnfermedadAutoInmune = require('./drCasa1').EnfermedadAutoInmune;
const Persona = require('./drCasa1').Persona;

const otitis = new EnfermedadInfecciosa(100);
const lupus = new EnfermedadAutoInmune(1000,0);
const malaria = new EnfermedadInfecciosa(500); 
const otraMalaria = new EnfermedadInfecciosa(800);
const logan = new Persona(3000000,36,[malaria,otitis,lupus]);
const frank = new Persona(3500000,36,[]);
function obtenerMaximo(array){
  return Math.max(null,array)
}

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
    })
});