import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// POST /api/contact → enregistre un message de contact
export async function createContactMessage(req: Request, res: Response) {
  try {
    const { name, email, subject, message } = req.body as any;

    // Validation côté serveur
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Le nom est requis.";
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Cet email n'est pas valide.";
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      errors.subject = "Le sujet est requis.";
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      errors.message = "Le message est requis.";
    } else if (message.trim().length < 10) {
      errors.message = "Le message doit faire au moins 10 caractères.";
    }

    // S'il y a des erreurs, on renvoie 400 avec le détail
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Données invalides.",
        fields: errors,
      });
    }

    // Tout est bon, on enregistre en base
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    res.status(201).json({
      message: "Message bien reçu, merci !",
      id: contactMessage.id,
    });
  } catch (error) {
    console.error("Erreur createContactMessage:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de l'envoi du message." });
  }
}
