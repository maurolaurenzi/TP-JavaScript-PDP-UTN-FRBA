const EnfermedadInfecciosa = require('./drCasa');
const EnfermedadAutoinmune = require('./drCasa');
const Persona = require('./drCasa');

const otitis = new EnfermedadInfecciosa(100);
const lupus = new EnfermedadAutoinmune(1000,0);
const malaria = new EnfermedadInfecciosa(500); 
const otraMalaria = new EnfermedadInfecciosa(800);
const logan = new Persona(3000000,36,[malaria,otitis,lupus]);
const frank = new Persona(3500000,36,[]);

describe('Tests sobre Enfermedadades', () => {
    test('Frank contrae otraMalaria', () => {
      frank.contraerEnfermedad(otraMalaria);
      expect(frank.enfermedades).toContain(otraMalaria)
    });

    test('La malaria que contrajo logan se reproduce', () => {
      malaria.reproducirse();
      expect(malaria.celulasAmenazadas).toBe(1000)
    });

    test('Logan vive un dia',()=>{
      logan.vivirUnDia();
      const enfermedadesAgresivas = logan.enfermedades.filter(enfermedad=>enfermedad.esAgresiva(logan));
      expect(enfermedadesAgresivas.length).toBe(0)
    });

    test('Logan vive 31 dias',()=>{
      var times = 31;
      for(var i = 0; i < times; i++){
        logan.vivirUnDia()
      }

    })
});