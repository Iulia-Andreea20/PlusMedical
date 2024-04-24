import prisma from '@models/prisma'; 

export default async function handler(req, res) {
    try {
        const data = await prisma.test.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error accessing the database:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}