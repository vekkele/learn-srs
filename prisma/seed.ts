import { prisma } from "../src/server/db";

const DAY = 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;

async function main() {
  const apprenice1 = await prisma.stage.upsert({
    where: {
      level: 1,
    },
    update: {},
    create: {
      level: 1,
      hoursToNext: 4,
    },
  });

  const apprenice2 = await prisma.stage.upsert({
    where: {
      level: 2,
    },
    update: {},
    create: {
      level: 2,
      hoursToNext: 8,
    },
  });

  const apprenice3 = await prisma.stage.upsert({
    where: {
      level: 3,
    },
    update: {},
    create: {
      level: 3,
      hoursToNext: DAY * 1,
    },
  });

  const apprenice4 = await prisma.stage.upsert({
    where: {
      level: 4,
    },
    update: {},
    create: {
      level: 4,
      hoursToNext: DAY * 2,
    },
  });

  const guru1 = await prisma.stage.upsert({
    where: {
      level: 5,
    },
    update: {},
    create: {
      level: 5,
      hoursToNext: WEEK * 1,
    },
  });

  const guru2 = await prisma.stage.upsert({
    where: {
      level: 6,
    },
    update: {},
    create: {
      level: 6,
      hoursToNext: WEEK * 2,
    },
  });

  const master = await prisma.stage.upsert({
    where: {
      level: 7,
    },
    update: {},
    create: {
      level: 7,
      hoursToNext: MONTH * 1,
    },
  });

  const enlightened = await prisma.stage.upsert({
    where: {
      level: 8,
    },
    update: {},
    create: {
      level: 8,
      hoursToNext: MONTH * 4,
    },
  });

  const burned = await prisma.stage.upsert({
    where: {
      level: 9,
    },
    update: {},
    create: {
      level: 9,
      hoursToNext: 0,
    },
  });

  const stages = {
    apprenice1,
    apprenice2,
    apprenice3,
    apprenice4,
    guru1,
    guru2,
    master,
    enlightened,
    burned,
  };

  console.dir(stages, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
