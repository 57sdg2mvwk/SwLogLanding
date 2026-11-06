export const glossaryCategories = [
  'Marítimo',
  'Aéreo',
  'Terrestre',
  'Aduanas',
  'Incoterms',
] as const;

export type GlossaryCategory = (typeof glossaryCategories)[number];

export interface FreightGlossaryTerm {
  id: string;
  term: string;
  category: GlossaryCategory;
  definition: string;
  aliases?: string[];
  practicalNote?: string;
}

export const freightGlossaryTerms: FreightGlossaryTerm[] = [
  {
    id: 'awb',
    term: 'AWB · Conocimiento aéreo',
    category: 'Aéreo',
    definition:
      'El documento que confirma la recepción de la carga para transportarla por avión y recoge las condiciones del envío.',
    aliases: ['air waybill', 'carta de porte aéreo'],
  },
  {
    id: 'bl',
    term: 'B/L · Conocimiento de embarque',
    category: 'Marítimo',
    definition:
      'El documento del transportista marítimo que sirve como recibo de la mercancía y evidencia el contrato de transporte.',
    aliases: ['bill of lading', 'conocimiento de embarque'],
    practicalNote:
      'El tipo de B/L importa: algunos formatos pueden transferirse por endoso y otros solo documentan el transporte.',
  },
  {
    id: 'cbm',
    term: 'CBM · Metro cúbico',
    category: 'Marítimo',
    definition:
      'Una medida de volumen equivalente a un metro de largo por uno de ancho por uno de alto. Se usa para describir y cotizar carga.',
    aliases: ['m3', 'metro cúbico', 'cubic meter'],
    practicalNote:
      'Calcula largo × ancho × alto en metros para obtener el volumen de una pieza.',
  },
  {
    id: 'cfr',
    term: 'CFR · Coste y flete',
    category: 'Incoterms',
    definition:
      'El vendedor paga el transporte marítimo hasta el puerto de destino acordado. El riesgo pasa al comprador cuando la carga queda a bordo en origen.',
    aliases: ['cost and freight'],
  },
  {
    id: 'cif',
    term: 'CIF · Coste, seguro y flete',
    category: 'Incoterms',
    definition:
      'El vendedor paga el flete marítimo y contrata la cobertura de seguro exigida por la regla hasta el puerto de destino. El riesgo pasa a bordo en origen.',
    aliases: ['cost insurance and freight'],
  },
  {
    id: 'cip',
    term: 'CIP · Transporte y seguro pagados hasta',
    category: 'Incoterms',
    definition:
      'El vendedor paga el transporte y contrata un seguro para la mercancía hasta el lugar acordado. El riesgo pasa al comprador al entregar la carga al primer transportista.',
    aliases: ['carriage and insurance paid to'],
  },
  {
    id: 'cmr',
    term: 'CMR · Carta de porte internacional',
    category: 'Terrestre',
    definition:
      'El documento que acompaña muchos transportes internacionales por carretera y deja constancia de la recepción y las condiciones del envío.',
    aliases: ['convenio cmr', 'carta de porte cmr'],
  },
  {
    id: 'cpt',
    term: 'CPT · Transporte pagado hasta',
    category: 'Incoterms',
    definition:
      'El vendedor paga el transporte hasta el destino acordado, pero el riesgo se transfiere cuando entrega la mercancía al primer transportista.',
    aliases: ['carriage paid to'],
  },
  {
    id: 'dap',
    term: 'DAP · Entregado en lugar',
    category: 'Incoterms',
    definition:
      'El vendedor lleva la mercancía hasta el lugar acordado, lista para descargar. El comprador se ocupa del despacho de importación.',
    aliases: ['delivered at place'],
  },
  {
    id: 'ddp',
    term: 'DDP · Entregado con derechos pagados',
    category: 'Incoterms',
    definition:
      'El vendedor asume el transporte y las formalidades de importación, incluidos los derechos e impuestos acordados, hasta el lugar de destino.',
    aliases: ['delivered duty paid'],
  },
  {
    id: 'demurrage',
    term: 'Demurrage · Demora en terminal',
    category: 'Marítimo',
    definition:
      'Un cargo que puede aplicar la naviera cuando un contenedor permanece en la terminal más allá del tiempo libre concedido.',
    aliases: ['demoras', 'demora', 'sobreestadía'],
    practicalNote:
      'Revisa las fechas de descarga, disponibilidad y retiro, además de las condiciones de tiempo libre de la reserva.',
  },
  {
    id: 'detention',
    term: 'Detention · Retención de contenedor',
    category: 'Marítimo',
    definition:
      'Un cargo que puede aplicar la naviera si el contenedor se devuelve vacío después del plazo libre acordado.',
    aliases: ['retención', 'detención de contenedor'],
  },
  {
    id: 'despacho-aduanero',
    term: 'Despacho aduanero',
    category: 'Aduanas',
    definition:
      'El proceso de presentar la declaración y los documentos requeridos para que la aduana autorice la entrada o salida de una mercancía.',
    aliases: ['desaduanamiento', 'customs clearance'],
  },
  {
    id: 'dpu',
    term: 'DPU · Entregado en lugar descargado',
    category: 'Incoterms',
    definition:
      'El vendedor entrega la mercancía ya descargada en el lugar acordado. El comprador gestiona el despacho de importación.',
    aliases: ['delivered at place unloaded'],
  },
  {
    id: 'exw',
    term: 'EXW · En fábrica',
    category: 'Incoterms',
    definition:
      'El vendedor pone la mercancía a disposición en el lugar acordado. El comprador organiza el transporte y la mayoría de los trámites.',
    aliases: ['ex works'],
  },
  {
    id: 'fca',
    term: 'FCA · Franco transportista',
    category: 'Incoterms',
    definition:
      'El vendedor entrega la mercancía al transportista designado en el lugar acordado y realiza el despacho de exportación que corresponda.',
    aliases: ['free carrier'],
  },
  {
    id: 'fas',
    term: 'FAS · Franco al costado del buque',
    category: 'Incoterms',
    definition:
      'El vendedor coloca la mercancía junto al buque en el puerto de embarque acordado. Desde allí, el comprador asume el riesgo y los costes principales.',
    aliases: ['free alongside ship'],
  },
  {
    id: 'fcl',
    term: 'FCL · Contenedor completo',
    category: 'Marítimo',
    definition:
      'Una modalidad en la que la carga se reserva y se cotiza para un contenedor completo, en lugar de compartir espacio con otros embarques.',
    aliases: ['full container load', 'carga completa'],
    practicalNote:
      'La mercancía no tiene que llenar físicamente cada centímetro; FCL describe cómo se contrata el espacio.',
  },
  {
    id: 'ftl',
    term: 'FTL · Camión completo',
    category: 'Terrestre',
    definition:
      'Un servicio de carretera en el que el vehículo se dedica a un solo envío o cliente durante el trayecto contratado.',
    aliases: ['full truckload', 'carga completa por carretera'],
  },
  {
    id: 'fob',
    term: 'FOB · Franco a bordo',
    category: 'Incoterms',
    definition:
      'El vendedor entrega la mercancía a bordo del buque en el puerto acordado. El riesgo pasa al comprador una vez cargada.',
    aliases: ['free on board'],
  },
  {
    id: 'grupaje',
    term: 'Grupaje',
    category: 'Terrestre',
    definition:
      'La combinación de cargas de varios clientes en un mismo vehículo para aprovechar el espacio y compartir el coste del transporte.',
    aliases: ['carga consolidada', 'groupage'],
  },
  {
    id: 'hawb',
    term: 'HAWB · Conocimiento aéreo house',
    category: 'Aéreo',
    definition:
      'El documento que emite un transitario para identificar un envío aéreo individual dentro de una consolidación.',
    aliases: ['house air waybill'],
  },
  {
    id: 'hs-code',
    term: 'Código HS · Sistema Armonizado',
    category: 'Aduanas',
    definition:
      'Un código internacional que clasifica productos para describirlos de forma uniforme en la documentación aduanera.',
    aliases: ['hs code', 'código arancelario', 'sistema armonizado'],
  },
  {
    id: 'mawb',
    term: 'MAWB · Conocimiento aéreo master',
    category: 'Aéreo',
    definition:
      'El documento que emite la aerolínea para el transporte de una carga consolidada entre aeropuertos.',
    aliases: ['master air waybill'],
  },
  {
    id: 'lcl',
    term: 'LCL · Carga parcial',
    category: 'Marítimo',
    definition:
      'Una modalidad en la que la mercancía comparte el contenedor con carga de otros embarcadores y se cotiza por espacio o volumen.',
    aliases: ['less than container load', 'carga consolidada marítima'],
    practicalNote:
      'El transitario consolida varias partidas y las separa al llegar al destino.',
  },
  {
    id: 'ltl',
    term: 'LTL · Carga parcial por carretera',
    category: 'Terrestre',
    definition:
      'Un servicio en el que un envío ocupa solo parte del camión y viaja junto a mercancía de otros clientes.',
    aliases: ['less than truckload'],
  },
  {
    id: 'peso-facturable',
    term: 'Peso facturable',
    category: 'Aéreo',
    definition:
      'La base que usa la aerolínea para calcular el flete: normalmente se compara el peso real con el peso volumétrico y se toma el mayor.',
    aliases: ['chargeable weight', 'peso cobrable'],
  },
  {
    id: 'peso-volumetrico',
    term: 'Peso volumétrico',
    category: 'Aéreo',
    definition:
      'Una conversión del espacio que ocupa la carga a un peso equivalente, calculada con el factor volumétrico de la tarifa o transportista.',
    aliases: ['volumetric weight', 'dimensional weight'],
  },
  {
    id: 'arancel',
    term: 'Arancel',
    category: 'Aduanas',
    definition:
      'Un derecho o impuesto que puede aplicarse a una mercancía al importarla. El importe depende de la clasificación, el origen y las reglas del país.',
    aliases: ['derecho de importación', 'customs duty'],
  },
  {
    id: 'clasificacion',
    term: 'Clasificación arancelaria',
    category: 'Aduanas',
    definition:
      'La asignación de un código aduanero a una mercancía según sus características. Ese código ayuda a determinar derechos y controles aplicables.',
    aliases: ['partida arancelaria', 'tariff classification'],
  },
  {
    id: 'origen-preferencial',
    term: 'Origen preferencial',
    category: 'Aduanas',
    definition:
      'El origen que permite solicitar un trato arancelario preferente cuando existe un acuerdo comercial y se cumplen sus reglas.',
    aliases: ['preferential origin'],
  },
  {
    id: 'valor-aduana',
    term: 'Valor en aduana',
    category: 'Aduanas',
    definition:
      'El valor que se declara para calcular determinados derechos e impuestos de importación, siguiendo las reglas del país de destino.',
    aliases: ['customs value'],
  },
  {
    id: 'teu',
    term: 'TEU · Unidad equivalente a veinte pies',
    category: 'Marítimo',
    definition:
      'Una unidad estándar para expresar capacidad de contenedores, equivalente al espacio de un contenedor de veinte pies.',
    aliases: ['twenty-foot equivalent unit'],
  },
  {
    id: 'thc',
    term: 'THC · Manipulación en terminal',
    category: 'Marítimo',
    definition:
      'Un cargo relacionado con la manipulación de la carga o del contenedor en una terminal portuaria.',
    aliases: ['terminal handling charge', 'gastos de terminal'],
  },
  {
    id: 'transbordo',
    term: 'Transbordo',
    category: 'Marítimo',
    definition:
      'El cambio de un buque a otro en un puerto intermedio antes de que la carga llegue a su destino final.',
    aliases: ['transshipment'],
  },
  {
    id: 'vgm',
    term: 'VGM · Masa bruta verificada',
    category: 'Marítimo',
    definition:
      'El peso total verificado de un contenedor cargado, que debe comunicarse antes de su embarque conforme a las reglas de seguridad marítima.',
    aliases: ['verified gross mass', 'masa bruta'],
  },
];
