import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 120,
      },
    }
  );
  return response.json();
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
    const post = await getData(id)
  return {
    title: post.title,
  };
}

async function AnyId({ params: { id } }: Props) {
    const post = await getData(id)
  return (
  <>
  <h2>{ post.title }</h2>
  <p>{post.body}</p>
  </>
  )
}

export default AnyId;
