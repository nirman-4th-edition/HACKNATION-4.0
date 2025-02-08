import { string, z } from "zod";

async function AuthCheck(req, res, next) {
  try {
    //Input Validation
    const RequiredAuth = z.object({
      email: z.string().email(),
      password: z.string().min(3),
      firstName: z.string().min(1).max(11).optional(),
      lastName: string().min(1).max(11).optional(),
    });

    const validAuth = RequiredAuth.safeParse(req.body);

    if (!validAuth.success) {
      return res.json({
        message: "Invalid Cred",
        error: validAuth.error,
      });
    }
    // Auth check successful
    next();
  } catch (error) {
    return res.json({
      message: "Error Creating Account",
      error: error.message,
    });
  }
}

export { AuthCheck };
