import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const comment = await payload.create({
    collection: 'comments',
    data: body,
  });

  return Response.json(comment);
}

export async function DELETE(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const { commentId } = body;

  const existingComment = await payload.findByID({
    collection: 'comments',
    id: commentId,
  });

  if (!existingComment) {
    return new Response('Comment not found', { status: 404 });
  }

  if (existingComment.author.id !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    await payload.delete({
      collection: 'comments',
      id: commentId,
    });

    return Response.json({ success: true });
  } catch (error) {
    return new Response('Error deleting comment', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const { commentId, textContent } = body;

  const existingComment = await payload.findByID({
    collection: 'comments',
    id: commentId,
  });

  if (!existingComment) {
    return new Response('Comment not found', { status: 404 });
  }

  if (existingComment.author.id !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const updatedComment = await payload.update({
      collection: 'comments',
      id: commentId,
      data: { content: textContent },
    });

    return Response.json({
      success: true,
      commentId: updatedComment.id,
      content: updatedComment.content,
    });
  } catch (error) {
    return new Response('Error updating comment', { status: 500 });
  }
}
