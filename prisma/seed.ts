import { prisma } from "../src/server/db";

const HOURS_IN_DAY = 24;
const HOURS_IN_WEEK = HOURS_IN_DAY * 7;
const HOURS_IN_MONTH = HOURS_IN_DAY * 30;

async function main() {
  const apprenice1 = await prisma.stage.create({
    data: {
      level: 1,
      hoursToNext: 4,
    },
  });

  const apprenice2 = await prisma.stage.create({
    data: {
      level: 2,
      hoursToNext: 8,
    },
  });

  const apprenice3 = await prisma.stage.create({
    data: {
      level: 3,
      hoursToNext: HOURS_IN_DAY * 1,
    },
  });

  const apprenice4 = await prisma.stage.create({
    data: {
      level: 4,
      hoursToNext: HOURS_IN_DAY * 2,
    },
  });

  const guru1 = await prisma.stage.create({
    data: {
      level: 5,
      hoursToNext: HOURS_IN_WEEK * 1,
    },
  });

  const guru2 = await prisma.stage.create({
    data: {
      level: 6,
      hoursToNext: HOURS_IN_WEEK * 2,
    },
  });

  const master = await prisma.stage.create({
    data: {
      level: 7,
      hoursToNext: HOURS_IN_MONTH * 1,
    },
  });

  const enlightened = await prisma.stage.create({
    data: {
      level: 8,
      hoursToNext: HOURS_IN_MONTH * 4,
    },
  });

  const burned = await prisma.stage.create({
    data: {
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
