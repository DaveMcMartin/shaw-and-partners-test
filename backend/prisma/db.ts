import { Prisma, PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

let prisma = global.prisma || new PrismaClient({
    // If you want to log all executed queries to console
    // add this log property: query
    log: process.env.NODE_ENV === 'development' ? ['info', 'warn', 'error'] : [],
});

if( process.env.NODE_ENV === 'development' ) {
    // prevent some problems with hot-reloading
    global.prisma = prisma;
}

export default prisma;
