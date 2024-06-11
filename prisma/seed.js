const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      { role: 'admin' },
      { role: 'user' },
    ],
    skipDuplicates: true,
  });

  const country = await prisma.country.upsert({
    where: { name: 'Romania' },
    update: {},
    create: {
      name: 'Romania',
    },
  });

  const provinces = [
    { name: 'Bucuresti' },
    { name: 'Cluj' },
    { name: 'Iasi' },
    { name: 'Timis' },
    { name: 'Constanta' },
    { name: 'Brasov' },
    { name: 'Dolj' },
    { name: 'Arges' },
    { name: 'Bihor' },
    { name: 'Prahova' },
    { name: 'Sibiu' },
    // Adaugă mai multe județe după cum este necesar
  ];

  for (const province of provinces) {
    const provinceRecord = await prisma.province.upsert({
      where: { name: province.name },
      update: {},
      create: {
        name: province.name,
        countryId: country.id,
      },
    });

    const localities = [];
    switch (province.name) {
      case 'Bucuresti':
        localities.push(...[
          'Sector 1',
          'Sector 2',
          'Sector 3',
          'Sector 4',
          'Sector 5',
          'Sector 6',
        ]);
        break;
      case 'Cluj':
        localities.push(...[
          'Cluj-Napoca',
          'Turda',
          'Dej',
          'Gherla',
          'Huedin',
        ]);
        break;
      case 'Iasi':
        localities.push(...[
          'Iasi',
          'Pascani',
          'Harlau',
          'Targu Frumos',
        ]);
        break;
      case 'Timis':
        localities.push(...[
          'Timisoara',
          'Lugoj',
          'Sannicolau Mare',
          'Jimbolia',
          'Faget',
        ]);
        break;
      case 'Constanta':
        localities.push(...[
          'Constanta',
          'Medgidia',
          'Mangalia',
          'Navodari',
        ]);
        break;
      case 'Brasov':
        localities.push(...[
          'Brasov',
          'Fagaras',
          'Sacele',
          'Rasnov',
          'Zarnesti',
        ]);
        break;
      case 'Dolj':
        localities.push(...[
          'Craiova',
          'Bailesti',
          'Filiasi',
          'Calafat',
        ]);
        break;
      case 'Arges':
        localities.push(...[
          'Pitesti',
          'Campulung',
          'Mioveni',
          'Curtea de Arges',
        ]);
        break;
      case 'Bihor':
        localities.push(...[
          'Oradea',
          'Salonta',
          'Marghita',
          'Beius',
        ]);
        break;
      case 'Prahova':
        localities.push(...[
          'Ploiesti',
          'Campina',
          'Baicoi',
          'Boldesti-Scaeni',
        ]);
        break;
      case 'Sibiu':
        localities.push(...[
          'Sibiu',
          'Medias',
          'Cisnadie',
          'Agnita',
        ]);
        break;
    }

    for (const locality of localities) {
      await prisma.locality.upsert({
        where: { name: locality },
        update: {},
        create: {
          name: locality,
          provinceId: provinceRecord.id,
        },
      });
    }
  }

  // Inserarea tipurilor de documente
  await prisma.documentType.createMany({
    data: [
      { name: 'Identity Card Copy', description: 'A copy of your identity card.' },
      { name: 'Income Statement', description: 'A statement of your income for the last 6 months.' },
    ],
    skipDuplicates: true,
  });

  console.log('Data seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
