import { Permit } from "npm:permitio";

// Initialize Permit client
const permit = new Permit({
  token: Deno.env.get("PERMIT_API_KEY"),
  pdp: "http://localhost:7766",
});

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  try {
    const { userId, operation, key } = await req.json();

    // Validate input parameters
    if (!userId || !operation || !key) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check the user's permission for the operation in the specified polls key
    const permitted = await permit.check(userId, operation, {
      type: "polls",
      key,
      tenant: "default",
    });

    return new Response(
      JSON.stringify({ permitted }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error checking user permission: ", error);

    return new Response(
      JSON.stringify({
        error: "Error occurred while checking user permission.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
