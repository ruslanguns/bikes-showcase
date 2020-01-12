
// tslint:disable-next-line: prefer-const
let pastMonth = new Date();
pastMonth.setMonth(pastMonth.getMonth() - 1); // 1 month ago

const ultimasCargas = [
  { $match: { createdAt: { $exists: true } } },
  { $sort: { createdAt: -1 } },
  { $limit: 5 },
  { $project: { brand: 1, productId: 1, price: 1, status: 1, createdAt: 1 } }
];

const ultimasVentas = [
  { $match: { status: 'vendido' } },
  { $match: { soldAt: { $exists: true } } },
  { $sort: { soldAt: -1 } },
  { $limit: 5 },
  { $project: { brand: 1, productId: 1, price: 1, status: 1, createdAt: 1, soldAt: 1 } }
];

const cargaMesAnterior = [
  {
    $redact: {
      $cond: [
        { $and: [{ $eq: [{ $month: '$createdAt' }, { $month: pastMonth }] }, { $eq: [{ $year: '$createdAt' }, { $year: pastMonth }] }] },
        '$$KEEP',
        '$$PRUNE'
      ]
    },
  },
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const cargaEsteMes = [
  {
    $redact: {
      $cond: [
        { $and: [{ $eq: [{ $month: '$createdAt' }, { $month: new Date() }] }, { $eq: [{ $year: '$createdAt' }, { $year: new Date() }] }] },
        '$$KEEP',
        '$$PRUNE'
      ]
    },
  },
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const cargadas = [
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const ventasMesAnterior = [
  {
    $redact: {
      $cond: [
        { $and: [{ $eq: [{ $month: '$soldAt' }, { $month: pastMonth }] }, { $eq: [{ $year: '$soldAt' }, { $year: pastMonth }] }] },
        '$$KEEP',
        '$$PRUNE'
      ]
    },
  },
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const ventasEsteMes = [
  { $match: { status: 'vendido' } },
  {
    $redact: {
      $cond: [
        { $and: [{ $eq: [{ $month: '$soldAt' }, { $month: new Date() }] }, { $eq: [{ $year: '$soldAt' }, { $year: new Date() }] }] },
        '$$KEEP',
        '$$PRUNE'
      ]
    },
  },
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const vendidos = [
  { $match: { status: 'vendido' } },
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const enVenta = [
  { $match: { status: 'a la venta' } },
  {
    $group: {
      _id: null,
      cantidad: { $sum: '$price' },
      unidades: { $sum: 1 },
      // datos: { $push: '$$CURRENT'}
    }
  },
  { $project: { _id: 0, cantidad: 1, unidades: 1 } },
];

const visitas = [
  {
    $project: {
      settingsUsername: 'admin',
    },
  },
  { $limit: 1 },
  {
    $lookup: {
      from: 'settings',
      localField: 'settingsUsername',
      foreignField: 'username',
      as: 'settings',
    }
  },
  {
    $project: {
      general: { $arrayElemAt: ['$settings.totalViews', 0] },
    }
  },
];

const pepiline = {
  $facet: {
    ultimasCargas,
    ultimasVentas,
    cargaMesAnterior,
    cargaEsteMes,
    cargadas,
    ventasMesAnterior,
    ventasEsteMes,
    vendidos,
    enVenta,
    visitas,
  }
};

const projectData = {
  $project: {
    visitas: { $arrayElemAt: ['$visitas.general', 0] },
    enVenta: { $arrayElemAt: ['$enVenta', 0] },
    carga: {
      general: { $arrayElemAt: ['$cargadas', 0] },
      cargaMesAnterior: { $arrayElemAt: ['$cargaMesAnterior', 0] },
      cargaEsteMes: { $arrayElemAt: ['$cargaEsteMes', 0] },
      ultimasCargas: '$ultimasCargas'
    },
    ventas: {
      general: { $arrayElemAt: ['$vendidos', 0] },
      ventasMesAnterior: { $arrayElemAt: ['$ventasMesAnterior', 0] },
      ventasEsteMes: { $arrayElemAt: ['$ventasEsteMes', 0] },
      ultimasVentas: '$ultimasVentas'
    }
  },
};

export default [pepiline, projectData];
