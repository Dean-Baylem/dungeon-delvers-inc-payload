import { getPayload } from 'payload';
import { revalidatePath } from 'next/cache';
import config from '@payload-config';

const triggerRevalidation = (path: string) => {
  revalidatePath(path);
};

export async function POST(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const { path, ...data } = body;

  const comment = await payload.create({
    collection: 'comments',
    data: {
      ...data,
      author: user.id,
    },
  });

  // Revalidate the current path to update the SSG page with the new comment
  triggerRevalidation(path);

  return Response.json(comment);
}

export async function DELETE(req: Request) {
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();

  const { commentId, path } = body;

  const existingComment = await payload.findByID({
    collection: 'comments',
    id: commentId,
  });

  if (!existingComment) {
    return new Response('Comment not found', { status: 404 });
  }

  const authorId =
    typeof existingComment.author === 'object' ? existingComment.author.id : existingComment.author;

  if (authorId !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    await payload.delete({
      collection: 'comments',
      id: commentId,
    });

    // Revalidate the current path to update the SSG page with the comment removed
    triggerRevalidation(path);

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

  const { commentId, textContent, path } = body;

  const existingComment = await payload.findByID({
    collection: 'comments',
    id: commentId,
  });

  if (!existingComment) {
    return new Response('Comment not found', { status: 404 });
  }

  const authorId =
    typeof existingComment.author === 'object' ? existingComment.author.id : existingComment.author;

  if (authorId !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const updatedComment = await payload.update({
      collection: 'comments',
      id: commentId,
      data: { content: textContent },
    });

    // Revalidate the current path to update the SSG page with the comment updated
    triggerRevalidation(path);

    return Response.json({
      success: true,
      commentId: updatedComment.id,
      content: updatedComment.content,
    });
  } catch (error) {
    return new Response('Error updating comment', { status: 500 });
  }
}
