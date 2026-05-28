import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { sendContactNotification } from "../lib/mailer";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid contact submission");
    res.status(400).json({
      message: parsed.error.issues[0]?.message ?? "Invalid input",
    });
    return;
  }

  const input = parsed.data;

  try {
    const [inserted] = await db
      .insert(contactSubmissionsTable)
      .values({
        name: input.name,
        email: input.email,
        business: input.business ?? null,
        businessType: input.businessType ?? null,
        projectType: input.projectType ?? null,
        message: input.message,
      })
      .returning({ id: contactSubmissionsTable.id });

    if (!inserted) {
      throw new Error("Insert returned no rows");
    }

    req.log.info({ id: inserted.id }, "Contact submission saved");

    try {
      await sendContactNotification(input);
      req.log.info({ id: inserted.id }, "Contact notification email sent");
    } catch (mailErr) {
      // Don't fail the request if email fails — the submission is already saved.
      req.log.error({ err: mailErr, id: inserted.id }, "Failed to send contact notification email");
    }

    res.status(201).json({ id: inserted.id, ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

export default router;
