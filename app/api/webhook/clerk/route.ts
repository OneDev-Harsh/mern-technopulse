import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions';
import { createClerkClient } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = "nodejs";
console.log("🧠 Webhook route runtime:", process.env.NEXT_RUNTIME || 'node');

// Initialize Clerk client
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function POST(req: NextRequest) {
  try {
    // Verify the webhook signature
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    console.log(`📬 Received webhook with ID ${evt.data.id} and type ${eventType}`);
    console.log('Payload:', evt.data);

    // ------------------------
    // Handle user creation
    // ------------------------
    if (eventType === 'user.created') {
      const { id: clerkId, email_addresses, image_url, first_name, last_name, username } = evt.data;

      const user = {
        clerkId,
        email: email_addresses?.[0]?.email_address || "",
        username: username || "",
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url || "",
      };

      // Save user to MongoDB
      const newUser = await createUser(user);

      // Update Clerk public metadata with MongoDB _id
      if (newUser) {
        await clerkClient.users.updateUser(clerkId, {
          publicMetadata: { userId: newUser._id.toString() },
        });
      }

      return NextResponse.json({ message: "OK", user: newUser });
    }

    // ------------------------
    // Handle user update
    // ------------------------
    if (eventType === 'user.updated') {
      const { id: clerkId, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name || "",
        lastName: last_name || "",
        username: username || "",
        photo: image_url || "",
      };

      const updatedUser = await updateUser(clerkId, user);
      return NextResponse.json({ message: "OK", user: updatedUser });
    }

    // ------------------------
    // Handle user deletion
    // ------------------------
    if (eventType === 'user.deleted') {
      const { id: clerkId } = evt.data;

      const deletedUser = await deleteUser(String(clerkId));
      return NextResponse.json({ message: "OK", user: deletedUser });
    }

    // Default response for unhandled events
    return new Response('Webhook received', { status: 200 });

  } catch (err) {
    console.error('❌ Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
