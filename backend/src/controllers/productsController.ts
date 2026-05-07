import prisma from "../lib/prisma.js";

// GET /api/products → liste tous les produits
export async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.json(products);
  } catch (error) {
    console.error("Erreur getAllProducts:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des produits." });
  }
}

// GET /api/products/:slug → un produit par son slug
export async function getProductBySlug(req, res) {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable." });
    }

    res.json(product);
  } catch (error) {
    console.error("Erreur getProductBySlug:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération du produit." });
  }
}
