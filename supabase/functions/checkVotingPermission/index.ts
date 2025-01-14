import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Permit } from "npm:permitio";

 const corsHeaders = {
  'Access-Control-Allow-Origin': "*",
  'Access-Control-Allow-Headers': 'Authorization, x-client-info, apikey, Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

Deno.serve(async (req) => {
  const permit = new Permit({
    token: Deno.env.get("PERMIT_API_KEY"),
    pdp: "https://real-time-polling-app-production.up.railway.app",
  });
  
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
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Error checking user permission: ", error);

    return new Response(
      JSON.stringify({
        message: "Error occurred while checking user permission.",
        "error": error
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
