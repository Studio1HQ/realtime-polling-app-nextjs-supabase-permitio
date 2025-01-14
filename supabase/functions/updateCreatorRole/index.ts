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
    pdp: "https://realtime-polling-app-nextjs-supabase-permitio-production.up.railway.app",
  });
  
  try {
    const { userId, pollId } = await req.json();

    // Validate input parameters
    if (!userId || !pollId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Sync the resource (poll) to Permit.io
    await permit.api.syncResource({
      type: "polls",
      key: pollId,
      tenant: "default",
      attributes: {
        createdBy: userId
      }
    });

    // Assign the creator role to the user for this specific poll
    await permit.api.assignRole({
      role: "creator",
      tenant: "default",
      user: userId,
      resource: {
        type: "polls",
        key: pollId,
      }
    });

    return new Response(
      JSON.stringify({ 
        message: "Creator role assigned successfully",
        success: true 
      }),
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Error assigning creator role: ", error);

    return new Response(
      JSON.stringify({
        message: "Error occurred while assigning creator role.",
        error: error
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});